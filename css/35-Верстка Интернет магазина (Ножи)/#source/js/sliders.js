/* Слайдер SWIPER > */
// Добавление классов слайдерам
// '.swiper' - главному блоку; '.swiper-wrapper' - оболочке; '.swiper-slide' - для слайдов
function bildSliders() {
   // BuildSlider
   let sliders = document.querySelectorAll('[class*="__swiper"]:not(.swiper-wrapper)');
   if (sliders) {
      sliders.forEach(slider => {
         slider.parentElement.classList.add('swiper');
         slider.classList.add('swiper-wrapper');
         for (const slide of slider.children) {
            slide.classList.add('swiper-slide');
         }
      });
   }
}
// Инициализация слайдеров
function initSliders() {
   // Добавление классов слайдера (при необходимости отключить)
   bildSliders();

   // Перечень слайдеров
   // '.main-block__slider'
   if (document.querySelector('.main-block__slider')) {
      new Swiper('.main-block__slider', {
         // modules: [Navigation, Pagination],
         autoplay: {
            delay: 3000,
            disableOnInteraction: false,
         },
         // loop: true,
         observer: true,
         observeParents: true,
         slidesPerView: 1,
         spaceBetween: 50,
         parallax: true,
         speed: 800,
         pagination: {
            el: '.control-main-block__dotts',
            clickable: true,
         },
         on: {
            init: function (swiper) {
               const allSlides = document.querySelector('.fraction-control__all');
               allSlides.innerHTML = swiper.slides.length;
            },
            slideChange: function (swiper) {
               const currentSlide = document.querySelector('.fraction-control__current');
               currentSlide.innerHTML = swiper.activeIndex + 1;
            },
         },
      });
   }
   //============================================
   // '.products-slider__slider'
   if (document.querySelector('.products-slider')) {
      new Swiper('.products-slider__slider', {
         // modules: [Navigation, Pagination],
         // loop: true,
         autoplay: {
            delay: 3000,
            disableOnInteraction: false,
         },
         observer: true,
         observeParents: true,
         slidesPerView: 4,
         spaceBetween: 30,
         speed: 800,
         pagination: {
            el: '.products-slider__dotts',
            clickable: true,
         },
         breakpoints: {
            320: {
               slidesPerView: 1,
               spaceBetween: 10,
            },
            768: {
               slidesPerView: 2,
               spaceBetween: 20,
            },
            992: {
               slidesPerView: 3,
               spaceBetween: 20,
            },
            1370: {
               slidesPerView: 4,
               spaceBetween: 30,
            },
         },
      });
   }
   //============================================
   // '.products-new__slider'
   if (document.querySelector('.products-new')) {
      new Swiper('.products-new__slider', {
         // modules: [Navigation, Pagination],
         // loop: true,
         autoplay: {
            delay: 3000,
            disableOnInteraction: false,
         },
         observer: true,
         observeParents: true,
         slidesPerView: 3,
         spaceBetween: 30,
         speed: 800,
         pagination: {
            el: '.products-new__dotts',
            clickable: true,
         },
         breakpoints: {
            320: {
               slidesPerView: 1,
               spaceBetween: 10,
            },
            768: {
               slidesPerView: 2,
               spaceBetween: 20,
            },
            992: {
               slidesPerView: 2,
               spaceBetween: 20,
            },
            1330: {
               slidesPerView: 3,
               spaceBetween: 30,
            },
         },
      });
   }
   //============================================
   // 'Слайдер в карточке товара'
   if (document.querySelector('.images-product')) {
      const thumbsSwiper = new Swiper('.thumbs-images', {
         // modules: [Navigation, Pagination],
         // loop: true,         
         observer: true,
         observeParents: true,
         slidesPerView: 4,
         spaceBetween: 16,
         speed: 800,
         breakpoints: {
            992: {
               slidesPerView: 3,
            },
            1330: {
               slidesPerView: 4,
               spaceBetween: 16,
            },
         },
      });
      new Swiper('.images-product__slider', {
         // modules: [Navigation, Pagination],
         // loop: true,
         observer: true,
         observeParents: true,
         slidesPerView: 1,
         spaceBetween: 30,
         speed: 800,
         thumbs: {
            swiper: thumbsSwiper
         },
      });
   }
}

window.addEventListener('load', function (e) {
   // Запуск инициализации слайдеров
   initSliders();
   // Запуск инициализации скролла на базе слайдеров (по классу swiper_scroll)
   /// initSlidersScroll();
});
/* < Слайдер SWIPER */