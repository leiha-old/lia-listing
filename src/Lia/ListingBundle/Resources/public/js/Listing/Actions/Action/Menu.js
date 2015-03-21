/**
 * @author leiha
 * @extends $lia.Listing.Actions.Action
 * @extends $lia.Listing.Actions
 *
 */
$lia.Listing.Actions.Action.Menu = $lia.Class.create([$lia.Listing.Actions.Action, $lia.Listing.Actions], {
    init : function(parent, config){
        /* at this moment [this] is the context of called object */
        this._parent._parent.init.apply(this, arguments);
        this.actions  = {};

        this.node.getNode()
            .addClass('lia-listing-menu')
        ;
        this.config = {
            'theme'   : 'LiaListingBundle',
            'actions' : {
                'hideable'   : 'hide'
                //'resizable'  : 'resize',
                //'exportable' : 'export',
                //'refreshable': 'refresh'
            }
        };

        $.forEach(this.config.actions, function(action, test){
            if (this.config.actions.hideable) {
                this.addAction(action, this.config.actions[test]);
            }
        },this);
    },

    buildContent : function(){
        var li = null;
        var ul = $('<ul></ul>');
        $.forEach(this.actions, function(action, name){
            li = $('<li></li>')
                .html(action.render())
                .appendTo(ul)
            ;
        });
        return ul;
    },

    build : function(){
        var $this = this;
        var node  = $('<span>Menu</span>').click(function(){
            if(!$this.component){
                $this.component = $this.getComponent('slide');
            }

            if(!$this.component.isOpen()){
                $this.component.html($this.buildContent());
            }

            $this.component.toggle($this.node.getNode(), {
                'onClose' : function(){$this.onClose();}
            });
        });

        this.node.getNode().append(node);
    }
});