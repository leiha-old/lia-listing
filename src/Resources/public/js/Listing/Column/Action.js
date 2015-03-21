/**
 * Abstract Class for the Action(s)
 * @author leiha
 * @extends $lia.Listing.Actions.Action
 */
$lia.Listing.Column.Action = $lia.Class.create([$lia.Listing.Actions.Action], {
    init : function(parent, name, config){
        /* at this moment [this] is the context of called object */
        this._parent._parent._parent.init.apply(this, [parent, config]);
        this.name      = name;
        this.component = null;
    },

    getColumn : function(){
        return this.parent.parent;
    }
});