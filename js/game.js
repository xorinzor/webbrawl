function clone(obj) {
    if (null == obj || "object" != typeof obj) return obj;
    var copy = obj.constructor();
    for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
    }
    return copy;
}

me.sys.pauseOnBlur = false;

/* Game namespace */
var game = {

    // an object where to store game information
    data : {
        score : 0
    },

    //Object to contain all the screens
    Screen: {},

    // Run on page load.
    "onload" : function () {
        
        // Initialize the video.
        if (!me.video.init("screen",  me.video.CANVAS, 1024, 768, true, 0)) {
            alert("Your browser does not support HTML5 canvas.");
            return;
        }
    
        // add "#debug" to the URL to enable the debug Panel
        if (document.location.hash === "#debug") {
            window.onReady(function () {
                me.plugin.register.defer(this, me.debug.Panel, "debug", me.input.KEY.V);
            });
        }
    
        // Initialize the audio.
        me.audio.init("mp3,ogg");
        me.audio.setVolume(0); //In dev stage, mute audio
    
        // Set a callback to run when loading is complete.
        me.loader.onload = this.loaded.bind(this);
    
        me.loader.load({ name: "loadingscreen", type:"image", src:"data/img/bg/loadscreen.png" },
        function() {
            // Load the resources.
            me.loader.preload(game.resources.ui);
    
            // Initialize melonJS and display a loading screen.
            me.state.set(me.state.LOADING, new game.Screen.CustomLoadingScreen());
            me.state.change(me.state.LOADING);
        });
        
    },

    // Run on game resources loaded.
    "loaded" : function () {
        me.state.set(me.state.MENU, new game.Screen.MainMenu());
        me.state.set(me.state.PLAY, new game.Screen.PlayScreen());
        
        //me.audio.playTrack("mainmenu", 0.7);
        
        me.game.viewport.fadeIn("#000", 500, function(){
            me.state.change(me.state.MENU);  
        });
        
        me.pool.register("ProjectileEntity",    game.ProjectileEntity);
        me.pool.register("ExplosionEntity",     game.ExplosionEntity);
        me.pool.register("DeathEffectEntity",   game.DeathEffectEntity);
        
        me.pool.register("mainPlayer",          me.PlayerEntity);
        me.pool.register("aiPlayer",            me.AIEntity);
        
        me.input.bindKey(me.input.KEY.A,        "left");
        me.input.bindKey(me.input.KEY.D,        "right");
        me.input.bindKey(me.input.KEY.W,        "jump",     true);
        me.input.bindKey(me.input.KEY.SHIFT,    "attack",   true);
        
        /*
        me.state.change(me.state.PLAY);
        
        me.game.world.addChild(me.pool.pull("aiPlayer", 600, 250, {
            image: 'basic_player',
            name: "bot",
            width: 64,
            height: 64,
            spritewidth: 64,
            spriteheight: 64
        }));
        */
    }
};
