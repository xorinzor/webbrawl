me.PlayerEntity = me.CustomEntity.extend({
    init: function(x, y, settings) {
        this._super(me.CustomEntity, 'init', [x, y, settings]);

        this.attacking = false;

        var initialShape;
        if (settings.initialShape && (typeof (settings.initialShape) === "function")) {
            initialShape = settings.initialShape();
        } else if (settings.getTMXShapes && (typeof (settings.getTMXShapes) === "function")) {
            initialShape = settings.getTMXShapes();
        } else {
            initialShape = me.TMXObject.__methods__.getTMXShapes.apply({
            width: settings.width, height: settings.height, rotation: 0});
        }
        
        this.body = new me.Body(this, initialShape);
        this.body.collisionType = me.collision.types.PLAYER_OBJECT;
        this.body.setCollisionMask(me.collision.types.ALL_OBJECT);
        this.body.setVelocity(0.35, 0.9);
        this.body.setMaxVelocity(3.5, 15.0);
        this.body.setFriction(0.05, 0.01);
        
        this.alwaysUpdate   = true;
        this.isPersistent   = true;
        this.time           = me.timer.getTime();
        this.attackCooldown = 1000;
        this.canAttack      = true;
        
        this.temp = {
            tick: 1,
            one: 0,
            two: 0
        };

        var animationtime = 70;
        
        this.renderable.addAnimation("stance", [0, 1, 2, 3], animationtime);
        this.renderable.addAnimation("run", [4, 5, 6, 7, 8, 9, 10, 11], animationtime);
        this.renderable.addAnimation("attack", [12, 13, 14, 15], animationtime);
        this.renderable.addAnimation("block", [16, 17], animationtime);
        this.renderable.addAnimation("die", [18, 19, 20, 21, 22, 23], animationtime);
        this.renderable.addAnimation("castspell", [24, 25, 26, 27], animationtime);
        this.renderable.addAnimation("shoot", [28, 29, 30, 31], animationtime);
        this.renderable.addAnimation("walk", [32, 33, 34, 35, 36, 37, 38, 39], animationtime);
        this.renderable.addAnimation("duck", [40, 41], animationtime);
        this.renderable.addAnimation("jump", [42, 43, 44, 45, 46, 47], animationtime);
        this.renderable.addAnimation("ascend", [48, 49, 50, 51, 52, 53, 54, 55], animationtime);
        this.renderable.addAnimation("descend", [56, 57, 58, 59, 60, 61, 62, 63], animationtime);
        this.renderable.addAnimation("stand", [64], animationtime);
        
        this.renderable.setCurrentAnimation("stand");
    },
    
    shoot: function() {
        this.time = me.timer.getTime();
        this.canAttack = false;
        
        var projectile = me.pool.pull("ProjectileEntity", (this.renderable.lastflipX === false) ? (this.pos.x + 60) : (this.pos.x - 60), this.pos.y + 20, { image: 'projectile_blue', velocity: { x: (this.renderable.lastflipX === false) ? 8 : -16, y: 0 }, owner: this });
        me.game.world.addChild(projectile, this.z);
    },
    
    die: function(death) {
        this.alive = false;
        this.renderable.setOpacity(0);
        
        var deatheffect = me.game.world.addChild(me.pool.pull("DeathEffectEntity", death.x, death.y, death.angle), 99999);
        
        me.game.viewport.shake(7, 200);
        
        setTimeout((function() {
            me.game.world.removeChild(deatheffect);
            this.pos.x = 796;
            this.pos.y = 301;
            this.alive = true;
            this.renderable.setOpacity(1);
            this.renderable.flicker(300);
        }).bind(this), 300);
    },
    
    jump: function() {
        // make sure we are not already jumping or falling
        if (!this.body.jumping && !this.body.falling) {
            // set current vel to the maximum defined value
            // gravity will then do the rest
            this.body.vel.y = -this.body.maxVel.y * me.timer.tick;
            // set the jumping flag
            this.body.jumping = true;
            
            this.renderable.setCurrentAnimation("jump");
        }
   },
    
    move: function(direction) {
       if(direction === "left") {
            // flip the sprite on horizontal axis
            this.renderable.flipX(true);
            // update the entity velocity
            this.body.vel.x -= this.body.accel.x * me.timer.tick;
            // change to the walking animation
            if (!this.renderable.isCurrentAnimation("run")) {
                this.renderable.setCurrentAnimation("run");
            }
       } else {
            // unflip the sprite
            this.renderable.flipX(false);
            // update the entity velocity
            this.body.vel.x += this.body.accel.x * me.timer.tick;
            // change to the walking animation
            if (!this.renderable.isCurrentAnimation("run")) {
                this.renderable.setCurrentAnimation("run");
            }
       }
       
       this.moving = true;
    },
    
    shoot: function() {
        if(!this.canAttack){
            return;
        }
        
        this.time = me.timer.getTime();
        this.canAttack = false;
        this.attacking = true;
        
        this.renderable.setCurrentAnimation("attack", (function() {
            this.renderable.setCurrentAnimation("stand");
            return true;
        }).bind(this));
        
        var projectile = me.pool.pull("ProjectileEntity", (this.renderable.lastflipX === false) ? (this.pos.x + 60) : (this.pos.x - 60), this.pos.y + 20, { image: 'projectile_blue', velocity: { x: (this.renderable.lastflipX === false) ? 8 : -16, y: 0 }, owner: this });
        me.game.world.addChild(projectile, this.z);
    },
   
    update: function(dt) {
        //Make sure we're alive!
        if(this.alive === false) {
            return false;
        }
        
        //Invoke super
        this._super(me.CustomEntity, 'update', [dt]);
        
        //Check if we can attack again
        if(this.canAttack === false) {
            if (me.timer.getTime() - this.time > this.attackCooldown) {
                this.canAttack = true;
            }
        }
        
        //Did we stop moving? if so, slow down
        if(!this.moving) {
            if(this.body.vel.x > 0) {
                this.body.vel.x -= this.body.accel.x * me.timer.tick;
            } else if(this.body.vel.x < 0) {
                this.body.vel.x += this.body.accel.x * me.timer.tick;
            } else {
                this.body.vel.x = 0;
            }
        }
        
        //Make sure our jump animation doesn't loop
        if (!this.body.jumping && !this.body.falling && this.renderable.isCurrentAnimation("jump")) {
            this.renderable.setCurrentAnimation("stand");
        }
        
        //Directional controls
        if (me.input.isKeyPressed('left')) {
            this.move("left");
        } else if (me.input.isKeyPressed('right')) {
            this.move("right");
        } else {
            if(this.body.vel.x > 0.5) {
                this.body.vel.x -= this.body.accel.x * me.timer.tick;
            } else if(this.body.vel.x < -0.5) {
                this.body.vel.x += this.body.accel.x * me.timer.tick;
            } else {
                this.body.vel.x = 0;
            }
            
            // change to the standing animation
            if (this.body.jumping === false && !this.renderable.isCurrentAnimation("attack")) {
                this.renderable.setCurrentAnimation("stand");
            }
        }
        
        //Jump
        if (me.input.isKeyPressed('jump')) {
            this.jump();
        }
        
        //Attack
        if(me.input.isKeyPressed("attack")) {
            this.shoot();
        }
        
        // apply physics to the body (this moves the entity)
        this.body.update(dt);

        // handle collisions against other shapes
        me.collision.check(this);
        
        // return true if we moved or if the renderable was updated
        return (this.body.vel.x !== 0 || this.body.vel.y !== 0 || true);
    },

    /**
     * colision handler
     * (called when colliding with other objects)
     */
    onCollision: function(response, collidingObject) {
        //Dont collide with other playerentities
        if(response.b.body.collisionType === me.collision.types.NPC_OBJECT || response.b.body.collisionType === me.collision.types.PLAYER_OBJECT || response.b.body.collisionType === me.collision.types.ENEMY_OBJECT) {
            return false;
        }
        
        // Make all other objects solid
        return true;
    }
});