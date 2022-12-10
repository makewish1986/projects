function Engine() {
	console.log('Engine created');
}

Engine.prototype = {
	// Процедура краша двигателя
	engineCrashed: function() {
		this._view.drawStatus('Engine has crashed! Car has stopped!');
		this._view.enableButtons();
		this._view.setGearBoxValue('N');
		window.clearInterval(this._gearBox.gearBoxInterval);
	}
}


		