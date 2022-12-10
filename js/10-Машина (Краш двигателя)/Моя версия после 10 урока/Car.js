function Car(containerId) {
	that = this;
	this._engine = new Engine();
	this._gearBox = new GearBox();
	
	// Рендерим HTML-контейнер, заодно находим в нем все buttons, labels
	this._view = new CarView();
	this._view.addEventListener('start', function() {
		that.start();
	});
	this._view.addEventListener('start', function() {
		console.log('One more Listener');
	});

	this._view.render(containerId);
}

Car.prototype = {
	// Интерфейс
	start: function() {
		var randomNumber = Math.random();
		if (randomNumber > 0.4) {
			this._carStarted();
		} else {
			this._carCannotBeStarted();
		}
	},

	// Приватные методы
	// -------------
	// Запуск машины
	_carStarted: function() {
		this._view.drawStatus('Car has started!');
		this._view.disableButtons();
		this._plannedCrashStarted();
		var gearBoxStartedBinded = this._gearBox.gearBoxStarted.bind(this);
		gearBoxStartedBinded();
	},

	// Сообщение, если завести машину не удалось
	_carCannotBeStarted: function() {
		this._view.drawStatus('Car can\'t be started! Try again!');
	},

	// Планируем краш через 3000 секунд
	_plannedCrashStarted: function() {
		var engineCrashedBinded = this._engine.engineCrashed.bind(this);
		window.setTimeout(engineCrashedBinded,2500);	
	}


	
}