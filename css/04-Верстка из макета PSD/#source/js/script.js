/* Действия при клике на  иконке бургера > */
// Добавляет или убирает класс .active при клике на '.menu-header__icon'
$('.menu-header__icon').click(function(event) {
	$(this).toggleClass('active');
	$('.menu-header__menu').toggleClass('active');
	if ($(this).hasClass('active')) {
		$('body').data('scroll', $(window).scrollTop());
	}
	$('body').toggleClass('lock');
	if (!$(this).hasClass('active')) {
		$('body,html').scrollTop(parseInt($('body').data('scroll')));
	}
});
/* < Действия при клике на  иконке бургера */

/* Превращает изображение в фон > */
function ibg() {
	$.each($('.ibg'), function(index,val) {
		if ($(this).find('img').length > 0) {
			$(this).css('background-image','url("'+$(this).find('img').attr('src')+'")');
		}
	});
}
ibg();
/* < Превращает изображение в фон */

/* Переключение класса .active при клике на "табсах(tabs)" > */
$('body').on('click','.tab__navitem', function(event) {
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

