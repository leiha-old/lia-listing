<?php

namespace Lia\ListingBundle\Column;

use Lia\Library\Bag\Bag;

class ActionsBag
    extends Bag
{
    public function __construct(){
        parent::__construct(array('sortable', 'filterable', 'editable'));
    }

    public function isSortable(){
        return $this->get('sortable') == true;
    }

    public function isFilterable(){
        return $this->get('filterable') == true;
    }

    public function isEditable(){
        return $this->get('editable') == true;
    }

    /**
     * Enable the sorting on this column
     * @param boolean $sortable
     * @return $this
     */
    public function enableSortable($sortable=true){
        return $this->set('sortable', $sortable);
    }

    /**
     * Enable the filtering on this column
     * @param boolean $filterable
     * @return $this
     */
    public function enableFilterable($filterable=true){
        return $this->set('filterable', $filterable);
    }

    /**
     * Enable dynamic edition
     * @param boolean $editable
     * @return $this
     */
    public function enableEditable($editable=true){
        return $this->set('editable', $editable);
    }
}