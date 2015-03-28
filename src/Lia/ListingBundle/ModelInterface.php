<?php

namespace Lia\ListingBundle;

/**
 * @author leiha
 *
 */
interface ModelInterface{

    /**
     * @param string $value
     * @param string $field
     */
    public function getItem($value, $field='id');

    public function getListOfItems();

    public function getTotalOfItems();
}