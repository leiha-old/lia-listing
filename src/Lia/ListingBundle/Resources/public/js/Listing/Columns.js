/**
 * @author leiha
 * @extends $lia.Listing.Commons
 */
$lia.Listing.Columns = $lia.Class.create([$lia.Listing.Commons], {
    init : function (parent) {
        this.parent = parent;

        /** @type {Listing} */
        this.root = parent.root;
        this.node = {
            1 : parent.node.thead.level1,
            2 : parent.node.thead.level2
        };

        /** @type {Listing.Columns.Column[]} */
        this.columns = {};
        this.columnsKey = null;
    },

    setColumns : function (columns) {
        var $this = this;
        $.each(columns, function (name, config) {
            $this.addColumn(name, config);
        });
        return this;
    },

    addColumn : function (name, config) {
        this.columns[name] = this.root._factory.Column
            .new(this, name, config)
        ;
        return this.columns[name];
    },

    addGroup : function (name, config) {
        this.columns[name] = this.root._factory.Column.ColGroup
            .new(this, name, config)
        ;
        return this.columns[name];
    },

    getColumnsKeys : function(){
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

    refresh : function(){
        this.node[1].empty();
        this.node[2].empty();
        this.render();
    },

    render : function () {
        $.forEach(this.root.settings.getColumns(), function (obj) {
            var column = this.columns[obj.n];
            column.destroy();
            if(!obj.c){
                if(obj.v){
                    this.node[1].append(
                        this.columns[obj.n].render()
                            .attr('rowspan', 2)
                            .css ('vertical-align', 'bottom')
                    );
                }
            // if var column is a group of columns
            } else if(column.isVisible(obj.c)){
                var columns = column.renderColumns(obj.c);
                this.node[1].append(column.render().attr('colspan', columns.length));
                this.node[2].append(columns);
            }
        }, this);
    }
});