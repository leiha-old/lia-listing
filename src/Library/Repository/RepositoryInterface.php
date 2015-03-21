<?php

namespace Lia\Bundle\ListingBundle\Library\Repository;


use Doctrine\ORM\QueryBuilder;
use Lia\Bundle\ListingBundle\Library\ParameterBag;

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