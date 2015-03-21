/**
 * @author leiha
 * @extends $lia.Actions
 *
 */
$lia.Listing.Actions.Generic = $lia.Class.create([$lia.Listing.Actions], {
    init : function(parent, config){
        this._parent.init.apply(this, arguments);
        this.node.getNode()
            .addClass('lia-listing-actions')
        ;
    }
});