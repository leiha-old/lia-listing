<?php

namespace Lia\ListingBundle\Controller;

use Lia\FormBundle\Library\Form;

use Lia\ListingBundle\ParameterBag;
use Lia\ListingBundle\Repository\EntityRepository;
use Lia\ListingBundle\Repository\RepositoryEntityInterface;
use Lia\ListingBundle\Response;
use Lia\ListingBundle\SettingsBag;

use Lia\Library\Asset\AssetTrait;
use Lia\Library\Asset\AssetInterface;
use Lia\Library\Controller\Controller;
use Lia\ListingBundle\Column;
use Lia\ListingBundle\Colgroup;
use Lia\ListingBundle\Columns;
use Lia\ListingBundle\ModelInterface;
use Lia\ListingBundle\Rows;


abstract class ListingController
    extends Controller
    implements AssetInterface, ListingInterface
{
    //use AssetTrait;

    /**
     * @var ModelInterface
     */
    public $model;

    /**
     * @var Rows
     */
    public $rows;

    /**
     * @var Columns
     */
    public $columns;

    /**
     * @var SettingsBag
     */
    public $settings;

    /**
     * @var ParameterBag
     */
    public $parameters;

    /**
     * @var Form
     */
    public $form;

    /**
     * @var EntityRepository
     */
    public $em;

    /**
     * @var Response
     */
    public $response;

    protected function __internal() {
        $this->response   = new Response($this);
        $this->rows       = new Rows();
        $this->columns    = new Columns();
        $this->settings   = new SettingsBag();
        $this->settings->add('cookie', $this->getCookieName());

        $this->parameters = new ParameterBag();
        $this->parameters
            ->setBagName($this->getCookieName())
            ->enableCookieStacking(true, true)
        ;

        $this->getLia()
            ->registerResource($this)
            ->registerTheme('LiaListingBundle', array(
                    'paths'=>
                        array(
                            'theme'=> '/bundles/lialisting/'
                        )
                )
            )
        ;
        $this->__settingUp();
        parent::__init();
    }

    public function __toString() {
        return parent::renderView('LiaListingBundle::index');
    }

    public function setEntityManagerByName($name){
        $em = $this->getRepository($name);
        $this->setEntityManager($em);
    }

    public function setEntityManager(RepositoryEntityInterface $em){
        $this->em = $em;
    }

    public function getCookieName(){
        return 'LiaListingBundle';
    }

    public function getThemeName(){
        return 'LiaListingBundle';
    }

    public function getThemeSettings(){
        return new \stdClass();
    }

    public function buildResourcesFooter() {
        return $this->renderView('LiaListingBundle::resourceFooter', array(), true);
    }

    public function buildResourcesHeader() {
        return $this->renderView('LiaListingBundle::resourceHeader', array(), true);
    }

    public function getDefaultUri(){
        return $this->getRequest()->getUri().'listing/';
        //return $this->get('request')->attributes->get('_route');
    }

    /**
     * @param string $name
     * @param array  $columns
     *
     * @return Colgroup;
     */
    public function addGroup($name, array $columns = array()) {
        return $this->columns->addGroup($name, $columns);
    }

    /**
     * @param string $name
     * @param array  $settings
     *
     * @return Column;
     */
    public function addColumn($name, array $settings = array()) {
        return $this->columns->addColumn($name, $settings);
    }

    /**
     * @param ModelInterface $model
     *
     * @return $this
     */
    public function setModel(ModelInterface $model) {
        $this->model = $model;
        return $this;
    }

    /**
     * @param Form   $form       Form used in listing
     * @param string $entityName Entity for Form Configuration
     *
     * @return $this
     */
    public function setForm(Form $form=null, $entityName='') {
        $this->form = $form ? $form : new Form();
        if($entityName)
            $this->form->extractAnnotationConfig($entityName);

        return $this;
    }

    /**
     * @param array $items
     * @param int   $totalLength Useful for Pagination
     *
     * @return $this
     */
    public function setRows(array $items, $totalLength=null) {
        $this->rows->setRows($items);
        if(is_int($totalLength))
            $this->rows->setTotalLength($totalLength);
        return $this;
    }

    public function setConfigByArray(array $config){
        if(isset($config['actions'])){
            $this->settings->actions->set($config['actions']);
            unset($config['actions']);
        }
        $this->settings->set($config);
        return $this;
    }

    /**
     * Can do For automatize the render of listing (http or ajax)
     * @param string $templateName
     * @param \JsonSerializable $rows
     * @return Response
     */
    public function renderListingAction($templateName='index', \JsonSerializable $rows=null) {
        if(!$this->getRequest()->isXmlHttpRequest()) {
            $this->setRows(
                $this->em->getListOfItems($this->parameters),
                $this->em->getCountOfItems(null, $this->parameters)
            );
            $this->settings->add('uri', $this->getRequest()->getUri());
            $response = $this->render($templateName);
        } else {
            $this->response->addTodoRefreshItems($rows);
            $response = $this->getAjaxResponse('succeed')
                ->addElement($this->response)
                ->render()
            ;
        }
        return $response;
    }
}