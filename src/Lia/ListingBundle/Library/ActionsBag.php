<?php

namespace Lia\ListingBundle\Library;

use Lia\Library\Bag\Bag;

class ActionsBag
    extends Bag
{
    public function __construct(){
        parent::__construct(
            array(
                'resizable',
                'exportable',
                'refreshable',
                'hideable',
                'selectable',
                'pageable',
                'moveable',
            )
        );
    }

    public function isResizable(){
        return $this->get('resizable') == true;
    }
    public function isExportable(){
        return $this->get('exportable') == true;
    }
    public function isRefreshable(){
        return $this->get('refreshable') == true;
    }

    public function isHideable(){
        return $this->get('hideable') == true;
    }

    public function isSelectable(){
        return $this->get('selectable') == true;
    }

    public function isPageable(){
        return $this->get('pageable') == true;
    }


    public function isMoveable(){
        return $this->get('moveable') == true;
    }

    /**
     * Enable Column resizing
     * @param boolean $resizable
     * @return $this
     */
    public function enableResizable($resizable=true){
        return $this->set('resizable', $resizable);
    }

    /**
     * Enable Export action
     * @param boolean $exportable
     * @return $this
     */
    public function enableExportable($exportable=true){
        return $this->set('exportable', $exportable);
    }

    /**
     * Enable Refresh action
     * @param bool $refreshable
     * @return $this
     */
    public function enableRefreshable($refreshable=true){
        return $this->set('refreshable', $refreshable);
    }

    /**
     * Enable Columns hide
     * @param boolean $hideable
     * @return $this
     */
    public function enableHideable($hideable=true){
        return $this->set('hideable', $hideable);
    }

    /**
     * Enable Items Pagination
     * @param bool $pageable
     * @return $this
     */
    public function enablePageable($pageable=true){
        return $this->set('pageable', $pageable);
    }

    /**
     * Enable Rows selection
     * @param boolean $selectable
     * @return $this
     */
    public function enableSelectable($selectable=true){
        return $this->set('selectable', $selectable);
    }

    /**
     * Enable Rows moving
     * @param boolean $moveable
     * @return $this
     */
    public function enableMoveable($moveable=true){
        return $this->set('moveable', $moveable);
    }
}