game.AIGoalAttackEnemy = game.AIGoal.extend({
    init: function(entity) {
        this.entity = entity;
        this.target = null;
        this.maxDistance = 500;
    },
    
    shouldExecute: function() {
        //Check if we already have a target
        if(typeof(this.target) !== "undefined" && this.target !== null) {
            //Check if our target is within range
            var distance = this.entity.distanceTo(this.target);
            if(distance <= this.maxDistance) {
                return true;
            }  
        }
        
        //Get nearby entities
        var nearbyEntities = game.EntityHelper.getNearbyEntities(this.entity, (me.collision.types.PLAYER_OBJECT | me.collision.types.NPC_OBJECT), this.maxDistance);
        
        //Check if there are any nearby entities
        if(nearbyEntities.length > 0) {
            //Set the nearest entity as the target
            this.target = nearbyEntities[0];
            return true;
        }
        
        //No nearby targets
        this.target = null;
        return false;
    },
    
    execute: function() {
        if(this.target.pos.x > this.entity.pos.x) {
            this.entity.move('right');
        } else if(this.target.pos.x < this.entity.pos.x) {
            this.entity.move('left');
        }
    }
})