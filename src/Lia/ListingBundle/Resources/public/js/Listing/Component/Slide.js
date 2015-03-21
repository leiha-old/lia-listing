/**
 * @type {$lia.Class._proto}
 * @extends $lia.Listing.Component
 */
$lia.Listing.Component.Slide = $lia.Class.create([$lia.Listing.Component], {
    init : function(parent, config){
        this.config = {
            'speed'     : 250,
            'css'       : {
                /* background  : 'white' */
                /*border      : '1px solid #000000'*/
            }
        };
        this._parent.init.apply(this, arguments);
    },

    open : function(node, callbacks){
        if(!this.isBuilt()){
            this.build(node);
        }

        var $this = this;
        this.node.html(this.content);
        this.node.getNode()
            .slideDown(this.config.speed, function(){
                $this.opened = true;
                $this.node.getNode()
                    .css({
                        'min-width' : $this.node.getNode().width(),
                        'min-height': $this.node.getNode().height()
                    });
            })
        ;
    },

    close : function(node, callbacks){
        var $this = this;
        this.node.getNode()
            .css({
                'min-width' : 0,
                'min-height': 0
            });

        this.node.getNode().slideUp(this.config.speed, function(){
            if($.isPlainObject(callbacks) && callbacks.onClose) {
                callbacks.onClose();
            }
            $this.opened = false;
            $this.destroy();
        });
    },

    css : function(css){
        return this.node.getNode().css(css);
    },

    build : function(node){
        this.built = true;
        this.node.getNode()
            .addClass('lia-listing-component-slide')
            .css($.extend(true, this.config.css, {
                display     : 'none',
                position    : 'absolute'
            })).appendTo(node)
        ;

        if($.isFunction(node)){
            node(this.node.getNode(), this);
        }
        else if($.isJquery(node)){
            var position = {top : 0,left : 0};
            this.node.getNode().css({
                top         : position.top + node.innerHeight(),
                left        : position.left - parseInt(node.css('border-left-width'))
            });
        }
    }
});