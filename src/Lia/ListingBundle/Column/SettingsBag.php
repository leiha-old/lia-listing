<?php

namespace Lia\ListingBundle\Column;

use Lia\Library\Bag\Bag;

class SettingsBag
    extends Bag
{
    /**
     * @var HooksBag
     */
    public $hooks;

    /**
     * @var ActionsBag
     */
    public $actions;

    /**
     * @var TemplatesBag
     */
    public $templates;


    public function __construct(){
        parent::__construct(
            array(
                'name',
                'link',
                'type',
                'label',
                'visible',
                array(
                    'name'     => 'hooks',
                    'classBag' => 'Lia\ListingBundle\Column\HooksBag'
                ),
                array(
                    'name'     => 'actions',
                    'classBag' => 'Lia\ListingBundle\Column\ActionsBag'
                ),
                array(
                    'name'     => 'templates',
                    'classBag' => 'Lia\ListingBundle\Column\TemplatesBag'
                )
            )
        );

        $this->hooks     = $this->get('hooks');
        $this->actions   = $this->get('actions');
        $this->templates = $this->get('templates');
    }

    public function getName(){
        return $this->get('name');
    }

    public function getLink(){
        return $this->get('link');
    }

    public function getType(){
        return $this->get('type');
    }

    public function getLabel(){
        return $this->get('label');
    }

    public function getVisible(){
        return $this->get('visible');
    }

    public function setName($name){
        return $this->add('name', $name);
    }

    public function setLink($link){
        return $this->add('link', $link);
    }

    public function setType($type){
        return $this->add('type', $type);
    }

    public function setVisible($visible){
        return $this->add('visible', $visible);
    }

    /**
     * Set the label of this column
     * @param string $label
     * @return $this;
     */

    public function setLabel($label){
        return $this->add('label', $label);
    }
}