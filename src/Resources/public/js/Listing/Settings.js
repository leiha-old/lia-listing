/**
 * @author leiha
 *
 */
$lia.Listing.Settings = $lia.Class.create({
    init : function(parent, config){
        this.parent = parent;
        this.config = {
            'where'        : [],
            'orderBy'      : [],
            'columns'      : [],
            'limit'        : []
        }

        $.extend(this.config, config ? config : {}, this.getCookie());
        if(!this.config['columns']){
            this.config['columns'] = parent.columns.getColumnsKeys();
        }
    },

    setCookie : function(){
        $.cookie(this.parent.config.cookie, $.json(this.config));
    },

    getCookie : function(){
        return $.json($.cookie(this.parent.config.cookie));
    },

    setColumns : function(columns){
        this.config.columns = columns;
        this.setCookie();
        return this;
    },

    getColumns : function(){
        return this.config.columns;
    },

    getFilter : function(colName){
        var w = [];
        var where = this.config.where;
        for(var i in where){
            if(where[i][0] == colName)
                w.push(where[i]);
        }
        return w;
    },

    setFilter : function(colName, condition, value){
        if(!$.isArray(this.config.where))
            this.config.where = [];

        if(!this.existFilter(colName, condition, value))
            this.config.where.push([colName, condition, value]);

        this.setCookie();
        return this;
    },

    unsetFilter : function(colName, condition, value){
        var w = [];
        var where = this.config.where;
        for(var i in where){
            if(where[i][0] == colName
                && where[i][1] == condition
                && where[i][2] == value)
            {
                continue;
            }
            w.push(where[i]);
        }
        this.config.where = w;
        this.setCookie();
        return this;
    },

    existFilter : function(colName, condition, value){
        var where = this.config.where;
        for(var i in where){
            if(where[i][0] == colName
                && where[i][1] == condition
                && where[i][2] == value)
            {
                return true;
            }
        }
    },

    getPaginate : function(){
        return [
            parseInt(this.config.limit[0]),
            parseInt(this.config.limit[1])
        ];
    },

    setPaginate : function(start, length){
        if(null !== start)
            this.config.limit[0] = start;

        if(null !== length)
            this.config.limit[1] = length;

        this.setCookie();
        return this;
    },

    getSorting : function(colName){
        if(!this.config.orderBy)
            return;

        var sorting = this.config.orderBy;
        for (var i = 0, len = sorting.length; i < len; i++) {
            if(sorting[i][0] == colName)
                return sorting[i][1];
        }
    },

    setSorting : function(colName, sens){
        var add = true;
        var ordersNew = [];
        var sorting = this.config.orderBy;
        for(var order in sorting){
            if(sorting[order][0] != colName){
                ordersNew.push(sorting[order]);
            }
            else{
                add = false;
                if(sens && sorting[order][1] != sens)
                    ordersNew.push([sorting[order][0], sens]);
            }
        }

        if(add)
            ordersNew.push([colName, sens]);

        this.config.orderBy = ordersNew;
        this.setCookie();
        return this;
    }
});