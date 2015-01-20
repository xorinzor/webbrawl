me.AIEntity = me.PlayerEntity.extend({
   
   init: function (x, y, settings) {
        this._super(me.PlayerEntity, 'init', [x, y, settings]);
        
        this.name = "bot";
        this.time            = me.timer.getTime();
        this.attackCooldown  = 1000;
        this.moving          = false;

        this.body.collisionType = me.collision.types.NPC_OBJECT;
        this.body.setVelocity(0.35, 0.9);
        this.body.setMaxVelocity(3.5, 15.0);
        this.body.setFriction(0.05, 0.01);
        
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
   },
   
   update: function(dt) {
        //Make sure we're alive!
        if(this.alive === false) {
            return false;
        }
        
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
        
        
        //Parse all AIgoals for this entity
        this.AIHandler.getGoals().forEach(function(goal, index, array) {
            //Check each goal wether or not we need to execute it
            if(goal.shouldExecute()) {
               return goal.execute();
            }
        });
       
        // apply physics to the body (this moves the entity)
        this.body.update(dt);

        // handle collisions against other shapes
        me.collision.check(this);
        
        // return true if we moved or if the renderable was updated
        return (this._super(me.Entity, 'update', [dt]) || this.body.vel.x !== 0 || this.body.vel.y !== 0 || true);
   },
   
   onCollision: function(response, collidingObject) {
       return this._super(me.PlayerEntity, 'onCollision', [response, collidingObject]);
   } 
});