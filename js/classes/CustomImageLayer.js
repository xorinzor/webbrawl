me.CustomImageLayer = me.ImageLayer.extend({
	init: function(x, y, name, width, height, image, z, ratio) {
		
		this._super(me.ImageLayer, "init", [name, width, height, image, z, ratio]);
		
		this.x = this.lastpos.x = this.pos.x = x;
		this.y = this.lastpos.y = this.pos.y = y;

		this.settings = {
			x: x,
			y: y
		};
	},
	
	updateLayer : function (vpos) {
		this.y = this.lastpos.y = this.pos.y = this.settings.y - vpos.y;
		this._super(me.ImageLayer, "updateLayer", [ vpos ]);
	},

	draw: function(renderer, rect) {
		var context = renderer.getContext();
		context.save(); 
		context.translate(this.x, this.y);
		
		this._super(me.ImageLayer, "draw", [renderer, rect]);
		
		context.restore();
	}
}); 