<?php

namespace Lia\ListingBundle\Library;

use Lia\Library\Bag\Bag;

class SettingsBag
    extends Bag
{
    /**
     * @var ActionsBag
     */
    public $actions;

    public function __construct(){
        parent::__construct(
            array(
                'uri',
                'cookie',
                array(
                    'name'     => 'actions',
                    'classBag' => 'Lia\ListingBundle\Library\ActionsBag'
                )
            )
        );
        $this->actions = $this->get('actions');
    }
}