<?php
include "lib/fileAccess.php";
?>
<html>
<head>
	<title>Space Madness - Alpha 1.20</title>
	<link type="text/css" href="css/space-madness.css" rel="stylesheet" />
	<link type="text/css" href="css/ui-darkness/jquery-ui-1.8.13.custom.css" rel="stylesheet" />
	<script type="application/javascript" src="js/jquery-1.5.1.min.js"></script>
	<script type="application/javascript" src="js/jquery-ui-1.8.13.custom.min.js"></script>
	<script type="application/javascript" src="js/jquery.spritely-0.5.js"></script>
	<script type="application/javascript" >
		$(document).ready(function(){
			$('#space').pan({fps: 30, speed: 1, dir: 'down', depth: 10});
			$("button").button();
		});
	
		function moveRankingUp(){
			var topNow = $("#pija").css("top");
			topNow = topNow.substr(0,topNow.indexOf("px", 0));
			if( topNow > 5){
				$("#pija").css("top", topNow-2);
			}else{
				setInterval(moveRankingUp, 0);
			}
		}
		
		setInterval(moveRankingUp, 20);
		
	</script>
</head>


<body style="background-color: BLACK; text-align:center;font-family:arial;" >
	<div style="width: 1015px; height: 570;margin-left: auto; margin-right: auto;">
		
		<!-- left side panel -->
		<div class="panel-left">
			<button onclick="window.location = 'index.html'" style="width: 100%;">Inicio</button>
			<br/>
		</div>

		<!-- center side panel -->
		<div style="float: left; margin-left: auto; margin-right: auto; width: 708px; height: 570; position: relative; left: 0;">
			<div class="header-layer">Space Madness</div>
			
			<div id="space" class="stage"></div>
			
			<div class="ranking-list">
			<div id="pija" style="position: absolute; top: 500; width: 708px;">
			<?php
				$ranking = DataBase::getRanking();
				$position = 1;
				foreach ( $ranking as $row ){
					?>
					<div>
						<span style="width: 100px;"><?php echo $position ?></span>
						<span><?php echo $row['username'] ?></span>
						<span><?php echo $row['points'] ?></span>
					</div>
					<?php
					$position++;
				}
			?>
			</div>
			</div>
		</div>
		
		<!-- right side panel -->
		<div id="right-side-panel" style="float: left; width: 150px; height: 570;">

		</div>

	</div>
	<br/>

	<div style="width: 100%;color: white;">By Juan Manuel Agüero - 2011</div>
</body>
</html>
