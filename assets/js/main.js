/*
** MODULES
*/

// module-calendar
class MODULE_CALENDAR {
	constructor(element) {
		const that = this;

		this.element = element;

		this.active_month_id = 0;
		this.month_title_list = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December', 'Transition period']
		
		this.selected_days = [[],[],[],[],[],[],[],[],[],[],[],[],[]];
		this.marked_days = [[],[],[],[],[],[],[],[],[],[],[],[],[]];


		this.setup_user_buttons();
		
	}

	update_day(target) {
		if(!target.classList.contains('selected') && !target.classList.contains('marked')) {
			target.classList.add('selected');

			this.selected_days[this.active_month_id].push(Number(target.getAttribute('value')));

		}else if (target.classList.contains('selected')) {
			target.classList.remove('selected');
			target.classList.add('marked');

			let i = this.selected_days[this.active_month_id].indexOf(Number(target.getAttribute('value')));
			if(i > -1) {
				this.selected_days[this.active_month_id].splice(i, 1);
			}

			this.marked_days[this.active_month_id].push(Number(target.getAttribute('value')));

		}else if (target.classList.contains('marked')) {
			target.classList.remove('marked');

			let i = this.marked_days[this.active_month_id].indexOf(Number(target.getAttribute('value')));
			if(i > -1) {
				this.marked_days[this.active_month_id].splice(i, 1);
			}
		}
		return;
	}

	load_days() {

		var days = this.element.querySelectorAll('.day');

		for (let i = 0; i < days.length; ++i) {
			let index_day_selected = this.selected_days[this.active_month_id].indexOf(i);
			let index_day_marked = this.marked_days[this.active_month_id].indexOf(i);

			if(days[i].classList.contains('selected') && !index_day_selected > -1) {
				days[i].classList.remove('selected');
			}else if(!days[i].classList.contains('selected') && index_day_selected > -1) {
				days[i].classList.add('selected');
			}else if(days[i].classList.contains('marked') && !index_day_marked > -1) {
				days[i].classList.remove('marked');
			}else if(!days[i].classList.contains('marked') && index_day_marked > -1) {
				days[i].classList.add('marked');
			}
			
		}

		return;
	}

	update_month(type) {

		if(type == 'next') {
			if(this.active_month_id < 12) {
				this.active_month_id = this.active_month_id + 1;
			}else {
				this.active_month_id = 0;
			}
		}else {
			if(this.active_month_id > 0) {
				this.active_month_id = this.active_month_id - 1;
			}else {
				this.active_month_id = 12;
			}
		}

		this.element.querySelector('[name=month-title] p').innerHTML = this.month_title_list[this.active_month_id];

		let month_elem = this.element.querySelector('[task=day-select]');

		if(this.active_month_id == 12 && !month_elem.classList.contains('special-month')) {
			month_elem.classList.add('special-month');
		}else if(this.active_month_id != 12 && month_elem.classList.contains('special-month')){
			month_elem.classList.remove('special-month');
		}

		this.load_days();

		return;
	}

	setup_user_buttons() {
		var that = this;
		// month selection
		this.element.querySelector('[name=month-prev]').addEventListener('click', function(e) {
			that.update_month('prev');
			return;
		});
		this.element.querySelector('[name=month-next]').addEventListener('click', function(e) {
			that.update_month('next');
			return;
		});


		// day selection
		this.element.querySelector('[task=day-select] .flex').addEventListener('click', function(e) {
			if(e.target.classList.contains('day')) {
				that.update_day(e.target);
			}
			return;
		});
		return;
	}

}

// module-clock
class MODULE_CLOCK {
	constructor(element) { 
		const that = this;

		this.element = element;

		this.realtime = {hour:"00", minute: "00"};
		this.intime = {hour:"00", minute: "00"};

		this.stopwatch_interval = '';
		this.stopwatch_time = {hour:0, minute:0, second:0, milisecond:0};
		this.stopwatch_controls = {start:this.element.querySelector('[name=stopwatch-start]'), stop: this.element.querySelector('[name=stopwatch-stop]'), reset: this.element.querySelector('[name=stopwatch-reset]')}

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

	control_stopwatch(type) {
		const that = this;

		let control = this.element.querySelector('.stopwatch-control');

		if(type == 'start') {
			control.classList.remove('paused');

			this.stopwatch_interval = window.setInterval(function() {
					that.update_stopwatch();
				},10);
		}else if (type == 'stop') {
			control.classList.add('paused');

			clearInterval(this.stopwatch_interval);
		}else {
			if(!control.classList.contains('paused')){
				control.classList.add('paused');
			}
			clearInterval(this.stopwatch_interval);

			this.stopwatch_time = {hour:0, minute:0, second:0, milisecond:0};
			this.update_stopwatch('reset');
		}
	}

	update_stopwatch(task="play") {
		let time = this.stopwatch_time;

		if(time.milisecond == 99) {
			time.milisecond = 0;

			if(time.second == 59) {
				time.second = 0;

				if(time.minute == 59) {
					time.minute = 0;

					if(time.hour == 10) {
						clearInterval(this.stopwatch_interval)
					}else {
						time.hour++;
					}
				
				}else {
					time.minute++;
				}

			}else {
				time.second++;
			}
		}else {
			time.milisecond++;
		}

		if(task == 'reset') {
			time.milisecond--;
		}

		let milisecond_elem = this.element.querySelector('[submodule=stopwatch] [name=milisecond]');
		let second_elem = this.element.querySelector('[submodule=stopwatch] [name=second]');
		let minute_elem = this.element.querySelector('[submodule=stopwatch] [name=minute]');
		let hour_count_elem = this.element.querySelectorAll('[submodule=stopwatch] [name="hour"]');
		let hour_count_active_elem = this.element.querySelectorAll('[submodule=stopwatch] [name="hour"].active');

		milisecond_elem.innerHTML = this.leading_zero(time.milisecond);
		second_elem.innerHTML = this.leading_zero(time.second);
		minute_elem.innerHTML = this.leading_zero(time.minute);

		if(time.hour > 0) {
			hour_count_elem[time.hour + 1].classList.add('active');
		}else {
			if(hour_count_active_elem) {
				for (let i = 0; i < hour_count_active_elem.length; ++i) {
					hour_count_active_elem[i].classList.remove('active');
				}
			}
		}
		this.stopwatch_time = time;
	}

	update_clock_display(type) {
		let hour_elem = this.element.querySelector('[submodule=clock] .clock-display [type='+ type +'] [name=hour]');
		let minute_elem = this.element.querySelector('[submodule=clock] .clock-display [type='+ type +'] [name=minute]');

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

		// stopwatch control buttons
		let button_start = this.element.querySelector('[name=stopwatch-start]');
		let button_stop = this.element.querySelectorAll('[name=stopwatch-stop]');
		let button_reset = this.element.querySelectorAll('[name=stopwatch-reset]');


		// Setup add button event listeners
		for (let i = 0; i < buttons_add.length; ++i) {
			buttons_add[i].addEventListener('click', function(e){
				that.update_intime('add', this.getAttribute('name'));
			});
		}
		// Setup subtract button event listeners
		for (let i = 0; i < buttons_sub.length; ++i) {
			buttons_sub[i].addEventListener('click', function(e){
				that.update_intime('sub', this.getAttribute('name'));
			})
		}

		// Setup tabbar nav eventlisteners
		for (let i = 0; i < tabnav_buttons.length; ++i) {
			tabnav_buttons[i].addEventListener('click', function(e){
				that.switch_tab(this);
			});
		}

		// Setup stopwatch control buttons
		this.stopwatch_controls.start.addEventListener('click', function(e){
			that.control_stopwatch('start');
		});
		this.stopwatch_controls.stop.addEventListener('click', function(e){
			that.control_stopwatch('stop');
		});
		this.stopwatch_controls.reset.addEventListener('click', function(e){
			that.control_stopwatch('reset');
		});

		return;
	}

	leading_zero(i) {
		if (i < 10) {
			i = "0" + i;
		}
		return i;
	}

}

// module-dice
class MODULE_DICE {
	constructor (element) {
		const that = this;

		this.element = element;
		this.preview_elem = this.element.querySelector('[task=dice-preview] .flex');
		this.preview_overlay = this.element.querySelector('.result-overlay');
		this.preview_result = this.element.querySelector('[name=dice-result]');

		this.selected_dices = [];

		this.history_elem = this.element.querySelector('[task=dice-history] .history-list');
		this.history = [];

		this.dice = {
				'd2': {'min': 1, 'max': 2},
				'd4': {'min': 1, 'max': 4},
				'd6': {'min': 1, 'max': 6},
				'd8': {'min': 1, 'max': 8},
				'd10': {'min': 1, 'max': 10},
				'd12': {'min': 1, 'max': 12},
				'd20': {'min': 1, 'max': 20},
				'd100': {'min': 0, 'max': 9}
			}


		this.setup_user_buttons();
	}

	add_dice(dice_type) {
		let dice_clone = dice_type.cloneNode(true);

		dice_clone.classList.remove('dice');
		dice_clone.classList.add('dice-preview');

		this.preview_elem.append(dice_clone);

		return;
	}

	remove_dice(dice_type='full') {
		if(dice_type == 'full') {
			this.preview_elem.innerHTML = '';
			this.toggle_overlay('close');
		}else {
			dice_type.remove();
		}
		return;
	}

	roll_dice() {
		const that = this;

		let dice_list = this.preview_elem.querySelectorAll('.dice-preview');
		let dice_result = 0;
		let history_text = "";

		for (let i = 0; i < dice_list.length; ++i) {
			let dice_id = dice_list[i].getAttribute('val');

			let dice_result_single = that.get_dice_result(dice_id)

			dice_result = dice_result + dice_result_single;

			dice_list[i].querySelector('p').innerHTML = dice_result_single;

			if(i + 1 < dice_list.length) {
				history_text = history_text + dice_id + "(" + dice_result_single + ")" + " + ";
			} else {
				history_text = history_text + dice_id + "(" + dice_result_single + ")";
			}
			
		}
		history_text = history_text + " = " + dice_result;
		this.preview_result.innerHTML = dice_result;
		
		this.add_dice_history(history_text);

		this.toggle_overlay('open');
		return;
	}

	get_dice_result(dice_id) {
		let result = 0;
		let d = this.dice[dice_id];

		if(dice_id == "d100") {
			result = Number(Math.floor((Math.random() * d.max) + d.min) + "0");
		}else {
			result = Math.floor((Math.random() * d.max) + d.min); 
		}

		return result;
	}

	toggle_overlay(type) {
		if(type == 'open' && this.preview_overlay.classList.contains('deactivated')) {
			this.preview_overlay.classList.remove('deactivated');
		}
		if(type == 'close' && !this.preview_overlay.classList.contains('deactivated')) {
			this.preview_overlay.classList.add('deactivated');
		}
		
		return;
	}

	add_dice_history(new_entry) {
		this.history.push(new_entry);

		let entry_elem = document.createElement('p');
		entry_elem.innerHTML = new_entry;

		this.history_elem.prepend(entry_elem);

		if(this.history.length == 50) {
			this.history.shift();
			this.history_elem.removeChild(this.history_elem.lastChild);
		} 

		return;
	}

	setup_user_buttons() {
		const that = this;

		// get dice select parent
		let dice_select_parent = this.element.querySelector('[task=dice-select]');

		// get dice options&overlay buttons
		let dice_options_roll = this.element.querySelectorAll('[name=roll]');
		let dice_options_reset = this.element.querySelectorAll('[name=reset]');
		let dice_overlay_close = this.element.querySelector('[name=close]');

		// setup eventlisteners
		dice_select_parent.addEventListener('click', function(e) {
			if(e.target.classList.contains('dice')) {
				if(e.target.classList.contains('d0')) {
					that.remove_dice();
				}else {
					that.add_dice(e.target);
				}
			}
		});

		this.preview_elem.addEventListener('click', function(e) {
			if(e.target.classList.contains('dice-preview')) {
				that.remove_dice(e.target);
			}
		});

		// set overlay eventlisteners 
		for (let i = 0; i < dice_options_roll.length; ++i) {
			dice_options_roll[i].addEventListener('click', function() {
				that.roll_dice();
			});
		}
		for (let i = 0; i < dice_options_reset.length; ++i) {
			dice_options_reset[i].addEventListener('click', function() {
				that.remove_dice('full');
			});
		}
		dice_overlay_close.addEventListener('click', function() {
			that.toggle_overlay('close');
		});

		return;
	}

}


/*
** SETUP MODULES
*/
// module-calendar
const module_calendar_elements = document.querySelectorAll('[module=calendar]');
var module_calendar = {};

if(module_calendar_elements.length == 1) {
	module_calendar[0] = new MODULE_CALENDAR(module_calendar_elements[0]);
} else if (module_calendar_elements.length > 1) {
	for (let i = 0; i < module_calendar_elements.length; ++i) {
		module_calendar[i] = new MODULE_CALENDAR(module_calendar_elements[i]);
	}
}

// module-clock
const module_clock_elements = document.querySelectorAll('[module=clock]');
var module_clock = {};

if(module_clock_elements.length == 1) {
	module_clock[0] = new MODULE_CLOCK(module_clock_elements[0]);
} else if (module_clock_elements.length > 1) {
	for (let i = 0; i < module_clock_elements.length; ++i) {
		module_clock[i] = new MODULE_CLOCK(module_clock_elements[i]);
	}
}

// module-dice

const module_dice_elements = document.querySelectorAll('[module=dice');
var module_dice = {};

if(module_dice_elements.length == 1) {
	module_dice[0] = new MODULE_DICE(module_dice_elements[0]);
} else if (module_dice_elements.length > 1) {
	for (let i = 0; i < module_dice_elements.length; ++i) {
		module_dice[i] = new MODULE_DICE(module_dice_elements[i]);
	}
}


