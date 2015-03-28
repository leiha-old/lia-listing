<?php

namespace Lia\ListingBundle\Mapping\Column;

/**
 * @Annotation
 */
class Actions {

    /** @var boolean */
    public $sortable;

    /** @var boolean */
    public $filterable;

    /** @var boolean */
    public $editable;
}