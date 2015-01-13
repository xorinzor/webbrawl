{"filter":false,"title":"MenuScreen.js","tooltip":"/js/screens/MenuScreen.js","undoManager":{"mark":2,"position":2,"stack":[[{"group":"doc","deltas":[{"start":{"row":0,"column":0},"end":{"row":259,"column":3},"action":"insert","lines":["game.MenuButton = me.GUI_Object.extend({","\tinit: function(settings) {","\t\tsettings = $.extend({}, game.sprites.button[settings.spritename], settings);","","\t\tthis._super(me.GUI_Object, \"init\", [settings.x, settings.y, settings]);","\t\tthis.parentMenu = settings.parentMenu;","\t\tthis.subMenu = settings.subMenu;","\t\tthis.callback = settings.callback;","\t\tthis.name = settings.spritename;","\t\tthis.z = settings.z;","\t\tthis.offset.x = settings.state.normal.x || 0;","\t\tthis.offset.y = settings.state.normal.y || 0;","\t\tthis.hover = false;","\t\tthis.isClicked = false;","\t\tthis.isSelected = false; //Wheter or not to keep the button active, in a \"selected\" state","\t\tthis.updateWhenPaused = settings.updateWhenPaused || false;","\t\tthis.settings = settings;","","\t\tif(typeof settings.canBeSelected !== \"boolean\") {","\t\t\tthis.canBeSelected = false;","\t\t} else {","\t\t\tthis.setSelected(settings.isSelected);","\t\t}","","\t\tif(typeof settings.isDisabled !== \"boolean\") {","\t\t\tthis.isDisabled = false;","\t\t} else {","\t\t\tthis.setDisabled(settings.isDisabled);","\t\t}","","\t\tthis.disableEvents();","\t},","","\t/**","     * mousemove function","     */","    onHover: function (event) {","    \t//Make sure we can actually hover over the object and our mouse is within the rectangle of the object's x/y coords","        this.hover = this.inViewport && this.getBounds().containsPoint(event.gameX, event.gameY);","","        if(this.isClicked === false && this.isSelected === false && this.isDisabled === false && ((me.state.isPaused() === true && this.updateWhenPaused === true) || me.state.isPaused() === false)) {","        \tthis.updated = true;","","        \tif(this.hover === true && typeof(this.settings.state.hover) !== \"undefined\") {","        \t\tthis.offset.x = this.settings.state.hover.x || this.settings.state.normal.x || 0;","\t\t\t\tthis.offset.y = this.settings.state.hover.y || this.settings.state.normal.y || 0;","\t\t\t} else {","\t\t\t\tthis.offset.x = this.settings.state.normal.x || 0;","\t\t\t\tthis.offset.y = this.settings.state.normal.y || 0;","\t\t\t}","        }","    },","","\tonClick: function(e) {","\t\t// Only do stuff when our container is in the world.","\t\tif (!this.parentMenu.ancestor || this.isDisabled === true || (me.state.isPaused() === true && this.updateWhenPaused === false)) {","\t\t\treturn;","\t\t}","","\t\tthis.isClicked = true;","\t\tthis.updated = true;","","\t\tme.audio.play(\"button\");","","\t\tif(this.canBeSelected === true) {","\t\t\tthis.setSelected((this.isSelected === true) ? false : true);","\t\t}","","\t\tif(typeof(this.settings.state.active) !== \"undefined\" || this.isSelected === true) {","\t\t\tthis.offset.x = this.settings.state.active.x || this.settings.state.normal.x || 0;","\t\t\tthis.offset.y = this.settings.state.active.y || this.settings.state.normal.y || 0;","\t\t} else {","\t\t\tthis.offset.x = this.settings.state.normal.x || 0;","\t\t\tthis.offset.y = this.settings.state.normal.y || 0;","\t\t}","\t},","","\tonRelease: function(e) {","\t\t// Only do stuff when our container is in the world.","\t\tif (!this.parentMenu.ancestor || this.isDisabled === true || (me.state.isPaused() === true && this.updateWhenPaused === false)) {","\t\t\treturn;","\t\t}","","\t\tthis.isClicked = false;","\t\tthis.updated = true;","","\t\tif(typeof(this.settings.state.hover) !== \"undefined\" && this.isSelected !== true) {","\t\t\tthis.offset.x = this.settings.state.hover.x || this.settings.state.normal.x || 0;","\t\t\tthis.offset.y = this.settings.state.hover.y || this.settings.state.normal.y || 0;","\t\t} else {","\t\t\tthis.offset.x = this.settings.state.normal.x || 0;","\t\t\tthis.offset.y = this.settings.state.normal.y || 0;","\t\t}","","\t\t//In case a submenu is activated, run this","\t\tif (this.subMenu) {","\t\t\t// Remove my parent menu","\t\t\tif (this.parentMenu) {","\t\t\t\tme.game.world.removeChild(this.parentMenu, true);","\t\t\t}"," ","\t\t\t// Add the new submenu","\t\t\tthis.subMenu.parentMenu = this.parentMenu;","\t\t\tme.game.world.addChild.defer(me.game.world, this.subMenu);","\t\t}"," ","\t\t//In case a callback is set, run this","\t\tif (this.callback) {","\t\t\tthis.callback(this);","\t\t}\t","\t},","","\tsetSelected: function(state) {","\t\tif(this.canBeSelected === true) {","\t\t\tif(typeof state === \"boolean\") {","\t\t\t\tthis.isSelected = state;","\t\t\t\tif(state === true) {","\t\t\t\t\tthis.offset.x = this.settings.state.active.x || this.settings.state.normal.x || 0;","\t\t\t\t\tthis.offset.y = this.settings.state.active.y || this.settings.state.normal.y || 0;","\t\t\t\t} else {","\t\t\t\t\tthis.offset.x = this.settings.state.normal.x || 0;","\t\t\t\t\tthis.offset.y = this.settings.state.normal.y || 0;","\t\t\t\t}","\t\t\t} else {","\t\t\t\tconsole.error(\"Invalid variable-type passed for 'type'\");","\t\t\t}","","\t\t\tthis.updated = true;","\t\t}","\t},","","\tsetDisabled: function(state) {","\t\tif(typeof state === \"boolean\") {","\t\t\tthis.isDisabled = state;","\t\t\tif(state === true) {","\t\t\t\tthis.offset.x = this.settings.state.inactive.x || this.settings.state.normal.x || 0;","\t\t\t\tthis.offset.y = this.settings.state.inactive.y || this.settings.state.normal.y || 0;","\t\t\t} else {","\t\t\t\tthis.offset.x = this.settings.state.normal.x || 0;","\t\t\t\tthis.offset.y = this.settings.state.normal.y || 0;","\t\t\t}","\t\t} else {","\t\t\tconsole.error(\"Invalid variable-type passed for 'type'\");","\t\t\tthis.isDisabled = false;","\t\t}","","\t\tthis.updated = true;","\t},","","\tenableEvents: function() {","\t\tme.input.registerPointerEvent(\"pointermove\", me.game.world, this.onHover.bind(this));","\t\tme.input.registerPointerEvent(\"pointerdown\", this, this.clicked.bind(this));","        me.input.registerPointerEvent(\"pointerup\", this, this.release.bind(this));","\t},","","\tdisableEvents: function () {","\t\tme.input.releasePointerEvent(\"pointerup\", this);","\t\tme.input.releasePointerEvent(\"pointerdown\", this);","\t\tme.input.releasePointerEvent(\"pointermove\", this);","\t}","});","","","game.MenuItem = me.GUI_Object.extend({","\tinit : function (settings) {","\t\t// super constructor","\t\tthis._super(me.GUI_Object, \"init\", [settings.x, settings.y, settings]);","","\t\t//this.pos = new me.Vector2d(settings.x, settings.y);","\t\t//this.image = me.loader.getImage(settings.image);","\t\tthis.parentMenu = settings.parentMenu;","\t\tthis.subMenu = settings.subMenu;","\t\tthis.callback = settings.callback;","\t\tthis.z = settings.z;"," ","\t\tthis.name = \"MenuItem\";","","\t\t//game.MenuItem objects are pure for the looks, they have no events","\t\tthis.disableEvents();","\t},"," ","\tonClick : function (e) {","\t\t// Only do stuff when our container is in the world.","\t\tif (!this.parentMenu.ancestor) {","\t\t\treturn;","\t\t}"," ","\t\t//In case a submenu is activated, run this","\t\tif (this.subMenu) {","","\t\t\t// Remove my parent menu","\t\t\tif (this.parentMenu) {","\t\t\t\tme.game.world.removeChild(this.parentMenu, true);","\t\t\t}"," ","\t\t\t// Add the new submenu","\t\t\tthis.subMenu.parentMenu = this.parentMenu;","\t\t\tme.game.world.addChild.defer(me.game.world, this.subMenu);","\t\t}"," ","\t\t//In case a callback is set, run this","\t\tif (this.callback) {","\t\t\tthis.callback(this);","\t\t}","\t},","","\tdisableEvents: function () {","\t\tthis._super(me.GUI_Object, \"onDestroyEvent\");","\t}","});"," ","game.Menu = me.Container.extend({","\tinit : function (settings) {","\t\tthis._super(me.Container, \"init\", [ 500, 0, me.game.viewport.getWidth(), me.game.viewport.getHeight() ]);","","\t\tthis.parentMenu = null;","\t\tthis.name = \"Menu\";","","\t\tthis.addChild.defer(me.game.world, new me.ImageLayer(\"mainmenubackground\", me.game.viewport.getWidth(), me.game.viewport.getHeight(), settings.backgroundimage, 2));","\t},"," ","\taddMenuItem : function (settings) {","\t\tsettings.parentMenu = this;","\t\tvar menuItem = new game.MenuItem(settings);","\t\tthis.addChild.defer(this, new game.MenuItem(settings));","","\t\treturn menuItem;","\t},","","\taddMenuButton : function (settings) {","\t\tsettings.parentMenu = this;","\t\tvar menuButton = new game.MenuButton(settings);","\t\tthis.addChild.defer(this, new game.MenuButton(settings));","","\t\treturn menuButton;","\t},"," ","\tgoBack : function () {","\t\tif (this.parentMenu) {","\t\t\tme.game.world.removeChild(this, true);","\t\t\tme.game.world.addChild.defer(me.game.world, this.parentMenu);","\t\t}","\t},","","\tonActivateEvent : function() {","        for(var i = 0; i<this.children.length; i++) {","            if(typeof this.children[i].enableEvents === \"function\") {","                this.children[i].enableEvents();","            }","        }","\t},","","\tonDeactivateEvent : function() {","\t\tfor(var i = 0; i<this.children.length; i++) {","\t\t\tif(typeof this.children[i].disableEvents === \"function\") {","\t\t\t\tthis.children[i].disableEvents();","\t\t\t}","\t\t}","\t}","});"]}]}],[{"group":"doc","deltas":[{"start":{"row":62,"column":0},"end":{"row":63,"column":0},"action":"remove","lines":["\t\tme.audio.play(\"button\");",""]}]}],[{"group":"doc","deltas":[{"start":{"row":61,"column":0},"end":{"row":62,"column":0},"action":"remove","lines":["",""]}]}]]},"ace":{"folds":[],"scrolltop":2460,"scrollleft":0,"selection":{"start":{"row":171,"column":22},"end":{"row":171,"column":22},"isBackwards":false},"options":{"guessTabSize":true,"useWrapMode":false,"wrapToView":true},"firstLineState":{"row":174,"state":"start","mode":"ace/mode/javascript"}},"timestamp":1420995201356,"hash":"30c10efd34f52c8aa0a87244d9d34403e0cf5434"}