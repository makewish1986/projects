
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
/* Работа с google картой */
function map(n) {
	google.maps.Map.prototype.setCenterWithOffset = function(latlng, offsetX, offsetY) {
		var map = this;
		var ov = new google.maps.OverlayView();
		ov.onAdd = function() {
			var proj = this.getProjection();
			var aPoint = proj.fromLatLngToContainerPixel(latlng);
			aPoint.x = aPoint.x + offsetX;
			aPoint.y = aPoint.y + offsetY;
			map.panTo(proj.fromContainerPixelToLatLng(aPoint));
			//map.setCenter(proj.fromContainerPixelToLatLng(aPoint));
		}
		ov.draw = function() {};
		ov.setMap(this);
	};
	var markers = new Array();
	var infowindow = new google.maps.InfoWindow({
		//pixelOffset: new google.maps.Size(-230,250)
	});
	var locations = [
		[new google.maps.LatLng(53.819055,27.8813694)]
	]
	var options = {
		zoom: 10,
		panControl: false,
		mapTypeControl: false,
		center: locations[0][0],
		scrollwheel: false,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	var map = new google.maps.Map(document.getElementById('map'), options);
	var icon = {
		url: 'img/icons/map.svg',
		scaledSize: new google.maps.Size(18,20),
		anchor: new google.maps.Point(9,10)
	}
	for (var i = 0; i < locations.length; i++) {
		var marker = new google.maps.Marker ({
			//icon: icon,
			position: locations[i][0],
			map: map,
		});
		markers.push(marker);
	}
}
if ($("#map").length > 0) {
	map();
}