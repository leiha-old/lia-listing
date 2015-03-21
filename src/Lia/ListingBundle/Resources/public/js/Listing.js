/**
 * @author leiha
 */
$lia.Listing = $lia.Class.create({
    init : function(name, config){
        this.name   = name;
        this.config = {
            'theme'   : 'LiaListingBundle',
            'actions' : {
                'hideable'   : true,
                'resizable'  : true,
                'exportable' : true,
                'refreshable': true,
                'selectable' : true,
                'addable'    : true,
                'pageable'   : {}
            }
        };
        $.extend(true, this.config, config ? config : {});
        this.node     = {
            'container' : null,
            'head'      : null,
            'table'     : null
        };

        /** @type {$lia.Listing} */
        this.root     = this;

        /** @type {$lia.Listing.Settings} *//*
        this.settings = this._factory.Settings.new({
            'orderBy' : [['num','desc']],
            'limit'   : [0, 10]
        });*/

        this.setContainer('#'+ this.name);
        this.initSkeleton();

        /** @type {$lia.Listing.Rows} */
        this.rows      = this._factory.Rows.new(this);

        /** @type {$lia.Listing.Columns} */
        this.columns   = this._factory.Columns.new(this);

        this.menu      = this._factory.Actions.Action.Menu.new(this);

        /** @type {$lia.Listing.Actions} */
        //this.actions   = this._factory.Actions.new(this);

        /** @type {$lia.Listing.Bridge} */
        this.bridge   = this._factory.Bridge.new(this)
            .setDefaultUrl(this.config.uri)
        ;
    },

    setParams : function(params){
        this.settings = this._factory.Settings.new(this, params);
        return this;
    },

    getColumns : function(){
        if(this.settings.orderBy)
            return this.settings.orderBy;

        return this.columns.getColumnsKeys();
    },

    setContainer : function(xpath){
        this.node.container = $(xpath);
    },

    addColumn : function(name, config){
        if(config.columns)
            this.columns.addGroup(name, config);
        else
            this.columns.addColumn(name, config);

        return this;
    },

    addColumns : function(columns){
        var $this = this;
        $.each(columns, function (name, config) {
            $this.addColumn(name, config);
        });
        return this;
    },

    addAction : function(name, config){
        this.actions.addAction(name, config);
        return this;
    },

    setForm : function(config){
        this.form = config;
        return this;
    },

    setRows : function(rows, totalOfRows){
        this.rows.setRows(rows, totalOfRows);
        return this;
    },

    initSkeleton : function(){
        this.node.container
            .addClass('lia-listing-container')
        ;
        this.node.head  = $('<div></div>')
            .addClass('lia-listing-head')
            .appendTo(this.node.container)
        ;
        this.node.body  = $('<div></div>')
            .addClass('lia-listing-body')
            .appendTo(this.node.container)
        ;
        this.node.foot  = $('<div></div>')
            .addClass('lia-listing-foot')
            .appendTo(this.node.container)
        ;
        this.initSkeletonOfTable();
    },

    initSkeletonOfTable : function(){
        this.node.table = $('<table></table>').appendTo(this.node.body);
        this.node.thead = $('<thead></thead>').appendTo(this.node.table);
        this.node.thead.level1 = $('<tr></tr>').appendTo(this.node.thead);
        this.node.thead.level2 = $('<tr></tr>').appendTo(this.node.thead);
        this.node.tbody = $('<tbody></tbody>').appendTo(this.node.table);
        this.node.tfoot = $('<tfoot></tfoot>').appendTo(this.node.table);
    },

    renderMenu : function(){
        /** @type {$lia.Listing.Actions.Generic} */
        this.menuActions = this.root._factory.Actions.Generic.new(this, {});

        if(this.config.actions.addable) {
            this.menuActions.addAction('add', this.config.actions.addable);
        }

        if(this.menu.hasActions()) {
            this.menuActions.addAction('menu', this.menu);
        }

        if(this.config.actions.pageable) {
            this.menuActions.addAction('paginate', this.config.actions.pageable);
        }

        var node = this.menuActions.render();
        // If there is action(s) in menu then render give a node otherwise null
        if(node)
            node.appendTo(this.node.head);
    },

    refreshColumns : function(){
        this.rows.refresh();
        this.columns.refresh();
        //this.colGroups.render();
    },

    refreshRows : function(){
        this.rows.refresh();
    },

    render : function(){
        //this.settings.setColumns(this.prepareOrder());

        this.rows.render();
        this.columns.render();
        //this.colGroups.render();
        this.renderMenu();
    }
});

$lia.Listing.i18n = {};

/**
 * @author leiha
 *
 */
$lia.Listing.Commons = {
    init : function(parent, config){
        this.parent   = parent;
        this.root     = parent.root;
        this.config   = $.extend(true, {
            i18n  : {},
            node  : null,
            hooks : {},
            theme : parent.root.config.theme
        }, this.config, config ? config : {});

        this.initNode();
        try{
            this.theme = $lia.Theme.get(this.config.theme);
        }
        catch(error){
            throw new Error('Theme ['+ this.config.theme +'] not found !');
        }
    },

    initNode : function(){
        this.node = $lia.Node.getNode(this.config.node, '<div></div>');
    },

    i18n : function(id, values){
        if(this.root._factory.i18n[id]){
            return this.root._factory.i18n[id];
            //throw new Error('Internationalization key ['+ id +'] is not present in config');
        }
        return id;
    },

    getComponent : function(name, context){
        return this.root._factory.Component[name.capitalize()]
            .new($.isObject(context) ? context : this)
            ;
    },

    hasHook : function (name) {
        if(this.config.hooks)
            return $.isProperty(this.config.hooks, name);
    },

    applyHook : function (context, name, args, def) {
        if (this.hasHook(name)) {
            eval('var func = $.isFunction(' + this.config.hooks[name] + ')'
                + '? ' + this.config.hooks[name]
                + ': null'
            );
            return func
                ? func.apply(
                    context ? context : this,
                    $.isDefined(args, [])
                )
                : def
                ;
        }
        return def;
    }
};