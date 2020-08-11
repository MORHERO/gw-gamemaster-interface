/*
** MODULES
*/




// module-clock

class MODULE_CLOCK {
	constructor(element) { 
		const that = this;

		this.element = element;

		this.realtime = {hour:"00", minute: "00"};
		this.intime = {hour:"00", minute: "00"};

		this.realtime_check_interval = window.setInterval(function() {
			that.update_realtime();
		},1000);

		this.setup_user_buttons(); // setup eventlisteners to user control buttons
	}

	// triggerd method every second to update realtime
	update_realtime() {
		let curr_date = new Date();
		let curr_time = {hour: this.leading_zero(curr_date.getHours()), minute: this.leading_zero(curr_date.getMinutes())};

		if(curr_time != this.realtime) {
			this.realtime = curr_time;

			this.update_clock_display("ot");
		}
		return;
	}

	update_intime(type, digit) {
		let intime = this.intime;

		// check if digit gets bigger or smaller
		if (type == "add") {

			// check what digit gets changed
			if (digit == "hour-double"){

				// check new digit
				if(intime.hour[0] == "2") {
					intime.hour = "0" + intime.hour[1];
				}else {
					intime.hour = ("" + (Number(intime.hour[0]) + 1)) + intime.hour[1];
				}

			}else if(digit == "hour-single") {

				if(intime.hour[1] == "9") {
					intime.hour = intime.hour[0] + "0";
				}else if (intime.hour[1] == "3" && intime.hour[0] == "2"){
					intime.hour = intime.hour[0] + "0";
				}else {
					intime.hour = ("" + intime.hour[0]) + (Number(intime.hour[1]) + 1);
				}

			}else if(digit == "minute-double") {

				if(intime.minute[0] == "5") {
					intime.minute = "0" + intime.minute[1];
				}else {
					intime.minute = ("" + (Number(intime.minute[0]) + 1)) + intime.minute[1];
				}

			}else if(digit == "minute-single") {

				if(intime.minute[1] == "9") {
					intime.minute = intime.minute[0] + "0";
				}else {
					intime.minute = ("" + intime.minute[0]) + (Number(intime.minute[1]) + 1);
				}

			}

		}else {
			if (digit == "hour-double"){

				if(intime.hour[0] == "0") {
					intime.hour = "2" + intime.hour[1];
				}else {
					intime.hour = ("" + (Number(intime.hour[0]) - 1)) + intime.hour[1];
				}
				

			}else if(digit == "hour-single") {

				if (intime.hour[1] == "0" && intime.hour[0] == "2") {
					intime.hour = intime.hour[0] + "3";
				}else if (intime.hour[1] == "0"){
					intime.hour = intime.hour[0] + "9";
				}else {
					intime.hour = ("" + intime.hour[0]) + (Number(intime.hour[1]) - 1);
				}

			}else if(digit == "minute-double") {

				if(intime.minute[0] == "0") {
					intime.minute = "5" + intime.minute[1];
				}else {
					intime.minute = ("" + (Number(intime.minute[0]) - 1)) + intime.minute[1];
				}

			}else if(digit == "minute-single") {

				if(intime.minute[1] == "0") {
					intime.minute = intime.minute[0] + "9";
				}else {
					intime.minute = ("" + intime.minute[0]) + (Number(intime.minute[1]) - 1);
				}

			}
		}

		this.intime = intime;
		this.update_clock_display("it");

		return;
	}

	update_clock_display(type) {
		let hour_elem = this.element.querySelector('.clock-display [type='+ type +'] [name=hour]');
		let minute_elem = this.element.querySelector('.clock-display [type='+ type +'] [name=minute]');

		if(type == "ot") {
			hour_elem.innerHTML = this.realtime.hour;
			minute_elem.innerHTML = this.realtime.minute;
		}else {
			hour_elem.innerHTML = this.intime.hour;
			minute_elem.innerHTML = this.intime.minute;
		}
		return;
	}

	switch_tab(new_active) {
		let new_active_target = new_active.getAttribute('target');
		let tabnav_buttons_old_active = this.element.querySelector('[task=tab-switch].active');

		let submodule_old_active = this.element.querySelector('[submodule].active');
		let submodule_new_active = this.element.querySelector('[submodule='+ new_active_target +']');
		

		tabnav_buttons_old_active.classList.remove('active');
		new_active.classList.add('active');

		submodule_old_active.classList.remove('active');
		submodule_new_active.classList.add('active');
	}

	setup_user_buttons() {
		const that = this;

		// get intime user control buttons
		let buttons_add = this.element.querySelectorAll('[task=control-add] button');
		let buttons_sub = this.element.querySelectorAll('[task=control-sub] button');

		// get tabbar nav buttons
		let tabnav_buttons = this.element.querySelectorAll('[task=tab-switch]');

		// Setup add button event listeners
		for (var i = 0; i < buttons_add.length; ++i) {
			buttons_add[i].addEventListener('click', function(e){
				that.update_intime('add', this.getAttribute('name'));
			});
		}
		// Setup subtract button event listeners
		for (var i = 0; i < buttons_sub.length; ++i) {
			buttons_sub[i].addEventListener('click', function(e){
				that.update_intime('sub', this.getAttribute('name'));
			})
		}

		// Setup tabbar nav eventlisteners
		for (var i = 0; i < tabnav_buttons.length; ++i) {
			tabnav_buttons[i].addEventListener('click', function(e){
				that.switch_tab(this);
			});
		}

		return;
	}

	leading_zero(i) {
		if (i < 10) {
			i = "0" + i;
		}
		return i;
	}

}



/*
** SETUP MODULES
*/

// module-clock
const module_clock_elements = document.querySelectorAll('[module=clock]');
var module_clock = {};

if(module_clock_elements.length == 1) {
	module_clock[0] = new MODULE_CLOCK(module_clock_elements[0]);
} else if (module_clock_elements.length > 1) {
	for (var i = 0; i < module_clock_elements.length; ++i) {
		module_clock[i] = new MODULE_CLOCK(module_clock_elements[i]);
	}
}