/**
 * @author leiha
 * @extends $lia.Listing.Commons
 */
$lia.Listing.Row.Column = $lia.Class.create([$lia.Listing.Commons], {
    init : function(parent, name, refCol){
        this.name     = name;

        /** @type {$lia.Listing.Columns.Column} */
        this.refCol   = refCol;

        /** @type {$lia.Listing.Rows.Row} */
        this.parent   = parent;

        /** @type {$lia.Listing} */
        this.root     = parent.root;
        this._parents('init', [parent, name]);

        /** @type {$lia.Form.Field} */
        this.field    = null;
    },

    getValue : function(){
        /* Split for iterate the nested values */
        var name   = this.refCol.getName().split('.');
        var values = this.parent.values;

        for(var i in name){
            values = values[name[i]];
        }
        return values;
    },

    setValue : function(value){
        /* Split for iterate the nested values */
        var name  = this.refCol.getName().split('.');
        var _eval = 'this.parent.values';
        for(var i in name){
            _eval +=  '["'+ name[i] +'"]';
        }
        eval(_eval +'="'+ value +'"');

        return this;
    },

    destroy : function(){
        this.node.getNode().remove();
        return this;
    },

    getRenderValue : function(){
        var value = this.getValue();
        return  this.refCol.applyHook(
            this,
            'onGetRenderValue',
            [value, this.parent.getValues()],
            value
        );
    },

    refresh : function(){
        var value = this.getRenderValue();
        var node  = this.getNode();

        node.html(value);
        node.getNode()
            .replaceAll(this.node.getNode())
        ;
        this.node = node;
        this.applyEditableEvent(node.getNode());
        return this;
    },

    render : function(){
        var value = this.getRenderValue();
        this.node.getContentNode()
            .empty()
            .append(value)
        ;
        return this.applyEditableEvent(this.node.getNode());
    },

    applyEditableEvent : function(node){
        var $this = this;
        if(this.refCol.isActionEnabled('editable')){
            node.click(function(){
                if($this.field)
                    return;

                $this.field = $this.refCol.getEditableFieldNode()
                    .event('focusout', function(){
                        $this.setValue($this.field.getValue());
                        $this.field = null;

                        $this.node.getContentNode()
                            .removeClass('lia-listing-cell-editable')
                        ;
                        $this.refresh();
                    })
                ;

                var fieldNode = $this.field.setValue($this.getValue()).render();
                $this.node.getContentNode()
                    .addClass('lia-listing-cell-editable')
                    .empty()
                    .append(fieldNode)
                ;

                //fieldNode.css('width', $this.node.getContentNode().outerWidth(false));
                $this.field.getNode().focus();
            });
        }
        return node;
    },

    initNode : function(){
        this.node = this.getNode();
    },

    getNode : function(){
        var values = this.parent.values;
        //var values = $.extend({'#value': this.getValue()}, this.parent.values);
        return $lia.Node.getConditionalCellNode(
            this.refCol.config.templates.conditionals,
            this.refCol.config.templates.default,
            values
        );


    }
});