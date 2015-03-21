/**
 * Abstract Class for the Action(s)
 * @author leiha
 * @extends $lia.Listing.Commons
 *
 */
$lia.Listing.Actions.Action = $lia.Class.create([$lia.Listing.Commons], {
    init : function(parent, name, config){
        /* at this moment [this] is the context of called object */
        this._parent._parent.init.apply(this, [parent, config]);
        this.name      = name;
        this.component = null;
    },

    getLabel : function(){
        return this.config.label
            ? this.config.label
            : this.name
        ;
    },

    /**  */
    getNodeOfIcon : function(key){
        var img = key;
        if(this.config.images) {
            img = this.config.images[key];
        }

        var node = $(img);
        if(!node.length)
            node = this.theme.getIcon(img);

        return node;
    },

    onCloseByParent : function(){
        if(this.component)
            this.component.close();
    },

    onClose : function(){
        $.forEach(this.actions, function (action, name) {
            if(action.onCloseByParent)
                action.onCloseByParent();
        });
    },

    /**  */
    refresh : function(){
        this.node.getContentNode().empty();
        //this.component.html(this.buildContent());
        this.build();
    },

    /**  */
    render : function(){
        this.node.getContentNode().empty();
        this.node.getNode().off();

        this.build();
        return this.node.getNode();
    }
});