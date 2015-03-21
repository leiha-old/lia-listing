/**
 * @author leiha
 * @extends $lia.Listing.Column.Action
 *
 */
$lia.Listing.Column.Action.Sort = $lia.Class.create([$lia.Listing.Column.Action], {
    settingUp : function(){
        this.config = {
            'images' : {
                'asc' : {
                    'on' : 'sorting-asc-on',
                    'off': 'sorting-asc-off'
                },
                'desc': {
                    'on' : 'sorting-desc-on',
                    'off': 'sorting-desc-off'
                }
            }
        };
    },

    init : function(parent, name, config){
        this._parents('init', arguments);
    },

    /**  */
    onClick : function(icon, sens, state){
        var sSens  = null;
        var iState = state == 'off' ? 'on' : 'off';
        this.node[sens] = this.getNodeOfIcon(sens, iState)
            .replaceAll($(icon))
        ;

        var iSens = sens == 'asc' ? 'desc' : 'asc';
        if('on' == iState){
            sSens = sens;
            this.node[iSens] = this.getNodeOfIcon(iSens, state)
                .replaceAll(this.node[iSens])
            ;
        } else{
            var tSens = this.node[iSens].attr('data-state');
            if('on' == tSens)
                sSens = iSens;
        }

        this.root.settings.setSorting(this.getColumn().getName(), sSens);
        this.root.bridge.send();
    },


    /**  */
    getNodeOfIcon : function(sens, state){
        var img  = this.config.images[sens][state];
        var node = $(img);
        if(!node.length)
            node = this.theme.getIcon(img);

        var $this = this;
        return node
            .attr('data-state', state)
            .click(function(e){
                $this.onClick(this, sens, state);
            })
            ;
    },

    /**  */
    build : function(){
        var node = this.node.getNode()
            .addClass('lia-listing-sorting')
            .empty();

        var curSens = this.root.settings.getSorting(this.getColumn().getName());
        $.forEach(['asc', 'desc'], function(sens){
            this.node[sens] = this.getNodeOfIcon(sens, curSens == sens ? 'on' : 'off')
                .appendTo(node)
            ;
        }, this);
    }
});