/**
 * @type {$lia.Class._proto}
 * @extends $lia.Listing.Component
 */
$lia.Listing.Component.Popin = $lia.Class.create([$lia.Listing.Component], {
    init : function(parent, config){
        this.config = {
            modal: true
        };
        this._parent.init.apply(this, arguments);
    },


    open : function(node, content){
        var $this = this;
        this.node.getContentNode().html(content);
        this.node.getNode()
            .dialog(this.config);
        ;
        this.opened = true;
    }
});