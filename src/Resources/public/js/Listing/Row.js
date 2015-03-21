/**
 * @author leiha
 * @extends $lia.Listing.Commons
 */
$lia.Listing.Row = $lia.Class.create([$lia.Listing.Commons], {
    init : function(parent){
        this.values   = {};
        this.columns  = {};
        this.parent   = parent;
        this.root     = parent.root;
        this.node     = $('<tr></tr>');
        this.columns  = {};
        this.setColumns();
    },

    setValues : function(values){
        this.values = values;
        return this;
    },

    getValues : function(){
        return this.values;
    },

    setColumns : function(){
        $.forEach(this.root.columns.columns, function(refCol, name){
            if(refCol.columns) {
                this.columns[name] = this._factory.ColGroup.new(this, name, refCol);
            }
            else {
                this.columns[name] = this._factory.Column.new(this, name, refCol);
            }
        }, this);
        return this;
    },

    render : function(){
        var columns = this.root.settings.getColumns();
        $.forEach(columns, function (obj) {
            var column = this.columns[obj.n];
            column.destroy();
            if(!obj.c){
                if(obj.v){
                    this.node.append(column.render());
                }
            } else if(column.isVisible(obj.c)){
                this.node.append(column.render(obj.c));
            }
        }, this);
        return this.node;
    }
});