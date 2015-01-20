 // a basic progress bar object
 var ProgressBar = me.Renderable.extend({
 	init: function(v, w, h) {
 		this._super(me.Renderable, "init", [v.x, v.y, w, h]);
 		
 		this.invalidate = false;
 		this.progress   = 0;
 		this.totalFiles = game.resources.ui.length;
 		
 		this.hints = [
 		 'Don\'t fall off the edge, you\'ll lose a life',
 		 'Some useful hint telling you all you need to know',
 		 'Lets create the game first, think of hints later'
 		 ];
 		 
 		 this.selectedHint = this.hints[Math.floor(Math.random() * this.hints.length)];
 	},

 	onProgressUpdate: function(progress) {
 	 this.progress++;
 	},

 	update: function() {
 		return true;
 	},
 	// draw function
 	draw: function(renderer) {
 	 context = renderer.getContext();
 		// draw the progress bar
 		context.font      = 'bold 30pt Nevis';
   context.textAlign = 'center';
   context.fillStyle = '#492811';
   context.fillText(this.progress + " / " + this.totalFiles, this.width / 2, 440);
   
 		context.font      = '14pt Nevis';
   context.textAlign = 'center';
   context.fillStyle = '#492811';
   context.fillText(this.selectedHint, this.width / 2, 600);
 	}
 });
 
 /** 
  * a default loading screen
  * @memberOf me
  * @ignore
  * @constructor
  */
 game.Screen.CustomLoadingScreen = me.ScreenObject.extend({
 	// call when the loader is resetted
 	onResetEvent: function() {
 		me.game.reset();
 		me.game.world.addChild(new me.ImageLayer("loadscreen", 1024, 768, "loadscreen", 1));
 		// progress bar
 		var progressBar = new ProgressBar(new me.Vector2d(), me.video.renderer.getWidth(), me.video.renderer.getHeight());
 		this.handle = me.event.subscribe(me.event.LOADER_PROGRESS, progressBar.onProgressUpdate.bind(progressBar));
 		me.game.world.addChild(progressBar, 2);
 	},
 	// destroy object at end of loading
 	onDestroyEvent: function() {
 		// cancel the callback
 		if (this.handle) {
 			me.event.unsubscribe(this.handle);
 			this.handle = null;
 		}
 	}
 });