/**
 * @author leiha
 * @extends $lia.Listing.Actions.Action
 *
 */
$lia.Listing.Actions.Action.Generic = $lia.Class.create([$lia.Listing.Actions.Action], {
    init : function(parent, name, config){
        this.config = {
            'theme' : parent.root.config.theme,
            'node'  : null
        }
        this._parents('init', arguments);
    }
});