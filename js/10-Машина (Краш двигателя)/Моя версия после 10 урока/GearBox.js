function GearBox() {
	gearBoxThat = this;
	this.gearBoxValue = 1;
	// gearBoxInterval - здесь будет записан интервал для его последующего сброса
	this.gearBoxInterval = null;
}

GearBox.prototype = {
	// Вместе с функцией _incrementGearBoxValue увеличивает скорость каждую секунду
	gearBoxStarted: function() {
		gearBoxThat.gearBoxValue = 1;
		this._view.setGearBoxValue(gearBoxThat.gearBoxValue);
		gearBoxThat.gearBoxInterval = window.setInterval(gearBoxThat._incrementGearBoxValue.bind(this),1000);
	},

	_incrementGearBoxValue: function() {
			if (gearBoxThat.gearBoxValue < 5) {
				gearBoxThat.gearBoxValue++;
				this._view.setGearBoxValue(gearBoxThat.gearBoxValue);
			}
		}
}
