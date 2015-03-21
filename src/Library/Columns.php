<?php

namespace Lia\Bundle\ListingBundle\Library;

use Lia\Bundle\ListingBundle\Library\Column;
use Lia\Bundle\ListingBundle\Library\Colgroup;

/**
 * @author leiha
 */
class Columns
{
    /**
     * @var Column[] && Colgroup[]
     */
    protected $columns = array();

    /**
     * @param string $type
     * @return string
     */
    public function getColumns($type='array') {
        $columns = array();
        foreach ($this->columns as $key => $column) {
            $columns[$key] = $column->getAll();
        }

        switch($type){
            case 'json' :
                return json_encode($columns);
                break;
            default:
                return $columns;
                break;
        }
    }

    /**
     * @param string $name
     * @param array $config
     * @return Column;
     */
    public function addColumn($name, array $config=array()) {
        $this->columns[$name] = new Column($name, $config);
        return $this->columns[$name];
    }

    /**
     * @param array $columns
     * @return $this;
     */
    public function addColumns(array $columns=array()) {
        foreach($columns as $name => $config){
            $this->addColumn($name, $config);
        }
        return $this;
    }

    /**
     * @param string $name
     * @param array $config
     * @return Colgroup;
     */
    public function addGroup($name, array $config=array()) {
        $this->columns[$name] = new Colgroup($name, $config);
        return $this->columns[$name];
    }
}
