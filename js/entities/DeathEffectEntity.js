game.DeathEffectEntity = me.Sprite.extend({
	init: function(x, y, angle) {
		// class constructor
		this._super(me.Sprite, 'init', [x, y, me.loader.getImage("death_effect")]);
		
		// the particle update even off screen
		this.alwaysUpdate = true;
		
		// create new vector and set initial particle velocity
		this.angle = Number.prototype.degToRad(angle);
		this.framewidth = 155;
		this.frameheight = 250;
		this.scale(3, 3);
	},
	
	update: function(dt) {
		return true;
	}
});