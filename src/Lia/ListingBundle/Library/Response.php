<?php

namespace Lia\ListingBundle\Library;


use Lia\ListingBundle\Controller\ListingController;
use Lia\Library\Bridge\BridgeInterface;

class Response implements BridgeInterface {

    protected $listing;

    protected $data;

    public function __construct(ListingController $listing){
        $this->listing = $listing;
        $this->data    = array(
            'status' => 'succeed',
            'type'   => 'Listing',
            'name'   => $listing->getName(),
            'todo'   => array()
        );
    }

    public function setStatus($status){
        $this->data['status'] = $status;
        return $this;
    }

    public function addTodoRefreshItems(\JsonSerializable $rows=null){
        if(!$rows){
            if(!$this->listing->rows->length()
                && $this->listing->em
            ){
                $this->listing->setRows(
                    $this->listing->em->getListOfItems ($this->listing->parameters),
                    $this->listing->em->getCountOfItems(null, $this->listing->parameters)
                );
            }
            $rows = $this->listing->rows;
        }
        $this->data['todo']['listing-refresh'] = $rows;
        return $this;
    }

    public function addTodoRefreshItem($id, array $row, $blink=true, $field='id'){
        $this->data['todo']['listing-refresh-item'][$id] = array(
            'id'     => $id,
            'field'  => $field,
            'blink'  => $blink,
            'row'    => $row
        );
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
        return $this->data;
    }
}