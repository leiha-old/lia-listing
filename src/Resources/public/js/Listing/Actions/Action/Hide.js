/**
 * @author leiha
 * @extends $lia.Listing.Actions.Action
 *
 */
$lia.Listing.Actions.Action.Hide = $lia.Class.create([$lia.Listing.Actions.Action], {
    /**
     * @protected
     */
    settingUp : function(){
        this.config    = {
            images : {
                'icon': 'settings'
            }
        };
    },

    init : function(parent, name, config){
        this.checkBoxs  = {};
        this.nodeOfList = null;
        this._parent.init.apply(this, arguments);
    },



    buildSortable : function(elementsKeys, elements, parentKey){
        var li = null;
        var ul = $('<ul></ul>');

        elements = elements.columns;
        $.forEach(elementsKeys, function(obj){
            var html     = $('<div></div>');
            var checkbox = new $lia.Form.Field.Checkbox(obj.n);
            var label    = $('<div>'+ elements[obj.n].getLabel()+'</div>')
                .appendTo(html)
                ;

            li = $('<li></li>')
                .data('element', elements[obj.n])
                .html(html)
                .appendTo(ul)
            ;

            if(obj.c){
                this.buildGroupColumns(html, label, li ,checkbox, obj.c, obj.n);
                li.append(this.buildSortable(obj.c, elements[obj.n], obj.n));
                this.toggleGroupColumn(obj.n);
            }
            else {
                this.buildColumn(html, label, li ,checkbox, obj.v, parentKey);
            }
        }, this);

        var $this = this;
        ul.sortable({
            cursor: 'move',
            update: function( event, ui ) {
                $this.saveOrder();
            }
        });

        return ul;
    },

    buildGroupColumns : function(html, label, li ,checkbox, visible, key){
        var $this = this;
        this.checkBoxs[key] = {
            'checkbox' : checkbox,
            'children' : []
        };

        checkbox.event('change', function(event){
            var field   = $(this).data('factory');
            var checked = field.isChecked();
            $.forEach($this.checkBoxs[field.getName()].children, function(checkbox){
                checkbox.check(checked).getNode().trigger('change');
                event.stopPropagation();
            });
        });

        html.prepend(checkbox.check(visible).render()).css({
            'white-space'   :'nowrap',
            'vertical-align':'middle'
        });

        label.css({
            'padding' :'0 5px',
            'display' :'inline-block',
            'top'     :'-3px',
            'position':'relative'
        });
    },

    buildColumn : function(html, label, li ,checkbox, visible, parentKey){
        var $this = this;

        if(parentKey){
            checkbox.data('parentKey', parentKey);
            this.checkBoxs[parentKey].children.push(checkbox);
        }

        html.prepend(checkbox.check(visible).render()).css({
            'white-space'   :'nowrap',
            'vertical-align':'middle'
        });

        label.css({
            'padding' :'0 5px',
            'display' :'inline-block',
            'top'     :'-3px',
            'position':'relative'
        });

        li.data('checkbox', checkbox.event('change', function(event){
            event.stopPropagation();

            $this.saveOrder();
            var parentKey = checkbox.data('parentKey');
            if(parentKey){
                $this.toggleGroupColumn(parentKey);
            }
        }));
    },

    toggleGroupColumn : function(key){
        var count = 0;
        var checkBoxs = this.checkBoxs[key];
        $.forEach(checkBoxs.children, function(checkbox){
            if(checkbox.isChecked()){
                count++;
            }
        }, this);
        checkBoxs.checkbox.check(count > 0);
    },

    /**
     * @private
     */
    extractItemFromNode : function(parentNode){
        var $this   = this;
        var columns = [];
        $('> li', parentNode).each(function(){
            var li  = $(this);
            var ul  = $('> ul', li);
            var obj = li.data('element');

            var column = {}
            column.n   = obj.name;
            if(ul.length){
                column.c = $this.extractItemFromNode(ul);
            } else {
                column.v = li.data('checkbox').isChecked();
            }
            columns.push(column);
        });
        return columns;
    },

    /**
     * @private
     */
    saveOrder : function(){
        var columns = this.extractItemFromNode(this.nodeOfList);
        this.root.settings.setColumns(columns);
        this.root.refreshColumns();
    },

    /**  */
    buildContent : function(){
        var columnsKey = this.root.settings.getColumns();

        this.nodeOfList = this.buildSortable(columnsKey, this.root.columns);

        var title = $('<h3>' + this.i18n('Columns') + '</h3>').css({
            'padding': '5px'
        });

        return $('<div></div>')
            .addClass('lia-listing-action-hide-content')
            .on('click', function(event) {
                event.stopPropagation();
            })
            .append(title)
            .append(this.nodeOfList)
        ;
    },

    /**  */
    build : function(){
        var $this = this;
        this.node.getNode()
            .addClass('lia-listing-menu-action lia-listing-action-hide')
            //.append(this.getNodeOfIcon('icon'))
            .append(this.i18n('Columns'))
            .click(function(event){
                if(!$this.component){
                    $this.component = $this.getComponent('slide');
                }

                if(!$this.component.isOpen()) {
                    $this.component.html($this.buildContent());
                }

                $this.component.toggle($this.node.getNode());
            })
        ;
    }
});