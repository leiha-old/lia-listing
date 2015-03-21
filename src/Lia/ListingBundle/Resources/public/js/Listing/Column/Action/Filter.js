/**
 * @author leiha
 * @extends $lia.Listing.Column.Action
 *
 */
$lia.Listing.Column.Action.Filter = $lia.Class.create([$lia.Listing.Column.Action], {
    settingUp : function(){
        this.config = {
            'images'    : {
                'icon'  : 'filter'
            }
        }

        this.operators = {
            'text'        : {'=':'==', '!=':'!=', 'LIKE':'~~', 'NOT LIKE':'!~'},
            'text-strict' : {'=':'==', '!=':'!='},
            'numeric'     : {'=':'==', '!=':'!=', '>':'>', '<':'<'},
            'date'        : {'=':'==', '!=':'!=', '>':'>', '<':'<'}
        };
    },

    init : function(parent, name, config){
        this._parents('init', arguments);
        this.nodeOfFilterList = null;
    },

    /**  */
    getNodeOfContent : function(){
        return this.node.container;
    },

    getOperators : function(){
        return this.operators[this.getColumn().getType()];
    },

    buildAddForm : function(){
        var f = this.getColumn().getEditableFieldNode();
        var o = new $lia.Form.Field.Select();
        o.setOptions(this.getOperators());

        var $this = this;
        var b = this.theme.getIcon('add').click(function(){
            $this.root.settings.setFilter(
                $this.getColumn().getName(),
                o.getValue(),
                f.getValue()
            )

            $this.buildAddList();
            $this.root.bridge.send();
        });

        var n = $('<div></div>')
            .addClass('lia-listing-filter-add')
            .append(o.render())
            .append(f.render())
            .append(b)
            ;

        return n;
    },

    buildAddList : function(){
        var table     = $('<table></table>').appendTo(this.nodeOfFilterList.empty());
        var operators = this.getOperators();
        var where     = this.root.settings.getFilter(this.getColumn().getName())
        $.forEach(where, function(item, i){
            var $this = this;
            var b = this.theme.getIcon('delete').click(function(){
                $this.root.settings.unsetFilter(where[i][0], where[i][1], where[i][2]);
                $this.buildAddList();
                $this.root.bridge.send();
            });

            $('<tr></tr>')
                .append(b)
                .append('<td>' + operators[item[1]] +'</td>')
                .append('<td>'+ item[2] +'</td>')
                .appendTo(table)
            ;

        }, this);
        return this.nodeOfFilterList;
    },

    /**  */
    build : function(){
        this.nodeOfFilterList = $('<div></div>')
            .addClass('lia-listing-filter-list')
        ;
        this.buildAddList();

        this.node.getNode()
            .addClass('lia-listing-filter')
            .empty()
            .append(this.buildAddForm())
            .append(this.nodeOfFilterList)
        ;
    }
});