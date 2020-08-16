<!DOCTYPE html>
<html>
<head>
	<title>GAMEMASTER - INTERFACE</title>
	<meta charset="utf-8">
	<?php
		include 'templates/styles.php';
	?>
</head>
<body>
	<?php
		include 'templates/header.php';
		include 'templates/navigation.php';
	?>

	<main>
		<div class="inner">
			<div class="main-flex">
				<?php
					//include 'modules/clock.php';
					//include 'modules/calendar.php';
					include 'modules/dice.php'
				?>
			</div>
		</div>
	</main>
	
	<?php
		include 'templates/footer.php';
		include 'templates/scripts.php';
	?>
</body>
</html>