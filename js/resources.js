game.resources = {};

game.resources.ui = [

    {name: "ui_tileset",         		type: "image",  		src: "data/img/tileset/ui_tileset.png"},

	{ name: "loadscreen",			type: "image",          src: "data/img/bg/loadscreen.png" },
	{ name: "mainmenu",				type: "image",          src: "data/img/bg/mainmenu.png" },
	
	//Level background
	{ name: "BG",					type: "image",          src: "data/img/bg/BG.png" },
	
	//Map tiles
	{ name: "basic_level_tiles", 	type: "image", 			src: "data/img/map/basic_level_tiles.png" },
	{ name: "object_tiles", 		type: "image", 			src: "data/img/map/object_tiles.png" },
	{ name: "ocean", 				type: "image", 			src: "data/img/ocean.png" },
	
	//Player
	{ name: "basic_player", 		type: "image", 			src: "data/img/sprite/basic_player.png" },

	//Projectiles
	{ name: "projectile_blue",		type: "image",          src: "data/img/projectile/projectile_blue.png" },
	
	//Particles
	{ name: "death_effect", 		type: "image", 			src: "data/img/particle/death_effect.png" },
	
	
	{ name: "explosion", 			type: "image", 			src: "data/img/sprite/explosion.png" },

	/* Maps.
	 * @example
	 * {name: "example01", type: "tmx", src: "data/map/example01.tmx"},
	 * {name: "example01", type: "tmx", src: "data/map/example01.json"},
	  */
	{ name: "basic", type: "tmx", src: "data/map/basic.tmx" },

	/* Background music.
	 * @example
	 * {name: "example_bgm", type: "audio", src: "data/bgm/"},
	 */
	//Dont load yet, takes too long.
	//{ name: "mainmenu", 	type: "audio", src: "data/bgm/" },
	/*
	{ name: "background1", 	type: "audio", src: "data/bgm/" },
	{ name: "background2", 	type: "audio", src: "data/bgm/" },
	{ name: "background3", 	type: "audio", src: "data/bgm/" },
	{ name: "background4", 	type: "audio", src: "data/bgm/" },
	
	/* Sound effects.
	 * @example
	 * {name: "example_sfx", type: "audio", src: "data/sfx/"}
	 */
	{ name: "explosion_sfx", type: "audio", src: "data/sfx/"}
];
