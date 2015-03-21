<?php

namespace Lia\ListingBundle\Library;

use JsonSerializable;

/**
 * @author leiha
 */
class Row
    implements JsonSerializable {

    protected $_values = array();

    public function __toString() {
        return json_encode(
            $this->jsonSerialize()
        );
    }

    /**
     * (PHP 5 >= 5.4.0)
     * Serializes the object to a value that can be serialized natively by json_encode().
     *
     * @link http://docs.php.net/manual/en/jsonserializable.jsonserialize.php
     * @return mixed Returns data which can be serialized by json_encode(),
     * which is a value of any type other than a resource.
     */
    function jsonSerialize() {
        return array(
            'values'=> $this->_values
        );
    }}
