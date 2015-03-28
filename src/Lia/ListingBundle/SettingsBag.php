<?php

namespace Lia\ListingBundle;

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
                    'classBag' => 'Lia\ListingBundle\ActionsBag'
                )
            )
        );
        $this->actions = $this->get('actions');
    }
}