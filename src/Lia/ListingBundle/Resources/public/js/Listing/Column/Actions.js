/**
 * @author leiha
 * @extends $lia.Listing.Actions
 *
 */
$lia.Listing.Column.Actions = $lia.Class.create([$lia.Listing.Actions], {
    settingUp : function(){
        this.config = {};
    },

    init : function(parent, config){
        this._parents('init', arguments);
        this.node.getNode()
            .addClass('lia-listing-actions')
        ;
    },

    getColumn : function(){
        return this.parent;
    },

    getActionFactory : function(){
        return this.parent._factory.Action;
    },

    /**  */
    render : function(){
        if(!$.size(this.actions))
            return;

        this.getColumn().node.getNode().css('cursor', 'context-menu');

        var elements = [];
        $.forEach(this.actions, function(action){
            elements.push({
                content : action.getLabel().capitalize(),
                items   : [
                    {render : action}
                ]
            })
        }, this);

        var menu = new $lia.ContextMenu(this.getColumn().node.getNode(), {
            title : this.i18n('Actions')
        });
        menu.menuByRightClick(elements);
    }
});