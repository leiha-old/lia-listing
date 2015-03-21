<?php

namespace Lia\Bundle\ListingBundle\Library\Repository;

use Doctrine\ORM\EntityRepository as ORMEntityRepository;
use Doctrine\ORM\NoResultException;
use Doctrine\ORM\Query;
use Doctrine\ORM\QueryBuilder;
use Doctrine\ORM\Tools\Pagination\Paginator;
use Lia\Bundle\ListingBundle\Library\ParameterBag;

abstract class EntityRepository
    extends    ORMEntityRepository
    implements RepositoryEntityInterface
{
    protected $countOfItems = null;

    public function getItem($id, $field='id', $singleItem=true){
        if(!is_array($id))
            $id = array($field => $id);

        return $this->{'find'.($singleItem ? 'One' : '').'By'}($id);
    }

    public function createItem(array $data){
        $this->createItemIterator($data);
        $this->getEntityManager()->flush();
        return ;
    }

    public function updateItem($id, array $data, $field='id'){
        $item = $this->getItem($id, $field);
        $this->updateItemIterator($item, $data);
        $this->getEntityManager()->flush();
        return ;
    }

    public function deleteItem($id, $field='id'){
        $query = $this->createQueryBuilder('p')->delete();
        return $query
            ->where($field.' = ?'.$field)
            ->setParameter($field, $id)
            ->getQuery()
            ->execute()
            ;
    }

    protected function createItemIterator(array $data, $entityName='default'){
        $entityName = $this->tablesCode[$entityName]['namespace'];

        $item = new $entityName();
        foreach($data as $key=>$value){
            $key = ucfirst($key);
            if(is_array($value)){
                $value = $this->createItemIterator($value, $key);
            }
            $item->{'set'.$key}($value);
        }

        $em = $this->getEntityManager();
        $em->persist($item);
        return $item;
    }

    protected function updateItemIterator($item, array $data){
        foreach($data as $key=>$value){
            $key = ucfirst($key);
            if(is_array($value)){
                $value = $this->updateItemIterator($item->{'get'.$key}, $value, $key);
            }
            $item->{'set'.$key}($value);
        }

        //$em = $this->getEntityManager();
        //$em->persist($item);
        return $item;
    }

    /**
     * Return the number of items (concerned by the query without limit) in the DB
     *
     * @param QueryBuilder $query Used inside the class only (by default)
     *
     * @param \Lia\Bundle\ListingBundle\Library\ParameterBag $params
     * @return integer
     */
    public function getCountOfItems(QueryBuilder $query=null, ParameterBag $params){
        if(is_null($query)){
            $query = $this->getQueryForListOfItems($params);
            $this->countOfItems = count(new Paginator($query, true));
        }
        return $this->countOfItems;
    }

    public function getRelatedTableCode($field){
        $field = explode('.', $field);
        if(count($field) == 1){
            $field[1] = $field[0];
            $field[0] = 'default';
        }
        $field[0] = $this->tablesCode[$field[0]]['alias'];
        $field    = implode('.', $field);

        return $field;
    }

    /**
     * Get the list of items
     *
     * @param ParameterBag $params
     *
     * @return array
     */
    public function getListOfItems(ParameterBag $params) {
        return $this->execGetListOfItems($this->getQueryForListOfItems($params), $params);
    }

    /**
     * Executes a query for retrieve the list of item since the DB
     *
     * @param QueryBuilder $query
     * @param ParameterBag $params
     *
     * @return array
     */
    protected function execGetListOfItems(QueryBuilder $query, ParameterBag $params) {
        if($orderBys = $params->getOrder()){
            foreach($orderBys as $orderBy){
                $query->addOrderBy($this->getRelatedTableCode($orderBy[0]), $orderBy[1]);
            }
        }

        if($wheres = $params->getWhere()){
            foreach($wheres as $i=>$where){
                $query
                    ->andWhere($this->getRelatedTableCode($where[0]).' '.$where[1].' ?'.$i)
                    ->setParameter($i, $where[2])
                ;
            }
        }

        $this->getCountOfItems($query, $params);
        try {
            list($start, $limit) = $params->getLimit();
            return $query
                ->setFirstResult($start)
                ->setMaxResults ($limit)
                ->getQuery()
                ->getResult(Query::HYDRATE_ARRAY)
            ;

        } catch (NoResultException $e) {
            return array();
        }
    }


}