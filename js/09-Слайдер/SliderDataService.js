// Data уровень. Цель - получить URL's изображений и передать их через массив обратно на уровень логики
// Получаем URL's изображений
// Специально делаем это асинхронно (хотя в этом случае работал бы и обычный return)
// Мало ли сколько времени займет получение данных на этом data уровне, поэтому делаем асинхронно, используя колбэк-функцию
// О том, что мы закончили получение массива с URL's, мы сообщаем колбэк-функцией на уровень SliderLogic,
// передавая в эту колбэк-функцию параметром сам этот массив

// Данные можем получать двумя способами
// 1 - напрямую прописывать
// 2 - через Ajax сервис

// ----------------

// 1 - SliderDataService - Объект данных, добавляемых вручную
function SliderDataService() {

}

SliderDataService.prototype.getUrls = function(successCallback) {
	var imagesUrls = [];
	imagesUrls.push('images/image_1.jpg');
	imagesUrls.push('images/image_2.jpg');
	imagesUrls.push('images/image_3.jpg');
	imagesUrls.push('images/image_4.jpg');
	successCallback(imagesUrls);
}

// ----------------

// 2 - SliderAjaxDataService - Объект данных, добавляемых через Ajax сервис
function SliderAjaxDataService() {

}

SliderAjaxDataService.prototype.getUrls = function(successCallback) {
	$.ajax({
		url: 'https://repetitora.net/api/JS/Images',
		success: function(data) {
			var imagesUrls = [];
			for (let i = 0; i < data.length; i++) {
				const element = data[i];
				const url = element.original;
				imagesUrls.push(url);
			}
			successCallback(imagesUrls);
		}
	});
}