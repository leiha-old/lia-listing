<?php

namespace Lia\ListingBundle;

/**
 * @author leiha
 */
class Rows implements \JsonSerializable{

    protected $_rows        = array();
    protected $_totalLength = 0;

    public function __toString(){
        return json_encode($this->_rows);
    }

    public function length(){
        return $this->_totalLength;
    }

    /**
     * @param array $items
     * @return $this;
     */
    public function setRows(array $items){
        $this->_rows = $items;
        return $this;
    }

    /**
     * @param int $length
     * @return $this;
     */
    public function setTotalLength($length){
        $this->_totalLength = $length;
        return $this;
    }

    /**
     * (PHP 5 &gt;= 5.4.0)<br/>
     * Specify data which should be serialized to JSON
     * @link http://php.net/manual/en/jsonserializable.jsonserialize.php
     * @return mixed data which can be serialized by <b>json_encode</b>,
     * which is a value of any type other than a resource.
     */
    public function jsonSerialize()
    {
        return array(
            'total' => $this->length(),
            'items' => $this->_rows
        );
    }
}
