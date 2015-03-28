<?php

namespace Lia\ListingBundle\Repository;

use Doctrine\ORM\QueryBuilder;
use Lia\ListingBundle\ParameterBag;

interface RepositoryEntityInterface
    extends RepositoryInterface
{
    /**
     * @param ParameterBag $params
     * @return QueryBuilder
     */
    public function getQueryForListOfItems(ParameterBag $params);
}