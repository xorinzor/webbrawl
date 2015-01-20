game.Screen.MainMenu = me.ScreenObject.extend({
	onResetEvent : function () {
		// Add the root menu to the game entity manager

		me.game.viewport.fadeOut("#000", 500, function() {});
	
		// Create menus
		this.rootMenu 	= new game.Menu({ backgroundimage:"mainmenu" });
		var OptionsMenu = new game.Menu({ backgroundimage:"mainmenu" });
	
		/**
		 * Main menu
	   	 */
		this.rootMenu.addMenuButton({
			spritename : "red_button",
			text : 'Play',
			x : (me.game.viewport.width / 2) - 95,
			y : 360,
			z: 999,
			callback : function() {
				this.disabled = true;
				
				me.game.viewport.fadeIn("#000", 300, function() {
					me.state.change(me.state.PLAY);
				});
			}
		});
			
		this.rootMenu.addMenuButton({
			spritename : "red_button",
			text : 'Options',
			x : (me.game.viewport.width / 2) - 95,
			y : 420,
			z: 999,
			subMenu: OptionsMenu
		});
			
		this.rootMenu.addMenuButton({
			spritename : "red_button",
			text : 'Help',
			x : (me.game.viewport.width / 2) - 95,
			y : 480,
			z: 999,
			callback : function() {
				console.log("button clicked");
			}
		});
			
		this.rootMenu.addMenuButton({
			spritename : "red_button",
			text : 'Quit',
			x : (me.game.viewport.width / 2) - 95,
			y : 540,
			z: 999,
			callback : function() {
				console.log("button clicked");
			}
		});
			
			
		/**
		 * Options menu
	   	 */
	   	OptionsMenu.addMenuButton({
			spritename : "red_button",
			text : 'Apply',
			x : (me.game.viewport.width / 2) - 95,
			y : 480,
			z: 999,
			callback : function() {
				console.log("button clicked");
			}
		});
		
		OptionsMenu.addMenuButton({
			spritename : "red_button",
			text : 'Cancel',
			x : (me.game.viewport.width / 2) - 95,
			y : 540,
			z: 999,
			callback : OptionsMenu.goBack.bind(OptionsMenu)
		});
		    
		    /*
		    me.game.world.addChild.defer(me.game.world, new game.Dialog({
				text: 'Not functional yet'
			}));
		    */
		    
		me.game.world.addChild.defer(me.game.world, this.rootMenu);
	}
});