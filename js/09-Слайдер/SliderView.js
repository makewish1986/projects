function SliderView() {
	this.showPrevBtn = null;
	this.showNextBtn = null;
	this.slideImage = null;
	this._logic = new SliderLogic();
}

SliderView.prototype.start = function(elId) {
	var that = this;
	// Находим элемент <div> с нужным Id и внутрь вставляем HTML-разметку под слайдер
	var el = document.querySelector(`#${elId}`);
	el.innerHTML = `
	  <div class="manreart-slider">
        <button class="show-prev-btn"> PREV </button>
        <img src="" class="slide-img">
        <button class="show-next-btn"> NEXT </button>
      </div>
	`;

	// Находим HTML-элементы (кнопки "PREV" и "NEXT", а также IMG-элемент)
	this.showPrevBtn = el.querySelector('.show-prev-btn');
	this.showNextBtn = el.querySelector('.show-next-btn');
	this.slideImage = el.querySelector('.slide-img');

	// Подписываемся на события (ждем клика по кнопкам "PREV" и "NEXT")
	this.showPrevBtn.addEventListener('click', function(e) {
		that.onShowPrevBtnClick(e);
	});
	this.showNextBtn.addEventListener('click', function(e) {
		that.onShowNextBtnClick(e);
	});

	// Блокируем кнопку "PREV", так как при инициализации мы стартуем с первого изобраэжения (двигаться назад нельзя)
	this.showPrevBtn.disabled = true;

	// Момент, когда самое время получить данные с Data уровня
	this._logic.init(function() {
		// Показываем первое изображение, как будем готовы
		that.slideImage.src = that._logic.getCurrentImageUrl();
	});
}

// Что делаем при событии клика на кнопку "PREV"
// Блокируем кнопку "PREV", если находимся на первом изображении
SliderView.prototype.onShowPrevBtnClick = function(e) {
	this._logic.activatePrevImage();
	this.slideImage.src = this._logic.getCurrentImageUrl();
	this.showNextBtn.disabled = false;

	if (!this._logic.canMovePrev()) {
		this.showPrevBtn.disabled = true;
	}	
}

// Что делаем при событии клика на кнопку "NEXT"
// Блокируем кнопку "NEXT", если находимся на последнем изображении
SliderView.prototype.onShowNextBtnClick = function(e) {
	this._logic.activateNextImage();
	this.slideImage.src = this._logic.getCurrentImageUrl();
	this.showPrevBtn.disabled = false;

	if (!this._logic.canMoveNext()) {
		this.showNextBtn.disabled = true;
	}	
}


