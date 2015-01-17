<!DOCTYPE HTML>
<html>
	<head>
		<META NAME="ROBOTS" CONTENT="NOINDEX, NOFOLLOW">
		<meta id="viewport" name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
		<meta name="apple-mobile-web-app-capable" content="yes">
		<meta name="mobile-web-app-capable" content="yes">
		<meta name="apple-mobile-web-app-status-bar-style" content="black">
		
		<title>WebBrawl</title>
		
		<link rel="stylesheet" type="text/css" media="screen" href="css/style.css">
        <link rel="apple-touch-icon" href="icons/touch-icon-iphone-60x60.png">
        <link rel="apple-touch-icon" sizes="76x76" href="icons/touch-icon-ipad-76x76.png">
        <link rel="apple-touch-icon" sizes="120x120" href="icons/touch-icon-iphone-retina-120x120.png">
        <link rel="apple-touch-icon" sizes="152x152" href="icons/touch-icon-ipad-retina-152x152.png">
	</head>
	<body>
		<div id="hidden"></div>

		<div id="container">
			<div id="game">
				<div id="screen"></div>
			</div>
		</div>


		<!-- melonJS Library -->
		<!-- build:js js/app.min.js -->
		<script type="text/javascript" src="lib/jquery-1.11.1.min.js"></script>
		<script type="text/javascript" src="lib/melonJS-2.1.0.js"></script>

		<!-- Plugin(s) -->
		<script type="text/javascript" src="lib/plugins/debug/debugPanel.js"></script>
		
		<!-- Game Scripts -->
		<script type="text/javascript" src="js/game.js"></script>
		<script type="text/javascript" src="js/resources.js"></script>
		<script type="text/javascript" src="js/sprites.js"></script>
		
		<script type="text/javascript" src="js/classes/CustomImageLayer.js"></script>
		<script type="text/javascript" src="js/classes/CustomEntity.js"></script>
		<script type="text/javascript" src="js/classes/menu.js"></script>
		<script type="text/javascript" src="js/classes/EntityHelper.js"></script>
		<script type="text/javascript" src="js/classes/CollisionSolid.js"></script>

		<script type="text/javascript" src="js/entities/PlayerEntity.js"></script>
		<script type="text/javascript" src="js/entities/AIEntity.js"></script>
		<script type="text/javascript" src="js/entities/HUD.js"></script>
		<script type="text/javascript" src="js/entities/ProjectileEntity.js"></script>
		<script type="text/javascript" src="js/entities/DeathEffectEntity.js"></script>
		<script type="text/javascript" src="js/entities/ExplosionEntity.js"></script>

		<script type="text/javascript" src="js/screens/CustomLoadingScreen.js"></script>
		<script type="text/javascript" src="js/screens/PlayScreen.js"></script>
		<script type="text/javascript" src="js/screens/MainMenu.js"></script>
		
		<script type="text/javascript" src="js/ai/AIGoal.js"></script>
		<script type="text/javascript" src="js/ai/AIHandler.js"></script>
		
		<script type="text/javascript" src="js/ai/goals/dodgeAttack.js"></script>
		<script type="text/javascript" src="js/ai/goals/attackEnemy.js"></script>
		
		<!-- /build -->
		<!-- Bootstrap & Mobile optimization tricks -->
		<script type="text/javascript">
			$(window).bind("load", function() {
				game.onload();

				// Mobile browser hacks
				if (me.device.isMobile && !navigator.isCocoonJS) {
					// Prevent the webview from moving on a swipe
					window.document.addEventListener("touchmove", function (e) {
						e.preventDefault();
						window.scroll(0, 0);
						return false;
					}, false);

					// Scroll away mobile GUI
					(function () {
						window.scrollTo(0, 1);
						me.video.onresize(null);
					}).defer();

					me.event.subscribe(me.event.WINDOW_ONRESIZE, function (e) {
						window.scrollTo(0, 1);
					});
				}
			});
		</script>
	</body>
</html>
