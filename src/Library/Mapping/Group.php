<?php

namespace Lia\Bundle\ListingBundle\Library\Mapping;

/**
 * @Annotation
 */
class Group {

    /** @var string */
    public $name;

    /** @var string */
    public $label;

    /** @var string */
    public $template;

    /** @var array */
    public $columns;

}