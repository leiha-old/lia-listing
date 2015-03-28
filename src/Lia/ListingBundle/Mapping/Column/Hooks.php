<?php

namespace Lia\ListingBundle\Mapping\Column;

/**
 * @Annotation
 */
class Hooks {

    /** @var string */
    public $onGetRenderValue;

    /** @var string */
    public $onGetValue;

    /** @var string */
    public $onSetValue;
}