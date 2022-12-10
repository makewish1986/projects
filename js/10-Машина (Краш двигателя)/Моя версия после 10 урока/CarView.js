function CarView() {
	this._carStartedListeners = [];
}

CarView.prototype = {
	// Добавление HTML для машины
	render: function(containerId) {
		var container = document.getElementById(containerId);
		container.innerHTML = `
		<div class="car">
	      <div class="info-panel">
	        <label>Status: </label><span data-role="status">off</span>
	      </div>
	      <div class="controls">
	        <input data-role="start-car" value="Start" type="button">
	        <input data-role="start-car" value="Start from Android" type="button">
	        <hr>
	        <label>GearBox: </label><span data-role="gear-box-value">N</span>
	      </div>
	    </div>			
		`;
		this._startButtons = document.getElementById(containerId).querySelectorAll("[data-role='start-car']");
		this._statusLabels = document.getElementById(containerId).querySelectorAll("[data-role='status']");
		this._gearBoxValueLabels = document.getElementById(containerId).querySelectorAll("[data-role='gear-box-value']");

		// Добавляем Listener к каждому элементу-кнопке
		var that = this;
		this._processEls(this._startButtons, function(startButton) {
			startButton.addEventListener('click', function(ev) {
				that._carStartListener(ev);
			});
		});
	},

	// Выводит статус label элементов
	drawStatus: function(status) {
		this._processEls(this._statusLabels, function(statusLabel) {
			statusLabel.innerHTML = status;
		})
	},

	// Блокировка кнопок
	disableButtons: function() {
		this._processEls(this._startButtons, function(startButton) {
			startButton.setAttribute('disabled', true);
		})
	},

	// Разблокировка кнопок
	enableButtons: function() {
		this._processEls(this._startButtons, function(startButton) {
			startButton.removeAttribute('disabled');
		})
	},

	// Установка значения корьки передач
	setGearBoxValue: function(GearBoxValue) {
		this._processEls(this._gearBoxValueLabels, function(gearBoxValueLabel) {
			gearBoxValueLabel.innerHTML = GearBoxValue;
		})
	},

	addEventListener: function(eventName,listener) {
		if (eventName == 'start') {
			this._carStartedListeners.push(listener);
		}
	},

	// На вход принимает массив элементов (кнопок, лейблов, и т.д.), а также Processor - то, что делаем с каждым элементом этого массива
	// Например, будем менять из вид, содержание.
	_processEls: function(arrayOfEls,processor) {
		for (var i = 0; i < arrayOfEls.length; i++) {
			var item = arrayOfEls[i];
			// processor.apply(this, [item]);// по-моему работает и без apply -> processor(item);
			processor(item)
		}
	},

	_carStartListener: function(ev) {
		for (var i = 0; i < this._carStartedListeners.length; i++) {
			var listener = this._carStartedListeners[i];
			listener();
		}
	}
}