/**
 * @author leiha
 * @extends $lia.Listing.Commons
 */
$lia.Listing.Rows = $lia.Class.create([$lia.Listing.Commons], {
    init : function(parent){
        this.rows   = [];
        this.parent = parent;
        this.root   = parent.root;
        this.node   = this.root.node.tbody;
        this.totalLength = null;
    },

    getLength : function(){
        return this.rows.length;
    },

    getTotalLength : function(){
        return parseInt(this.totalLength);
    },

    setRows : function(items, totalOfRows){
        this.rows = [];
        if(null !== totalOfRows)
            this.totalLength = totalOfRows;

        var $this = this;
        $.forEach(items, function(item){
            $this.addRow(item);
        });
        return this;
    },

    addRow : function(item){
        this.rows.push(
            this.root._factory.Row.new(this)
                .setValues(item)
        );
        return this;
    },

    refresh : function(){
        this.node.empty();
        this.render();
    },

    render : function(){
        var tr;
        $.forEach(this.rows, function(row){
            tr = row.render();
            if (!tr.is(':empty')) {
                this.node.append(tr);
            }

        }, this);

        if(this.node.is(':empty')){
            this.node.append('<tr><td class="lia-listing-noData">'+ this.i18n('No Data to Display !') +'</td></tr>');
        }
    }
});