game.Screen.PlayScreen = me.ScreenObject.extend({
    /** 
    *  action to perform on state change
    */
    onResetEvent: function() { 
        // load a level
        me.levelDirector.loadLevel("basic");
        
        // reset the score
        game.data.score = 0;
        
        // add our HUD to the game world
        this.HUD = new game.HUD.Container();
        me.game.world.addChild(this.HUD);
        
        me.game.viewport.fadeOut("#000", 300, function() {});
        
        me.game.world.addChild(me.pool.pull("AIPlayerEntity", 600, 250, {
            image: 'basic_player',
            name: "bot",
            width: 64,
            height: 64,
            spritewidth: 64,
            spriteheight: 64
        }));
        
        var player = me.pool.pull("PlayerEntity", 700, 250, {
            image: 'basic_player',
            name: "player",
            width: 64,
            height: 64,
            spritewidth: 64,
            spriteheight: 64
        });
        
        me.game.viewport.follow(player, me.game.viewport.AXIS.BOTH);
        me.game.world.addChild(player);
    },
    
    /** 
    *  action to perform when leaving this screen (state change)
    */
    onDestroyEvent: function() {
        // remove the HUD from the game world
        me.game.world.removeChild(this.HUD);
    }
});