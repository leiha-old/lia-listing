<?php

namespace Lia\ListingBundle\Library\Mapping\Column;

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