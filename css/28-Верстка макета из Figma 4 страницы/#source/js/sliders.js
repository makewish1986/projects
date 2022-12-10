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