<?php

namespace Lia\Bundle\ListingBundle\Library\Mapping\Column;

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