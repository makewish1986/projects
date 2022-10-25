/* Действия при клике на  иконке бургера > */
// Добавляет или убирает класс .active при клике на '.header-menu__icon'
$('.header-menu__icon').click(function(event) {
	$(this).toggleClass('active');
	$('.header-menu').toggleClass('active');
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

