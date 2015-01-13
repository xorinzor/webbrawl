game.ExplosionEntity = me.Entity.extend({
    init: function(x, y, settings) {
        this._super(me.Entity, 'init', [x, y, settings]);

        this.body.setVelocity(0, 0);
        this.alwaysUpdate   = true;
        this.isPersistent   = true;

        this.renderable.addAnimation("explode", [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63], 1);
        this.renderable.setCurrentAnimation("explode", (function() {
            me.game.world.removeChild(this);
            return false;
        }).bind(this));
        
        me.audio.play("explosion_sfx");
    },
    
    update: function(dt) {
        return this._super(me.Entity, 'update', [dt]);
    },

    /**
     * colision handler
     * (called when colliding with other objects)
     */
    onCollision: function(response, collidingObject) {
        return false;
    }
});