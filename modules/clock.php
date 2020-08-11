<!-- module-clock -->
<div module="clock" class="module col-1">
	<div class="inner">

		<div submodule="tabbar" class="tabbar">

			<div class="tabnav">
				<div class="inner flex">

					<div task="tab-switch" target="clock" class="nav-point active">
						<div>
							<span>Clock</span>
						</div>
					</div>
					
					<div task="tab-switch" target="stopwatch" class="nav-point">
						<div>
							<span>Stopwatch</span>
						</div>
					</div>

				</div>
			</div>

			<div class="elements">

				<!-- Clock -->
				<div submodule="clock" class="element active">
					
					<div class="clock-wrap">

						<div class="clock-display">
							<div class="flex">

								<div type="it">
									<p class="overline">Intime</p>

									<div task="control-add" class="clock-controls flex">
										<div class="flex">
											<button name="hour-double">+</button>
											<button name="hour-single">+</button>

											<button name="minute-double">+</button>
											<button name="minute-single">+</button>
										</div>
									</div>

									<div class="flex">
										<div class="hour">00</div>:
										<div class="minute">00</div>
									</div>

									<div task="control-sub" class="clock-controls flex">
										<div class="flex">
											<button name="hour-double">-</button>
											<button name="hour-single">-</button>

											<button name="minute-double">-</button>
											<button name="minute-single">-</button>
										</div>
									</div>
								</div>

								<div type="ot">
									<p class="overline">Realtime</p>
									<div class="flex">
										<div class="hour">00</div>:
										<div class="minute">00</div>
									</div>
								</div>

							</div>
						</div>

					</div>

				</div>

				<!-- Stopwatch -->
				<div submodule="stopwatch" class="element">
					
				</div>

			</div>
		</div>
		
	</div>
</div>