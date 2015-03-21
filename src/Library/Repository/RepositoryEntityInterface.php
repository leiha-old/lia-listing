<?php

namespace Lia\Bundle\ListingBundle\Library\Repository;

use Doctrine\ORM\QueryBuilder;
use Lia\Bundle\ListingBundle\Library\ParameterBag;

interface RepositoryEntityInterface
    extends RepositoryInterface
{
    /**
     * @param ParameterBag $params
     * @return QueryBuilder
     */
    public function getQueryForListOfItems(ParameterBag $params);
}