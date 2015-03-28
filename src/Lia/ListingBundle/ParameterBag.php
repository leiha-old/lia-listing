<?php

namespace Lia\ListingBundle;

use Lia\Library\Bag\Constraints\ConstraintsBagStacking;

class ParameterBag
    extends ConstraintsBagStacking
{
    public function __construct(){
        parent::__construct(array('columns', 'limit'=> array('value'=> array(0, 25)), 'where', 'orderBy'));
    }

    public function getLimit(array $default=null){
        return $this->get('limit', $default);
    }

    public function getColumns($default=array()){
        return $this->get('columns', $default);
    }

    public function getWhere($default=array()){
        return $this->get('where', $default);
    }

    public function getOrder($default=array()){
        return $this->get('orderBy', $default);
    }

    public function setLimit(array $limit){
        return $this->add('limit', $limit);
    }

    public function setColumns($columns=array()){
        return $this->add('columns', $columns);
    }

    public function setWhere($where=array()){
        return $this->add('where', $where);
    }

    public function setOrder($order){
        return $this->add('orderBy', $order);
    }

}