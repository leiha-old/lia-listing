<?php

namespace Lia\ListingBundle\ColGroup;

use Lia\Library\Bag\Bag;

class SettingsBag
    extends Bag
{
    public function __construct(){
        parent::__construct(
            array(
                'name',
                'label',
                'template'=> '<th></th>'
            )
        );
    }

    public function getName(){
        return $this->get('name');
    }

    public function getTemplate(){
        return $this->get('template');
    }

    public function getLabel(){
        return $this->get('label');
    }

    public function setName($name){
        return $this->add('name', $name);
    }

    public function setTemplate($template){
        return $this->add('template', $template);
    }

    /**
     * Set the label of this colGroup
     * @param string $label
     * @return $this;
     */

    public function setLabel($label){
        return $this->add('label', $label);
    }
}