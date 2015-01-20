game.sprites = {
	button: {
		/*
		<spritename>: {
			image: <image_name_from_resources.js>,
			spritewidth: <the_width_of_a_frame_in_the_sprite>,
			spriteheight: <the_height_of_a_frame_in_the_sprite>,
			state: {
				<state_of_the_sprite>: {
					x: <the_x_offset_within_the_sprite_for_this_state>,
					x: <the_y_offset_within_the_sprite_for_this_state>,
				}
			}
		}
		*/
        
		red_button: {
			image: "ui_tileset", framewidth: 190, frameheight: 49,
			state: {
				normal: { x: 194,	y: 1283 },
				hover: 	{ x: 194,	y: 1283 },
				active: { x: 2,		y: 1330 }
			}
		}
	}

    /*
	dialog: {
		normal: {
			topleft: 		{ x: 0, 	y: 0, spritewidth: 64, spriteheight: 64 },
			bottomleft: 	{ x: 64, 	y: 0, spritewidth: 64, spriteheight: 64 },
			topright: 		{ x: 128, 	y: 0, spritewidth: 64, spriteheight: 64 },
			bottomright: 	{ x: 192, 	y: 0, spritewidth: 64, spriteheight: 64 },
			topcenter: 		{ x: 256, 	y: 0, spritewidth: 64, spriteheight: 64 },
			bottomcenter: 	{ x: 320, 	y: 0, spritewidth: 64, spriteheight: 64 },
			leftcenter: 	{ x: 384, 	y: 0, spritewidth: 64, spriteheight: 64 },
			rightcenter: 	{ x: 448, 	y: 0, spritewidth: 64, spriteheight: 64 },
		}
	}*/
};