/**
 * @author leiha
 * @extends $lia.Listing.Commons
 */
$lia.Listing.Column = $lia.Class.create([$lia.Listing.Commons], {
    settingUp : function(){
        this.config = {
            'label'       : '',
            'type'        : 'text',
            'dataSet'     : {},
            'dataSetKeys' : [],
            'actions'     : {
                'sortable'   : {
                    'theme'     : ''
                },
                'filterable' : {},
                'editable'   : false,
                'groupable'  : false
            },
            'hooks'     : {
                'onGetRenderValue' : null
            },
            'templates' : {
                'title' : '',
                'value' : {
                    'default'      : '',
                    'conditionals' : []
                }
            }
        };
    },

    init : function (parent, name, config) {
        this.type   = 'column';
        this.name   = name;
        this.parent = parent;

        /** @type {$lia.Listing} */
        this.root   = parent.root;

        this._parent.init.apply(this, [parent, config]);
        this.setActions();
    },

    /**
     * @protected
     */
    setActions : function(){
        var actions = {};
        // Check in config for available actions
        $.forEach({'sortable' : 'sort', 'filterable' : 'filter', 'groupable' : 'group'},
            function(action, prop){
                if(this.config.actions[prop])
                    actions[action] = this.config.actions[prop];
            }
            , this);

        /** @type {$lia.Listing.Actions.Column} */
        this.actions = this._factory.Actions.new(this, {});
        this.actions.addAction(actions);
    },

    initNode : function(){
        this.node = $lia.Node.getCellNode(this.config.templates.title, '<th></th>');
    },

    getColumnKeys : function(){
        return this.name;
    },

    getName : function(slug){
        return this.config.name ? this.config.name : this.name;
    },

    isVisible : function(){
        return this.config.visible;
    },

    getType : function(){
        var type = this.config.type;
        if('text' == type && $.isArray(this.config.dataSet)){
            type = 'text-strict';
        } else if('string' == type){
            type = 'text';
        }
        return type;
    },

    destroy : function(){
        this.node.getNode().remove();
        return this;
    },

    getEditableFieldNode : function(){
        var f = null;

        fieldConfig = {};
        if(this.root.form.fields){
            var fieldConfig = this.root.form.fields[this.getName()];
        }

        var fieldType = this.getType().capitalize();
        if($lia.Form.Field[fieldType]){
            f = new $lia.Form.Field[this.getType().capitalize()](fieldConfig);
        } else {
            f = new $lia.Form.Field['Text'](fieldConfig);
        }
        return f;
    },

    /**  */
    isActionEnabled : function(actionName){
        return this.config.actions[actionName] ? true : false;
    },

    /**
     *
     * @param type key|value
     */
    /* !!!!!!!!! It was used before coupling with form object
    -----------------------------------------------
    getDataSetKey : function(type){
        var d = this.config.dataSetKeys;
        if(d.length){
            return d['value' == type && d.length == 2 ? 1 : 0];
        }
        return null;
    },

    getDataSetKeys : function(){
        return this.config.dataSetKeys.length
            ? this.config.dataSetKeys
            : null
            ;
    },

    getDataSetValue : function(value){
        if($.isArray(this.config.dataSet)){
            var key = this.getDataSetKey('key');
            // If array of objects (associated array)
            if(key){
                for(var i in this.config.dataSet){
                    if(this.config.dataSet[i][key] == value)
                        return this.config.dataSet[i][this.getDataSetKey('value')];
                }
            // Else it's a simple array
            } else{
                for(var i in this.config.dataSet){
                    if(i == value)
                        return this.config.dataSet[i];
                }
            }
        }
        return value;
    },

    getDataSet : function(withKeys){
        var dataSet = null;
        if($.isArray(this.config.dataSet)){
            dataSet = this.config.dataSet;
            if(true == withKeys){
                dataSet = [
                    dataSet,
                    this.config.dataSetKeys[0],
                    this.config.dataSetKeys[1]
                ];
            }
        }
        return dataSet;
    },
     -----------------------------------------------
     */

    getSlugName : function(){
        var name     = this.getName().split('.');
        var slugName = name[0];
        for(var i= 1, count=name.length;i< count;i++){
            slugName += name[i].capitalize();
        }
        return slugName;
    },

    getLabel : function () {
        return this.config.label
            ? this.config.label
            : this.name
            ;
    },

    getContent : function () {
        return $('<span>'+ this.getLabel() +'</span>')
            .addClass('lia-listing-column-label');
    },

    render : function () {
        this.node.getContentNode()
            .empty()
            .append(this.getContent())
        ;
        this.actions.render();
        return this.node.getNode()
            .addClass('lia-listing-column')
            .addClass('lia-listing-column-'+ this.getSlugName())
        ;
    }
});