/* Функции адаптива */

// При каждом изменении размера экрана вызываем adaptive_function()
$(window).resize(function(event) {
	adaptive_function();
});

// Прячем меню в бургер и обратно
function adaptive_header(w,h) {
	var headerMenu = $('.header-menu');
	var headerTop = $('.header-top');
	var headerLang = $('.header-top-lang');
	var headerBottomMenu = $('.header-bottom-menu');
	var headerBottomColumn = $('.header-bottom__column');
// Если ширина экрана < 767px, закидывает меню '.headerLang' из '.header-top' в '.header-menu'
// Если ширина экрана >= 767px, делает обратное
	if (w < 767) {
		if (!headerLang.hasClass('done')) {
			headerLang.addClass('done').appendTo(headerMenu);
		}
	}	else {
			if (headerLang.hasClass('done')) {
				headerLang.removeClass('done').prependTo(headerTop);
			}
		}
// Если ширина экрана < 767px, закидывает меню '.header-bottom-menu' из своей колонки '.header-bottom' > '.header-bottom__column' в '.header-menu'
// Если ширина экрана >= 767px, делает обратное
	if (w < 767) {
		if (!headerBottomMenu.hasClass('done')) {
			headerBottomMenu.addClass('done').appendTo(headerMenu);
		}
	}	else {
			$.each(headerBottomMenu, function(index, val) {
				if ($(this).hasClass('header-bottom-menu--right')) {
					if ($(this).hasClass('done')) {
						$(this).removeClass('done').prependTo(headerBottomColumn.eq(2));
					}
				} else {
					if ($(this).hasClass('done')) {
						$(this).removeClass('done').prependTo(headerBottomColumn.eq(0));
					}
				}
			});
			}
}

// Считываем текущие размеры экрана и вызываем adaptive_header(w,h)
function adaptive_function() {
	var w = $(window).outerWidth();
	var h = $(window).outerHeight();
	adaptive_header(w,h);
}
adaptive_function();