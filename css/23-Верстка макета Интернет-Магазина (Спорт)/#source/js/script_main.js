/* Действия при клике на  иконке бургера > */
// Добавляет или убирает класс .active при клике на '.icon-menu'
$('.icon-menu').click(function (event) {
	$(this).toggleClass('_active');
	$('.menu__body').toggleClass('_active');
	$('body').toggleClass('lock');
});
/* < Действия при клике на  иконке бургера */

/* Превращает изображение в фон > */
function ibg() {
	$.each($('._ibg'), function (index, val) {
		if ($(this).find('img').length > 0) {
			$(this).css('background-image', 'url("' + $(this).find('img').attr('src') + '")');
		}
	});
}
ibg();
/* < Превращает изображение в фон */

/* Переключение класса .active при клике на "табсах(tabs)" > */
$('body').on('click', '.tab__navitem', function (event) {
	var eq = $(this).index();
	if ($(this).hasClass('parent')) {
		var eq = $(this).parent().index();
	}
	if (!$(this).hasClass('active')) {
		$(this).closest('.tabs').find('.tab__navitem').removeClass('active');
		$(this).addClass('active');
		$(this).closest('.tabs').find('.tab__item').removeClass('active').eq(eq).addClass('active');
		if ($(this).closest('.tabs').find('.slick-slider').length > 0) {
			$(this).closest('.tabs').find('.slick-slider').slick('setPosition');
		}
	}
});
/* < Переключение класса .active при клике на "табсах(tabs)" */

