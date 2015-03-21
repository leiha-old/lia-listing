/**
 * @author leiha
 * @extends $lia.Listing.Actions.Action
 *
 */
$lia.Listing.Actions.Action.Add = $lia.Class.create([$lia.Listing.Actions.Action], {
    init : function(parent, config){
        this.config = {
            'theme'   : 'LiaListingBundle'
        };

        this._parent.init.apply(this, arguments);
        this.node.getNode()
            .addClass('lia-listing-add')
        ;
    },

    buildContent : function(){

    },

    build : function(){
        var $this = this;
        var node  = $('<span>&nbsp;</span>').click(function(){

        });

        this.node.getNode().append(node);
    }
});