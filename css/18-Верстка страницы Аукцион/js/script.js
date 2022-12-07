/* Действия при клике на  иконке бургера > */
// Добавляет или убирает класс .active при клике на '.header-menu__icon'
$('.icon-menu').click(function (event) {
	$(this).toggleClass('active');
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

;
//=============================
//Build slider START
let sliders = document.querySelectorAll('._swiper');
if (sliders) {
   for (let index = 0; index < sliders.length; index++) {
      let slider = sliders[index];
      if (!slider.classList.contains('swiper-bild')) {
         let slider_items = slider.children;
         if (slider_items) {
            for (let index = 0; index < slider_items.length; index++) {
               let el = slider_items[index];
               el.classList.add('swiper-slide');
            }
         }
         let slider_content = slider.innerHTML;
         let slider_wrapper = document.createElement('div');
         slider_wrapper.classList.add('swiper-wrapper');
         slider_wrapper.innerHTML = slider_content;
         slider.innerHTML = '';
         slider.appendChild(slider_wrapper);
         slider.classList.add('swiper-bild');
      }
      if (slider.classList.contains('_gallery')) {
         // slider.data('lightGallery').destroy(true);
      }
   }
   sliders_bild_callback();
}

function sliders_bild_callback(params) { }
//Build slider END
//=============================
// Init Slider (main_slider) START
let main_slider = new Swiper('.main-slider__body', {
   observer: true,
   observeParents: true,
   slidesPerView: 1,
   spaceBetween: 0,
   speed: 800,
   loop: true,
   navigation: {
      nextEl: '.control-main-slider__arrow_next',
      prevEl: '.control-main-slider__arrow_prev',
   },
   // breakpoints: {
   //    320: {
   //       autoHeight: true,
   //    },
   //    768: {
   //       autoHeight: false,
   //    }
   // },
   on: {
      lazyImageReady: function () {
         ibg();
      },
   }
});
// Init Slider (main_slider) END
// Init Slider (slider-lots) START
let lots_slider = new Swiper('.slider-lots__body', {
   observer: true,
   observeParents: true,
   slidesPerView: 3,
   spaceBetween: 0,
   speed: 800,
   loop: true,
   navigation: {
      nextEl: '.control-slider-lots__arrow-next',
      prevEl: '.control-slider-lots__arrow-prev',
   },
   breakpoints: {
      320: {
         slidesPerView: 1,
      },
      550: {
         slidesPerView: 2,
      },
      768: {
         slidesPerView: 3,
      }
   },
   on: {
      lazyImageReady: function () {
         ibg();
      },
   }
});
// Init Slider (slider-lots) END
// Init Slider (slider-quotes) START
let quotes_slider = new Swiper('.slider-quotes__body', {
   observer: true,
   observeParents: true,
   slidesPerView: 1,
   spaceBetween: 0,
   speed: 800,
   loop: true,
   navigation: {
      nextEl: '.control-slider-quotes__circle',
   },
   breakpoints: {
      320: {
         autoHeight: true,
      },
      570: {
         autoHeight: false,
      },
   },
   on: {
      lazyImageReady: function () {
         ibg();
      },
   }
});
// Init Slider (slider-quotes) END
//=============================;
let user_menu = document.querySelector('.user-header__menu');
/* Открываем и закрываем меню .user-header__menu */
let user_icon = document.querySelector('.user-header__icon');
user_icon.addEventListener('click', function (e) {
   user_menu.classList.toggle('_active');
});
/* Закрываем меню .user-header__menu при клике в любой области, которая не является этим меню */
document.documentElement.addEventListener('click', function (e) {
   if (!e.target.closest('.user-header')) {
      user_menu.classList.remove('_active');
   }
});