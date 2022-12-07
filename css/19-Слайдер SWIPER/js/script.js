new Swiper('.image-slider', {
   // Стрелки
   navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
   },
   // Пагинация
   // Буллеты, фракции, текущее положение, прогресс бар
   pagination: {
      el: '.swiper-pagination',
      // Буллеты
      /*
      type: 'bullets',
      clickable: true,
      // Динамические Буллеты
      dynamicBullets: true,
      // Кастомные Буллеты
      renderBullet: function (index, classname) {
         return '<span class="' + classname + '">' + (index + 1) + '</span>';
      },
      */
      // Фракция

      type: 'fraction',
      // Кастомный вывод фракции
      renderFraction: function (currentClass, totalClass) {
         return 'Фото <span class="' + currentClass + '"></span>' + ' из ' + '<span class="' + totalClass + '"></span>';
      },

      // Прогресс бар
      /*
      type: 'progressbar',
      */
   },
   // Скролл бар
   scrollbar: {
      el: '.swiper-scrollbar',
      // Возможность перетаскивать скролл
      draggable: true
   },

   // Вкл/откл свайп на ПК
   simulateTouch: true,
   // Чувствительность свайпа
   touchratio: 1,
   // Угол срабатывания свайпа
   touchAngle: 45,
   // Курсор свайпа
   grabCursor: true,
   // Перетаскивание при клике на слайд
   slideToClickedSlide: true,
   // Управление клавиатурой
   keyboard: {
      // вкл/выкл
      enable: true,
      // вкл/выкл только когда слайдер в пределах вьюпорта
      onlyInViewport: true,
      // вкл/выкл управление pageUp, pageDown
      pageUpDown: true,
   },
   // Управление колесом мыши
   mousewheel: {
      // Чувствительность
      sensitivity: 1,
      // Класс объекта, на котором будет сбрасываться прокрутка
      //eventTarget: ".image-slider"
   },
   // Автовысота
   autoHeight: true,
   // Кол-во слайдов для показа (Возможны не целые значения, возможно значение auto)
   slidesPerView: 2,
   // Отключение функционала слайдера, если слайдов меньше, чем нужно
   watchOverflow: true,
   // Отступ между слайдами
   spaceBetween: 30,
   // Кол-во пролистываемых слайдов (влияет на кол-во страниц в пагинации)
   slidesPerGroup: 1,
   // Активный слайд по центру
   centeredSlides: false,
   // Стартовый слайд (первый слайд имеет номер 0)
   initialSlide: 0,
   // Мультирядность (нужно дополнительно в css установить высоту всего слайдера и отдельно для слайдов)
   slidesPerColumn: 1,
   // Бесконечность пролистывания
   loop: false,
   // Свободный режим
   freeMode: false,
   // Автопрокрутка
   /*
   autoplay: {
      // Пауза между прокруткой
      delay: 1000,
      // Закончить на последнем слайде
      stopOnLastSlide: true,
      // Отключить после ручного переключения
      disableOnInteraction: false
   },
   */
   // Скорость
   speed: 800,
   // Вертикальный слайдер (нужна настройка высоты слайдера в css)
   // direction: 'vertical',
   // Эффекты переключения слайдов ('slide' - по умолчанию)
   /*
   // Эффект 'fade'
   effect: 'fade',
   // Дополнение к fade
   fadeEffect: {
      // Параллельная смена прозрачности
      crossFade: true
   },
   */
   /*
   // Эффект 'flip'
   effect: 'flip',
   // Дополнение к flip
   flipEffect: {
      // Тень
      slideShadow: true,
      // Показ только активного слайда
      limitRotation: true
   },
   */
   /*
   // Эффект 'cube'
   effect: 'cube',
   // Дополнение к cube
   cubeEffect: {
      // Тень
      slideShadow: true,
      shadow: true,
      shadowOffset: 20,
      shadowScale: 0.94
   },
   */
   // Эффект 'coverflow'
   /*
   effect: 'coverflow',
   // Дополнение к coverflow
   coverflowEffect: {
      // Угол
      rotate: 20,
      // Наложение
      stretch: 50,
      // Тень
      slideShadows: true,
   },
   */
   // Брейкпоинты для адаптива (mobile first)
   breakpoints: {
      320: { slidesPerView: 1, },
      480: { slidesPerView: 2, },
      992: { slidesPerView: 3, },
   },
   /*
   // Обновить свайпер
   // при изменении элементов слайдера
   observer: true,
   // Обновить свайпер
   // при изменении родительских элементов слайдера
   observeParents: true,
   // Обновить свайпер
   // при изменении дочерних элементов слайдера
   observeSlideChildren: true,
   */
});