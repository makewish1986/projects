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
//============================================
/* Слайдер .mainslider > */
if (document.querySelector('.mainslider')) {
   // Инициализация слайдера START
   let mainslider = new Swiper('.mainslider__body', {
      observer: true,
      observeParents: true,
      slidesPerView: 1,
      spaceBetween: 0,
      speed: 800,
      loop: true,
      pagination: {
         el: '.mainslider__dotts',
         clickable: true,
      },
   });
   // Инициализация слайдера END
   let mainsliderImages = document.querySelectorAll('.mainslider__image');
   let mainsliderDotts = document.querySelectorAll('.mainslider__dotts .swiper-pagination-bullet');

   for (let i = 1; i < mainsliderImages.length - 1; i++) {
      // В переменную mainsliderImage получаем путь текущего изображения слайдера
      // И добавляем это изображения в свойство 'background-image' у текущего пагинатора
      // Так как слайдер swiper создает в своей структуре еще 2 дополнительных html-слайда,
      // Приходится из этой схемы исключать первый и последний искусственно созданные свайпером слайды
      const mainsliderImage = mainsliderImages[i].querySelector('img').getAttribute('src');
      mainsliderDotts[i - 1].style.backgroundImage = "url('" + mainsliderImage + "')";
   }
}
/* < Слайдер .mainslider */
//=============================
/* Слайдер .products-slider > */
if (document.querySelector('.products-slider')) {
   // Инициализация слайдера START
   let prosuctsSlider = new Swiper('.products-slider__item', {
      observer: true,
      observeParents: true,
      slidesPerView: 1,
      spaceBetween: 0,
      autoHeight: true,
      speed: 800,
      // loop: true,
      pagination: {
         el: '.products-slider__info',
         type: 'fraction'
      },
      navigation: {
         nextEl: '.products-slider__arrow-next',
         prevEl: '.products-slider__arrow-prev',
      },
   });
   // Инициализация слайдера END
}
/* < Слайдер .products-slider */
//============================================
/* Слайдер .brands-slider > */
if (document.querySelector('.brands-slider')) {
   // Инициализация слайдера START
   let brandsSlider = new Swiper('.brands-slider__body', {
      observer: true,
      observeParents: true,
      slidesPerView: 5,
      spaceBetween: 0,
      speed: 800,
      loop: true,
      navigation: {
         nextEl: '.brands-slider__arrow_prev',
         prevEl: '.brands-slider__arrow_next',
      },
      breakpoints: {
         320: {
            slidesPerView: 1,
            autoHeight: true,
         },
         480: { slidesPerView: 2 },
         600: { slidesPerView: 3 },
         768: { slidesPerView: 4 },
         992: { slidesPerView: 5 },
      }
   });
   // Инициализация слайдера END
}
/* < Слайдер .brands-slider */
//============================================
/* 2 Слайдера в карточке продукта > */
if (document.querySelector('.images-product')) {
   // Инициализация слайдера .images-product__subslider START
   let imagesSubSlider = new Swiper('.images-product__subslider', {
      observer: true,
      observeParents: true,
      slidesPerView: 4,
      spaceBetween: 0,
      speed: 800,
   });
   // Инициализация слайдера .images-product__subslider END
   // Инициализация слайдера .images-product__mainslider START
   let imagesMainSlider = new Swiper('.images-product__mainslider', {
      observer: true,
      observeParents: true,
      slidesPerView: 1,
      spaceBetween: 0,
      speed: 800,
      loop: true,
      thumbs: {
         swiper: imagesSubSlider
      },
   });
   // Инициализация слайдера .images-product__mainslider END

}
/* < 2 Слайдера в карточке продукта */
//============================================
//============================================