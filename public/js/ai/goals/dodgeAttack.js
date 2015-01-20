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
                        
                        //Check distance of the projectile
                        if(Math.abs(this.entity.pos.x - collision[key].pos.x) < 150 && Math.abs(this.entity.pos.y - collision[key].pos.y) < this.entity.height/2) {
                            //Check if the projectile is left or right of the entity
                            if(this.entity.pos.x < collision[key].pos.x) { //right of the entity
                                //Check if the projectile is moving to the left
                                return (collision[key].body.vel.x < 0);
                            } else { //left of the entity
                                //Check if the projectile is moving to the right
                                return (collision[key].body.vel.x > 0);
                            }
                            
                            return false;
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