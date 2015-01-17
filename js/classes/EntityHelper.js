game.EntityHelper = (function () {
    var api = {};

    api.getEntities = function(type) {
        var entities    = new Array();
        var obj         = {};
        var objLength   = me.game.world.children.length;
        
        for (var i = 0; i < objLength; i++) {
            obj = me.game.world.children[i];

            if(typeof(obj.body) !== "undefined" && typeof(obj.body.collisionType) !== "undefined") {
                //Filter the entities
                if(obj.body.collisionType & type) {
                    entities.push(obj);
                }
            }
        }

        return entities;
    };

    api.getNearbyEntities = function(entity, type, maxDistance) {
        var entities = this.getEntities(type);
        var result = new Array();
        var obj = {};
        var distance = 0;
        
        $.each(entities, function(k, obj) {
            distance    = entity.distanceTo(obj);
            
            if(obj === entity) {
                //We don't want ourself in this list
            } else {
                if(distance <= maxDistance) {
                    obj.distance = distance;
                    result.push(obj);
                }
            }
        });

        result.sort(this.compareByDistance);
        
        return result;
    };

    this.compareByDistance = function(a,b) {
        if (a.distance < b.distance)
            return -1;
        if (a.distance > b.distance)
            return 1;

        return 0;
    };
    
    return api;
})();