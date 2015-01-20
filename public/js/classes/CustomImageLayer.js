me.CustomImageLayer = me.ImageLayer.extend({
	init: function(x, y, name, width, height, image, z, ratio) {
		
		this._super(me.ImageLayer, "init", [name, width, height, image, z, ratio]);
		
		//added the this.pos.<x/y> to prevent "jumping" of the imagelayer when moving the viewport around
		this.pos.x = this.x = x;
		this.pos.y = this.y = y;
	},
	
	updateLayer : function (vpos) {
		this._super(me.ImageLayer, "updateLayer", [ vpos ]);
		
		//I couldn't get any modifications on the Y-axis to work so I left this static
		this.pos.y = vpos.y - this.y;
		
		if(this.repeatX) {
			this.pos.x += (((vpos.x - this.lastpos.x) - this.x) * this.ratio.x) % this.imagewidth;
	        this.pos.x = (this.imagewidth + this.pos.x) % this.imagewidth;
		} else {
			this.pos.x = vpos.x - this.x;	
		}
	}
}); 