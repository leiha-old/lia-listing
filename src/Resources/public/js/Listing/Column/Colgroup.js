/**
 * @author leiha
 * @extends $lia.Listing.Commons
 */
$lia.Listing.Column.ColGroup = $lia.Class.create([$lia.Listing.Commons], {
    init : function(parent, name, config){
        this.type = 'group';
        this.name = name;
        this.node = {
            'container' : null,
            'content'   : null
        };
        this.config = {
            'label'     : '',
            'template'  : '',
            'columns'   : {}
        };

        this._parents('init', [parent, config]);

        this.columns      = {};
        this.numOfColumns = 0;
        this.setColumns(this.config.columns);
    },

    initNode : function(){
        this.node = $lia.Node.getCellNode(this.config.template, '<th></th>');
    },

    getColumnKeys : function(){
        var keys = [];
        $.forEach(this.columns, function (column, key) {
            var c;
            if('column' == column.type){
                c = {n: key, v: column.isVisible()};
            }
            else {
                c =  {n: key, c: column.getColumnKeys()};
            }
            keys.push(c);
        }, this);
        this.columnsKey = keys;
        return this.columnsKey;
    },

    setColumns : function (columns) {
        $.forEach(columns, function (config, name) {
            this.addColumn(name, config);
        }, this);
        return this;
    },

    addColumn : function (name, config) {
        this.columns[name] = this.root._factory.Column
            .new(this.parent, name, config)
        ;
        this.numOfColumns++;
        return this.columns[name];
    },

    has : function(key){
        return $.inArray(key, this.columns) > -1;
    },

    getSlugName : function(){
        return this.name;
    },

    getContent : function () {
        return $('<span>'+ this.getLabel() +'</span>')
            .addClass('lia-listing-colgroup-label');
    },

    render : function () {
        this.node.getContentNode()
            .empty()
            .append(this.getContent())
        ;

        return this.node.getNode()
            .addClass('lia-listing-colgroup')
            .addClass('lia-listing-colgroup-'+ this.getSlugName())
            ;
    },

    destroy : function(){
        this.node.getNode().remove();
        $.forEach(this.columns, function (column) {
            column.destroy();
        });
        return this;
    },

    isVisible : function(visible){
        var i = 0;
        $.forEach(this.columns, function (column) {
            if(!visible){
                if(column.isVisible()){
                    i++;
                }
            } else {
                var founded = false;
                var name    = column.name;
                for(var x in visible){
                    if(visible[x].n == name){
                        founded = true;
                        //if columns is present in setting and equal to TRUE then count it for display
                        if(visible[x].v === true){
                            i++;
                        }
                        break;
                    }
                }

                //if columns is not present in setting then count it for display
                if(!founded){
                    i++;
                }
            }

        }, this);
        return i > 0;
    },

    getLabel : function () {
        return this.config.label
            ? this.config.label
            : this.name
            ;
    },

    renderColumns : function(order){
        var nodes = [];
        $.forEach(order, function (obj) {
            var column = this.columns[obj.n];
            if(obj.v){
                nodes.push(column.render());
            }
        }, this);

        return nodes;
    }
});