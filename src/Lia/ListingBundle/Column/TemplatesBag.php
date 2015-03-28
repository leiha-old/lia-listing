<?php

namespace Lia\ListingBundle\Column;

use Lia\Library\Bag\Bag;

class TemplatesBag
    extends Bag
{
    /**
     * @var Bag
     */
    public $conditionals;

    public function __construct(){
        parent::__construct(
            array(
                'title' => '<th></th>',
                'default' => '<td></td>',
                array(
                    'name'     => 'conditionals',
                    'classBag' => 'Lia\Library\Bag\Bag'
                )
            )
        );
        $this->conditionals = $this->get('conditionals');
    }

    public function getTitle(){
        return $this->get('title');
    }

    public function getDefault(){
        return $this->get('default');
    }


    public function getConditionals($type='array'){
        return $this->conditionals->getAll($type);
    }

    /**
     * Set the default template for the cells of title
     *
     * Template is can be only the content of the cell or the cell entirely.<br />
     * The content tag must contain "data-content" attribute if the template is entirely<br />
     *
     * @param string $template
     * @return $this;
     */
    public function setTitle($template){
        return $this->add('title', $template);
    }

    /**
     * Set the default template for the cells of values
     *
     * Template is can be only the content of the cell or the cell entirely.<br />
     * The content tag must contain "data-content" attribute if the template is entirely<br />
     *
     * @param string $template
     * @return $this;
     */
    public function setDefault($template){
        return $this->add('default', $template);
    }

    /**
     * Add a conditional template for the cells of values
     *
     * Template is can be only the content of the cell or the cell entirely.<br />
     * The content tag must contain "data-content" attribute if the template is entirely<br />
     *
     * The $condition argument is used like an "if" statement in javascript<br />
     * Many strings are replaced by another thing :<br />
     * - {#value} : replaced by current value<br />
     * - {:.....} : ..... represent a key of value in the row dataSet.
     *
     * @param string $template
     * @param string $condition
     * @return $this;
     */
    public function addConditional($condition, $template){
        return $this->conditionals->add($condition, $template);
    }
}