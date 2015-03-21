/**
 * @author leiha
 * @extends $lia.Listing.Commons
 *
 */
$lia.Listing.Row.ColGroup = $lia.Class.create([$lia.Listing.Commons], {
    init : function(parent, name, refCol){
        this.name     = name;

        /** @type {Listing.Columns.Column} */
        this.refCol   = refCol;
        this.parent   = parent;
        this.root     = parent.root;
        this.columns  = {};
        this.setColumns();
    },

    setColumns : function(){
        $.forEach(this.refCol.columns, function(refCol, name){
            this.columns[name] = this.parent._factory.Column.new(this.parent, name, refCol);
        }, this);
        return this;
    },

    destroy : function(){
        $.forEach(this.columns, function (column) {
            column.destroy();
        });
        return this;
    },

    isVisible : function(visible){
        return this.refCol.isVisible(visible);
    },

    render : function(order){
        var nodes = [];
        $.forEach(order, function (obj) {
            var column = this.columns[obj.n];
            if(!obj.c){
                if(obj.v){
                    nodes.push(column.render());
                }
            } else if(column.refCol.isVisible(obj.v)){
                nodes.push(column.render(obj.v));
            }


        }, this);

        return nodes;
    }

    /*
    render : function(order){
        var nodes = [];
        $.forEach(order, function (obj) {
            var column = this.columns[obj.n];
            if(!$.isObject(obj.v)){
                if(obj.v){
                    nodes.push(column.render());
                }
            } else if(column.refCol.isVisible(obj.v)){
                nodes.push(column.render(obj.v));
            }
        }, this);

        return nodes;
    }*/
});