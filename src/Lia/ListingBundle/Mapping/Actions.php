<?php

namespace Lia\ListingBundle\Mapping;

/**
 * @Annotation
 */
class Actions {

    /** @var bool */
    public $hideable=false;

    /** @var bool */
    public $resizable=false;

    /** @var bool */
    public $exportable=false;

    /** @var bool */
    public $refreshable=false;

    /** @var bool*/
    public $selectable=false;

    /** @var bool */
    public $pageable=false;

    /** @var bool */
    public $editable=false;

    /** @var bool */
    public $moveable=false;

}