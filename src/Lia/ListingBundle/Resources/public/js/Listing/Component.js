/**
 * @author leiha
 * @extends $lia.Listing.Commons
 */
$lia.Listing.Component = $lia.Class.create([$lia.Listing.Commons], {
    init : function(parent, config){
        this._parent._parent.init.apply(this, arguments);
        this.content = '';
        this.built   = false;
        this.opened  = false;
        this.node.getNode()       .addClass('lia-listing-component');
        this.node.getContentNode().addClass('lia-listing-component-content');
    },

    html : function(content){
        this.content = content;
    },

    isOpen : function(){
        return this.opened;
    },

    isBuilt : function(){
        return this.built;
    },

    destroy : function(){
        this.built = false;
        this.node.getNode().remove();
    },

    build  : function(node){},
    open   : function(node, callbacks){},
    close  : function(node, callbacks){},
    toggle : function(node, callbacks){
        this[this.isOpen() ? 'close' : 'open'].apply(this, arguments);
    }
});