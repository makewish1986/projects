$(document).ready(function() {
	// при клике на '.header__burger' делаем следующее:
	$('.header__burger').click(function(event) {
		// у элементов '.header__burger' и '.header__menu' добавляем/убираем класс '.active'
		$('.header__burger,.header__menu').toggleClass('active');
		// для всего body добавляем класс 'lock', который блокирует прокрутку содержимого, когда мы вызываем бургер меню
		$('body').toggleClass('lock');
	});
});