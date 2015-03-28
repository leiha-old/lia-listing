<?php

namespace Lia\ListingBundle\Column;

use Lia\Library\Bag\Bag;

class HooksBag
    extends Bag
{
    public function __construct(){
        parent::__construct(array('onGetRenderValue','onGetValue','onSetValue'));
    }

    public function getOnGetRenderValue(){
        return $this->get('onGetRenderValue');
    }

    public function getOnGetValue(){
        return $this->get('onGetValue');
    }

    public function getOnSetValue(){
        return $this->get('onSetValue');
    }

    /**
     * Set the hook that run just before display the value
     * @param string $cbJs String who represents a javascript function
     *
     * @return $this
     */
    public function setOnGetRenderValue($cbJs){
        return $this->set('onGetRenderValue', $cbJs);
    }

    /**
     * Set the hook that run just before get the value
     * @param string $cbJs String who represents a javascript function
     *
     * @return $this
     */
    public function setOnGetValue($cbJs){
        return $this->set('onGetValue', $cbJs);
    }

    /**
     * Set the hook that run just before set the value
     * @param string $cbJs String who represents a javascript function
     *
     * @return $this
     */
    public function setOnSetValue($cbJs){
        return $this->set('onSetValue', $cbJs);
    }
}