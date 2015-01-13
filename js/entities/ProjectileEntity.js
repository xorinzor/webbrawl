game.ProjectileEntity = me.Entity.extend({
    init: function(x, y, settings) {
        settings = $.extend({
            spritewidth: 51,
            spriteheight: 15,
            gravity: 0,
            damage: 1,
            velocity: {
                x: 0,
                y: 0
            }
        }, settings);
        
        settings.width = settings.spritewidth;
        settings.height = settings.spriteheight;
        
        this._super(me.Entity, 'init', [x, y, settings]);
        
        this.alwaysUpdate   = true;
        this.isPersistent   = true;
        this.body.gravity = settings.gravity; // No shell drop
        this.body.setVelocity(settings.velocity.x, settings.velocity.y);
        this.body.collisionType = me.collision.types.PROJECTILE_OBJECT;
        this.body.addShape(new me.Rect(0, 0, settings.width, settings.height));
        this.alive = true;
        
        this.settings = settings;
    },

    update: function(dt) {
        if(this.pos.x < 0 || this.pos.x > me.game.currentLevel.width) {
            me.game.world.removeChild(this);
            return false;
        }
        
        if (this.body.accel.x > 0) {
            this.renderable.flipX(false);
            this.body.vel.x += this.body.accel.x * me.timer.tick;
        } else {
            this.renderable.flipX(true);
            this.body.vel.x -= this.body.accel.x * me.timer.tick;
        }

        this.body.update(dt);
        me.collision.check(this);
        
        if (this.body.vel.x !== 0 &&  this.body.vel.y !== 0) {
            return this._super(me.Entity, 'update', [dt]);
        }
        
        return false;
    },

    onCollision: function(response, collidingObject) {
        if(this.alive) {
            if (response.a.body.collisionType === me.collision.types.PLAYER_OBJECT || response.a.body.collisionType === me.collision.types.NPC_OBJECT || response.a.body.collisionType === me.collision.types.ENEMY_OBJECT) {
                if(collidingObject !== this.settings.owner) {
                    //collidingObject = whatever it hits
                    //response.b = projectile
                    //because of brawl we don't deal damage.
                    //add code to change damage into a push in the opposite direction
                    return true;
                }
                
                return false;
            } else {
                //Don't stop projectiles at the level boundaries
                if(collidingObject.name.match("^death*")) {
                    return false;
                }
                
                this.alive = false;
                me.game.world.addChild(me.pool.pull("ExplosionEntity", (this.body.accel.x > 0) ? this.pos.x - 20 : this.pos.x - 45, this.pos.y-90, { image: 'explosion', width: 128, height: 128 }));
                me.game.world.removeChild(this);
                
                return true;
            }
        }
        
        return false;
    }
});