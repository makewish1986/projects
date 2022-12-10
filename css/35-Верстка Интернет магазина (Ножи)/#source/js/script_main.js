/* Действия при клике на  иконке бургера > */
// Добавляет или убирает класс .active при клике на '.icon-menu'
$('.icon-menu').click(function (event) {
	$(this).toggleClass('_active');
	$('.menu__body').toggleClass('_active');
	$('body').toggleClass('lock');
	if (document.documentElement.classList.contains('catalog-open')) {
		document.documentElement.classList.remove('catalog-open')
	}
	if (document.documentElement.classList.contains('submenu-open')) {
		document.documentElement.classList.remove('submenu-open')
	}
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

/* Tips > */
// Tips - всплывающие подсказки
// Модуль и документация -> https://atomiks.github.io/tippyjs/
// Подключение - через CDN: включить в HTML следующее:
// <script src="https://unpkg.com/@popperjs/core@2"></script>
// <script src="https://unpkg.com/tippy.js@6"></script>
tippy('[data-tippy-content]', {
	content: 'My tooltip!',
	arrow: false,
});
/* < Tips */