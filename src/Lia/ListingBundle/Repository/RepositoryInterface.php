<?php

namespace Lia\ListingBundle\Repository;


use Doctrine\ORM\QueryBuilder;
use Lia\ListingBundle\ParameterBag;

interface RepositoryInterface {

    /**
     * @param QueryBuilder $query
     * @param ParameterBag $params
     * @return integer
     */
    public function getCountOfItems(QueryBuilder $query=null,ParameterBag $params);

    /**
     * @param ParameterBag $params
     *
     * @return array
     */
    public function getListOfItems(ParameterBag $params);
}