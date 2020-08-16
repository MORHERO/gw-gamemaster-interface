<!-- module-dice -->
<div module="dice" class="module col-1">
	<div class="inner">

		<div task="dice-select">
			<div class="flex">

<?php 
	$dice_list = [
		["d2", "2"],
		["d4", "4"],
		["d6", "6"],
		["d8", "8"],
		["d10", "10"],
		["d12", "12"],
		["d20", "20"],
		["d100", "100"]
	];

	foreach ($dice_list as $key => $val) {
		?>
<div class="dice <?php echo($val[0]); ?>" val="<?php echo($val[0]); ?>">
	<div class="wrap">
		<p><?php echo($val[1]); ?></p>
	</div>
	<div class="outline"></div>
</div>
		<?php
	}

?>

			</div>
		</div>

		<div class="flex">

			<div task="dice-options">
				<div class="flex">
				
					<div name="roll" class="button">
						<div class="inner">
							<p>Roll</p>
						</div>
					</div>

					<div name="reset" class="button">
						<div class="inner">
							<p>Reset</p>
						</div>
					</div>
				
				</div>
			</div>

			<div task="dice-preview">
				<div class="flex"></div>
				<div class="result-overlay deactivated">
					<div class="inner">
						<p class="headline">RESULT</p>
						<p name="dice-result">95</p>
					</div>
					<div class="flex">
						<div name="roll" class="button">
						<div class="inner">
							<p>Reroll</p>
						</div>
					</div>

					<div name="reset" class="button">
						<div class="inner">
							<p>Reset</p>
						</div>
					</div>

					<div name="close" class="button">
						<div class="inner">
							<p>Close</p>
						</div>
					</div>

					</div>
				</div>
			</div>
			
		</div>

		<div task="dice-history">
			<div class="history-list"></div>
		</div>

	</div>
</div>