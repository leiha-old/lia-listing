/**
 * Abstract Class for the Actions Collection
 * @author leiha
 * @extends $lia.Listing.Commons
 *
 */
$lia.Listing.Actions = $lia.Class.create([$lia.Listing.Commons], {
    init : function(parent, config){
        /* at this moment [this] is the context of called object */
        this._parent._parent.init.apply(this, arguments);
        this.actions  = {};
    },

    /**  */
    addAction : function(name, config){


//        if($.isObject(name)){
//            this.actions[name] = name;
//        } else

        if(!$.isPlainObject(name)){
            this.actions[name] = this.getAction(name, config);
        } else {
            $.forEach(name, function(config, name){
                this.actions[name] = this.getAction(name, config);
            }, this)
        }
        return this;
    },

    getActionFactory : function(){
        return this._parent._factory.Action;
    },

    /**  */
    hasAction : function(actionName){
        return this.actions[actionName]
            ? this.actions[actionName]
            : null;
    },

    hasActions : function(){
        return $.keys(this.actions);
    },

    /**  */
    getAction : function(name, config){
        if($.isDefined(config)) {
            var className = name.capitalize();
            var factory   = this.getActionFactory();
            if(!factory[className]) {
                throw new Error('Listing Action ['+ name +'] not implemented !')
                //className = 'Generic';
            }
            return factory[className].new(this, name, config);
        }
        else if(this.actions[name]){
            return this.actions[name];
        } else {
            throw new Error('Listing Action ['+ name +'] not initialized !')
        }
    },

    /**  */
    refresh : function(){
        if(!$.size(this.actions))
            return;

        this.node.getContentNode().empty();
        $.forEach(this.actions, function(action, name){
            action.refresh();
        });
    },

    /**  */
    render : function(){
        if(!$.size(this.actions))
            return;

        this.node.getContentNode().empty();
        $.forEach(this.actions, function(action, name){
            this.node.getContentNode().append(action.render());
        }, this);

        return this.node.getNode();
    }
});