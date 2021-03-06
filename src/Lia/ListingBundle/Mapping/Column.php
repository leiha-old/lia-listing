<?php

namespace Lia\ListingBundle\Mapping;

/**
 * @Annotation
 */
class Column {

    /** @var string */
    public $name;

    /** @var string */
    public $label;

    /** @var string */
    public $link;

    /** @var bool */
    public $className;

    /** @var bool */
    public $visible=true;
}