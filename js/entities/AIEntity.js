me.AIEntity = me.PlayerEntity.extend({
   
   init: function (x, y, settings) {
       this._super(me.PlayerEntity, 'init', [x, y, settings]);
       
       this.name = "bot";
       
       /* AI start */
       this.AIHandler = new game.AIHandler();
       this.AIHandler.init();
       
       dodgeAttack = new game.AIGoalDodgeAttack();
       dodgeAttack.init(this);
       
       attackEnemy = new game.AIGoalAttackEnemy();
       attackEnemy.init(this);
       
       this.AIHandler.addGoal(dodgeAttack);
       this.AIHandler.addGoal(attackEnemy);
       /* AI End */
       
       this.time            = me.timer.getTime();
       this.attackCooldown  = 1000;
       this.moving          = false;
       
        var initialShape;
        if (settings.initialShape && (typeof (settings.initialShape) === "function")) {
            initialShape = settings.initialShape();
        } else if (settings.getTMXShapes && (typeof (settings.getTMXShapes) === "function")) {
            initialShape = settings.getTMXShapes();
        } else {
            initialShape = me.TMXObject.__methods__.getTMXShapes.apply({
            width: settings.width, height: settings.height, rotation: 0});
            //ninja-edit: controversial? PS: rotation can be something besides 0, but I simplified that here
        }
        
        this.body = new me.Body(this, initialShape);
        this.body.collisionType = me.collision.types.NPC_OBJECT;
        
        this.body.setVelocity(3, 15);
   },
   
   update: function(dt) {
       if(this.canAttack === false) {
            if (me.timer.getTime() - this.time > this.attackCooldown) {
                this.canAttack = true;
            }
        }
        
       if(this.body.vel.y == 0) {
            this.body.jumping = false;
            if(this.renderable.isCurrentAnimation("jump")) {
                this.renderable.setCurrentAnimation("stand");
            }
        }
        
       //We cannot control a dead entity.
       if(this.alive) {
           //Parse all AIgoals for this entity
           this.AIHandler.getGoals().forEach(function(goal, index, array) {
               //Check each goal wether or not we need to execute it
               if(goal.shouldExecute()) {
                   return goal.execute();
               }
           });
       }
       
       if(!this.moving) {
           this.body.vel.x = 0;
       }
       
        // apply physics to the body (this moves the entity)
        this.body.update(dt);

        // handle collisions against other shapes
        me.collision.check(this);
        
        // return true if we moved or if the renderable was updated
        return (this._super(me.Entity, 'update', [dt]) || this.body.vel.x !== 0 || this.body.vel.y !== 0);
   },
   
   onCollision: function(response, collidingObject) {
       return this._super(me.PlayerEntity, 'onCollision', [response, collidingObject]);
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
   
   shoot: function() {
        if(!this.canAttack){
            return;
        }
        
        this.time = me.timer.getTime();
        this.canAttack = false;
        
        var projectile = me.pool.pull("ProjectileEntity", (this.renderable.lastflipX === false) ? (this.pos.x + 60) : (this.pos.x - 60), this.pos.y + 20, { image: 'projectile_blue', velocity: { x: (this.renderable.lastflipX === false) ? 8 : -16, y: 0 }, owner: this });
        me.game.world.addChild(projectile, this.z);
   }
    
});