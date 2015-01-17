me.CustomEntity = me.Entity.extend({
    init: function(x, y, settings) {
        this._super(me.Entity, 'init', [x, y, settings]);
    },
    
    update: function(dt) {
        this._super(me.Entity, 'update', [dt]);
    }
});