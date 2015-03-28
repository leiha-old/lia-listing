<?php

namespace Lia\ListingBundle\Controller;

use Lia\KernelBundle\Annotation\ReflectionObject;
use Lia\KernelBundle\Annotation\ReflexionProperty;
use Lia\ListingBundle\ListingException;

abstract class ListingAnnotationController
    extends ListingController
{
    /**
     * @param string $className Currently it's an entity name
     * @throws \Lia\ListingBundle\ListingException
     * @return $this
     */
    public function extractAnnotationConfig($className){
        $reflectionClass = new ReflectionObject($className);

        // if Class has a Listing annotation
        if($config = $reflectionClass->getClassAnnotation('Lia\ListingBundle\Mapping\Listing')){
            $this->checkForActionsAnnotation($reflectionClass, $config);

            // Check properties class for Columns annotation
            $columns = $this->extractColumnsAnnotationConfig($reflectionClass);

            // Check properties class for Groups and order columns annotations
            $columns = $this->checkForParamsAnnotations($className, $reflectionClass, $columns);

            // Set the columns without group
            $this->columns->addColumns($columns);
        }

        if(!$config){
            throw new ListingException('Entity [%s] does not contain Listing configuration', array($className));
        }
        $this->setConfigByArray($config);
        return $this;
    }

    /**
     * @param ReflectionObject $reflectionClass
     * @param array $config
     */
    protected function checkForActionsAnnotation(ReflectionObject $reflectionClass, array &$config){
        if(!$annotations = $reflectionClass->getClassAnnotation('Lia\ListingBundle\Mapping\Actions')){
            return;
        }
        $config['actions'] = $annotations;
    }

    /**
     * @param $className
     * @param ReflectionObject $reflectionClass
     * @param array $columns
     * @return array
     */
    protected function checkForParamsAnnotations($className, ReflectionObject $reflectionClass, array $columns){
        if($annotations = $reflectionClass->getClassAnnotation(
            'Lia\ListingBundle\Mapping\Columns\Order',
            true
        )){
            /**
             * @param array $annotations
             * @param null $parentColumn
             * @throws ListingException
             * @return array Like this {
             *      {"n":"column 1", "v":true},
             *      {"n":"column 2", "c":{
             *          {"n":"column 2.1", "v":true},
             *          {"n":"column 2.2", "v":true},
             *          .etc..
             *      },
             *      .etc..
             * }
             */
            $recursive = function (array $annotations, $parentColumn=null) use (&$recursive, &$columns, $className){
                $res = array();
                $columnsName = array();
                foreach($annotations as $annotation){
                    $annotation = (array)$annotation;
                    $name = $annotation['column'];

                    $tmp = array('n'=> $name, 'v'=> $annotation['visible']);
                    if(isset($annotation['columns'])){
                        $tmp['c'] = $recursive($annotation['columns'], $annotation);
                    }
                    $res[] = $tmp;

                    // if has a parent column (group of columns)
                    if($parentColumn) {
                        if(!isset($columns[$name])){
                            throw new ListingException('The column name [%s] isn\'t present in class definition [%s]',
                                array($name, $className)
                            );
                        }
                        $columnsName[$name] = $columns[$name];
                        unset($columns[$name]);
                    }
                }

                // if has a parent column (group of columns)
                if($parentColumn) {
                    $parentColumn['columns'] = $columnsName;
                    $this->columns->addGroup($parentColumn['column'], $parentColumn);
                }
                return $res;
            };

            $this->parameters->add('columns', $recursive($annotations));
            return $columns;
        }
    }

    /**
     * @param ReflectionObject $reflectionClass
     * @return array
     */
    protected function extractColumnsAnnotationConfig(ReflectionObject $reflectionClass){
        $columns = array();
        // Check Column configuration by reflexion in class [$className]
        $properties = $reflectionClass->getProperties();
        foreach($properties as $name => $property){
            if($columnConfig = $this->checkPropertyForColumnAnnotationsConfig($name, $property)){
                $columns[$name] = $columnConfig;
            }
        }

        return $columns;
    }

    /**
     * Search a field configuration in class with annotations
     *
     * @param string $name                  Property Name
     * @param ReflexionProperty $property   Property Reflexion Object
     * @throws \Lia\Library\Exception\Exception
     * @return array|null
     */
    protected function checkPropertyForColumnAnnotationsConfig($name, ReflexionProperty $property){
        // if Property haven't a Column annotation do nothing !
        $config = $property->getAnnotation('Lia\ListingBundle\Mapping\Column');
        if(!is_null($config)){
            $this->checkPropertyForColumnAnnotationsConfigBase   ($name, $property, $config);
            $this->checkPropertyForColumnAnnotationsConfigActions($property, $config);
            $this->checkPropertyForColumnAnnotationsConfigHooks  ($property, $config);
            return $config;
        }

        return null;
    }

    /**
     * @param ReflexionProperty $property
     * @param array $config
     */
    protected function checkPropertyForColumnAnnotationsConfigActions(ReflexionProperty $property, array &$config){
        if(!$annotations = $property->getAnnotation('Lia\ListingBundle\Mapping\Column\Actions')){
            return;
        }
        $config['actions'] = $annotations;
    }

    /**
     * @param ReflexionProperty $property
     * @param array $config
     */
    protected function checkPropertyForColumnAnnotationsConfigHooks(ReflexionProperty $property, array &$config){
        if(!$annotations = $property->getAnnotation('Lia\ListingBundle\Mapping\Column\Hooks')){
            return;
        }
        $config['hooks'] = $annotations;
    }

    /**
     * @param $name
     * @param ReflexionProperty $property
     * @param array $config
     */
    protected function checkPropertyForColumnAnnotationsConfigBase($name, ReflexionProperty $property, array &$config){

        $annotations = array(
            'Doctrine\ORM\Mapping\Column' => array(
                'name'=> 'name', 'label' => 'label', 'length'=> 'length', 'type'=> 'type'
            ),
            'Doctrine\ORM\Mapping\JoinColumn' => array(
                'link' => 'name'
            ),
            'Lia\FormBundle\Library\Mapping\Field' => array(
                'name'=> 'name', 'label' => 'label', 'length'=> 'length', 'type'=> 'type'
            )
        );

        foreach($annotations as $annotationClass => $fields){

            if(!$annotation = $property->getAnnotation($annotationClass)){
                continue;
            }

            foreach($fields as $a => $b){
                if(empty($config[$a]) && !empty($annotation[$b])){
                    $config[$a] =  $annotation[$b];
                }
            }
        }

        // Check for name
        if(empty($config['name'])){
            $config['name'] = $name;
        }

        // Check for label
        if(empty($config['label'])){
            $config['label'] = $config['name'];
        }
    }
}