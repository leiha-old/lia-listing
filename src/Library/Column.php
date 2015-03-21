<?php

namespace Lia\Bundle\ListingBundle\Library;

use Lia\Bundle\ListingBundle\Library\Column\ColumnInterface;
use Lia\Bundle\ListingBundle\Library\Column\SettingsBag as ColumnSettingsBag;
use Lia\Bundle\ListingBundle\Library\Repository\RepositoryInterface;
use Lia\Library\Exception;

/**
 * @author leiha
 *
 */
class Column
    implements ColumnInterface
{
    protected $em = null;

    /**
     * @param string $name    The key of the value in the rowSet who is used for display
     * @param array  $config
     */
    public function __construct($name, array $config=array()){
        $this->config = new ColumnSettingsBag();
        $this->config->setName($name);
        if($config)
            $this->setConfigByArray($config);
    }

    public function getAll(){
        $config = $this->config->getAll();
        return $config;
    }

    public function setConfigByArray(array $config){
        if(isset($config['actions'])){
            $this->config->actions->set($config['actions']);
            unset($config['actions']);
        }

        if(isset($config['hooks'])){
            $this->config->hooks->set($config['hooks']);
            unset($config['hooks']);
        }

        if(isset($config['templates'])){
            if(isset($config['templates']['conditionals'])){
                $this->config->templates->conditionals->set($config['templates']['conditionals']);
                unset($config['templates']['conditionals']);
            }
            $this->config->templates->set($config['templates']);
            unset($config['templates']);
        }

        $this->config->set($config);
        return $this;
    }

    /**
     * Get Data (rows of items) Listing
     *
     * @return array|null
     */
    public function getDataSet(){
        if($this->dataSet){
            return $this->dataSet;
        }
        elseif($data = $this->getDataRepository()){
            $this->setData($data);
            return $this->dataSet;
        } else {
            return null;
        }
    }

    protected function getDataRepository(){
        if(!$this->em)
           return null;

        $em     = $this->em[0];
        $method = $this->em[1];
        if(!method_exists($em, $method)){
            throw new Exception('Method ['.$method.'] not found in repository ['.get_class($em).']');
        }

        return $em->$method($this->em[2]);
    }

    public function setDataKeys($key='id', $value='name'){
        $this->dataSetKeys = array($key, $value);
        return $this;
    }

    public function setData(array $data){
        $this->dataSet = $data;
        return $this;
    }

    public function setDataRepository(RepositoryInterface $em, $methodName, array $params=array()){
        $this->em = array($em, $methodName, $params);
        return $this;
    }
}