<?php

namespace Lia\ListingBundle\Library\Repository;

use Doctrine\ORM\QueryBuilder;
use Lia\ListingBundle\Library\ParameterBag;

interface RepositoryEntityInterface
    extends RepositoryInterface
{
    /**
     * @param ParameterBag $params
     * @return QueryBuilder
     */
    public function getQueryForListOfItems(ParameterBag $params);
}