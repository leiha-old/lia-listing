/**
 * @author leiha
 * @extends $lia.Ajax
 */
$lia.Listing.Bridge = $lia.Class.create([$lia.Ajax], {

    defaultUrl : '',

    init : function(root, config){
        /** @type {Listing} */
        this.root = root;
        this._parent.init.apply(this, [config]);
    },

    setDefaultUrl : function(url){
        this.defaultUrl = url;
        return this;
    },

    send : function(url){
        if(!$.isString(url)){
            url = this.defaultUrl;
        }

        var $this = this;
        this._parent.send.apply(this, [url]);
        $lia.Observer.subscribeAjax('Listing', this.root.name, function(data){
            if(data.todo){
                $.forEach(data.todo, function(data, name){
                    $this.executeTodo(name, data);
                });
            }
        });
    },

    executeTodo : function(name, data){
        switch(name){
            case 'listing-refresh' :
                this.listingRefresh(data);
                break
        }

    },

    listingRefresh : function(items){
        this.root.rows.setRows(items.items, items.total);
        this.root.refreshRows();
        this.root.menuActions.getAction('paginate').refresh();

    }

});