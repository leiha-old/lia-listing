<?php

namespace Lia\ListingBundle\Library;
//use JsonSerializable;
use Lia\ListingBundle\Library\Column\ColumnInterface;
use Lia\ListingBundle\Library\ColGroup\SettingsBag as ColGroupSettingsBag;

/**
 * @author leiha
 *
 */
class Colgroup
    extends Columns
    implements ColumnInterface
{
    public function getAll(){
        $config = $this->config->getAll();
        $config['columns'] = $this->getColumns();
        return $config;
    }


    public function __construct($name, array $config=array()){
        $this->config = new ColGroupSettingsBag();
        $this->config->setName($name);
        if($config)
            $this->setConfigByArray($config);
    }

    public function setConfigByArray(array $config){
        if(isset($config['columns'])){
            foreach($config['columns'] as $name => $columnConfig){
                $this->addColumn($name, $columnConfig);
            }
            unset($config['columns']);
        }

        $this->config->set($config);
        return $this;
    }
}
