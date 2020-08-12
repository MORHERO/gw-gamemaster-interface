<!-- module-calendar -->
<div module="calendar" class="module col-1">
	<div class="inner">

		<div task="month-select" class="month-wrap">
			<div class="flex">

				<button name="month-prev"><-</button>
				<div name="month-title">
					<p>August</p>
				</div>
				<button name="month-next">-></button>

			</div>
		</div>

		<div task="day-select" class="day-wrap">
			<div class="flex">
				
				<?php 
					for ($i=0; $i < 30; $i++) { 
						echo('<div class="day"><span>'.($i+1).'</span></div>');
					}
				?>

			</div>
		</div>

	</div>
</div>