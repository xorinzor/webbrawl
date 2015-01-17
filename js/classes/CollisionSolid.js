game.CollisionSolid = me.Entity.extend({
   init: function(x, y, settings) {
       this._super(me.Entity, 'init', [x, y, settings]);
       this.body.collisionType = me.collision.types.WORLD_SHAPE;
   },
   
   onCollision: function(a, b){
       return this._super(me.Entity, 'onCollision', [a, b]);
   }
    
});

game.CollisionDeath = me.Entity.extend({
   init: function(x, y, settings) {
       this._super(me.Entity, 'init', [x, y, settings]);
       this.angle = settings.angle;
       this.body.collisionType = me.collision.types.WORLD_SHAPE;
   },
   
   onCollision: function(a, b){
       //return this._super(me.Entity, 'onCollision', [a, b]);
       if(b instanceof me.PlayerEntity) {
           b.die({ 
               x: b.pos.x, 
               y: b.pos.y,
               angle: this.angle
           });
       }
       
       return false;
   }
    
});