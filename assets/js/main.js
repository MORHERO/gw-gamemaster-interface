/*
** MODULES
*/




// module-clock

class MODULE_CLOCK {
	constructor(element) { 
		const that = this;

		this.element = element;
		this.submodules = this.element.querySelectorAll('[submodule]');

		this.realtime = {hour:'', minute: ''};
		this.intime = {hour:'', minute: ''};

		this.realtime_check_interval = window.setInterval(function() {
			that.update_realtime();
		},1000);
	}

	update_realtime() {
		let curr_date = new Date();
		let curr_time = {hour: this.leading_zero(curr_date.getHours()), minute: this.leading_zero(curr_date.getMinutes())};

		if(curr_time != this.realtime) {
			this.realtime = curr_time;
			let hour_elem = this.element.querySelector('.clock-display [type=ot] .hour');
			let minute_elem = this.element.querySelector('.clock-display [type=ot] .minute');

			hour_elem.innerHTML = curr_time.hour;
			minute_elem.innerHTML = curr_time.minute;

		}
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
console.log(module_clock_elements[0]);
console.log(module_clock[0].element);