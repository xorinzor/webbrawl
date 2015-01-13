game.AIGoalDodgeAttack = game.AIGoal.extend({
    init: function(entity) {
        this.entity = entity;
    },
    
    shouldExecute: function() {
        var collision = me.collision.quadTree.retrieve(this.entity);

        for(var key in collision) {
            if(collision[key].body !== undefined) {
                if(collision[key].body.collisionType === me.collision.types.PROJECTILE_OBJECT) {
                    if(collision[key].settings.owner !== this.entity) {
                        if(Math.abs(this.entity.pos.x - collision[key].pos.x) < 150 && Math.abs(this.entity.pos.y - collision[key].pos.y) < this.entity.height/2) {
                            return true;
                        }
                    }
                }
            }
        }
        
        return false;
    },
    
    execute: function() {
        this.entity.jump();
    }
})