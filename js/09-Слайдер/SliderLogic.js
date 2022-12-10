function SliderLogic() {
	// Объявляем способ получения данных с Data уровня (вручную или через Ajax)
	// Для смены способа получения данных комментируем/раскомментируем одну из двух строк ниже
	// 1 - Вручную
	// this._dataService = new SliderDataService();
	// 2 - через Ajax
	this._dataService = new SliderAjaxDataService();

	// Массив будущих изображений
	this._imagesUrls = [];
	// Хранит текущий индекс изображения
	this._currentImageIndex = 0;
}

// Позволяет стартовать инициаизацию Data уровня
SliderLogic.prototype.init = function(callback) {
	var that = this;
	this._dataService.getUrls(function(urlsArr) {
		// После того, как мы готовы (получили URL's с data уровня), мы заполняем массив изображений
		// и сообщаем об этом колбэком в уровень SliderView
		// Это уже получается второй подряд колбэк
		that._imagesUrls = urlsArr;
		callback();
	});
}

// Возвращает URL изображения с текущим индексом _currentImageIndex
SliderLogic.prototype.getCurrentImageUrl = function() {
	return this._imagesUrls[this._currentImageIndex];
}

// Проверяет, есть ли изображение, если листать назад, то есть находимся ли мы на левой границе
// true - если есть куда листать назад, false - если нет возможности листать назад
SliderLogic.prototype.canMovePrev = function() {
	return !(this._currentImageIndex === 0);
}

// Проверяет, есть ли изображение, если листать вперед, то есть находимся ли мы на правой границе
// true - если есть куда листать вперед, false - если нет возможности листать вперед
SliderLogic.prototype.canMoveNext = function() {
	return !(this._currentImageIndex === this._imagesUrls.length-1);
}

// Если есть куда листать назад, уменьшаем _currentImageIndex на -1
SliderLogic.prototype.activatePrevImage = function() {
	if (this.canMovePrev()) {
		this._currentImageIndex--;
	}
}

// Если есть куда листать вперед, увеличиваем _currentImageIndex на +1
SliderLogic.prototype.activateNextImage = function() {
	if (this.canMoveNext()) {
		this._currentImageIndex++;
	}
}



