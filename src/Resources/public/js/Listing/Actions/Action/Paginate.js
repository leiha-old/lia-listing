/**
 * @author leiha
 * @extends $lia.Listing.Actions.Action
 */
$lia.Listing.Actions.Action.Paginate = $lia.Class.create([$lia.Listing.Actions.Action], {
    init : function(parent, name, config){
        this.config = {
            'intervals' : [10, 25, 50, 100, 500],
            'images'    : {
                'left'  : 'paging-left',
                'right' : 'paging-right'
            }
        }
        this._parent.init.apply(this, arguments);
    },

    /**  */
    getSettings : function(){
        return this.root.settings.getPaginate();
    },

    /**  */
    send : function(){
        this.root.bridge.send();
    },

    /**  */
    calculate : function(){
        var settings = this.getSettings();

        this.totalItems      = this.root.rows.getTotalLength();
        this.currentInterval = settings[1];
        this.currentMin      = settings[0];
        this.currentMax      = this.currentMin + this.root.rows.getLength();

        this.currentPage     = Math.ceil(this.currentMax / this.currentInterval);
        this.totalPages      = Math.ceil(this.totalItems / this.currentInterval);
        if(this.currentMax > this.totalItems){
            this.currentMax = this.totalItems;
        }
    },

    /**  */
    onBack : function(){
        var settings = this.getSettings();
        if(settings[0] == 0)
            return;

        var start = this.currentMin - this.currentInterval;
        if(start < 0)
            start = 0;

        this.root.settings.setPaginate(start, this.currentInterval);
        this.send();
    },

    /**  */
    onForward : function(){
        if(this.totalItems == this.currentMax) return;
        this.root.settings.setPaginate(
            this.currentMax,
            this.currentInterval
        );
        this.send();
    },

    /**  */
    onChangeInterval : function(){
        this.root.settings.setPaginate(null, this.intervalSelect.getValue());
        this.send();
    },

    /**  */
    buildInterval : function(){
        var $this = this;
        this.intervalSelect = new $lia.Form.Field.Select();
        this.intervalSelect
            .setOptions(this.config.intervals)
            .addValue(this.currentInterval)
            .getNode()
            .change(function(){
                $this.onChangeInterval();
            })
        ;

        return $('<div></div>')
            .addClass('lia-listing-paginate-interval')
            //.append('<span>'+ this.i18n('Interval') +'</span>')
            .append(this.intervalSelect.render())
        ;
    },

    /**  */
    buildPages : function(){
        var $this = this;
        this.pageSelect = new $lia.Form.Field.Select();
        this.pageSelect
            .setType('interval', {'end': this.totalPages})
            .addValue(this.currentPage)
            .getNode()
            .change(function(){
                var pages    = $this.pageSelect.getValue();
                var interval = $this.intervalSelect.getValue();
                $this.root.settings.setPaginate(pages * interval - interval, interval);
                $this.send();
            })
        ;

        return $('<div></div>')
            .addClass('lia-listing-paginate-pages')
            .append('<span>'+ this.i18n('Page') +'</span>')
            .append(this.pageSelect.render())
            .append(' / '+ this.totalPages);
    },

    /**  */
    buildItems : function(){
        return $('<div>'
            + '<span>'+ this.i18n('Items')  +'</span>'
            + (this.totalItems && this.currentMax ? this.currentMin + 1 : 0)
            + ' - '
            + this.currentMax
            + ' / '
            + this.totalItems
            + '</div>'
        ).addClass('lia-listing-paginate-items');
    },

    /**  */
    build : function(){
        var $this = this;
        this.calculate();
        this.node.getNode()
            .empty()
            .addClass('lia-listing-paginate')
            .append(this.getNodeOfIcon('left').click(function(){
                $this.onBack();
            }))
            .append(
                $('<div></div>')
                    .addClass('lia-listing-paginate-content')
                    .append(this.buildPages())
                    .append(this.buildItems())
                    .append(this.buildInterval())
            )
            .append(this.getNodeOfIcon('right').click(function(){
                $this.onForward();
            }))
        ;
    }
});