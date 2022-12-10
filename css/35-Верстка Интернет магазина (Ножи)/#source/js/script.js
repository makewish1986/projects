@@include("functions.js");
@@include("forms.js");
@@include("sliders.js");
@@include("popup.js");
@@include("rating.js");
@@include("script_main.js");
@@include("dynamic_adapt.js");
@@include("libs/wNumb.js");
@@include("libs/nouislider.js");

// При клике на документ выполняем функцию documentActions
document.addEventListener('click', documentActions);

// Раскрывающиеся подменю в меню-шапке сконструированы на grid.
// Причем классы сделаны так, что для grid нам нужна структура:
// class="submenu-catalog__block submenu-catalog__block_5", где
// 5 - это количество столбцов в этом конкретном подменю.
// Но количество столбцов в подменю может быть разное, например 2, и тогда нам нужен такой класс для подменю:
// class="submenu-catalog__block submenu-catalog__block_2"
// Далее идет кусок кода, который автоматически добавляет цифру в класс.
const menuBlocks = document.querySelectorAll('.submenu-catalog__block');
if (menuBlocks.length) {
   menuBlocks.forEach(menuBlock => {
      const menuBlockItems = menuBlock.querySelectorAll('.submenu-catalog__category').length;
      menuBlock.classList.add(`submenu-catalog__block_${menuBlockItems}`);
   });
}

// Набор функций при клике на что-либо на странице
function documentActions(e) {
   const targetElement = e.target;

   // Открываем подменю при клике на соответствующий пункт основного меню
   // При этом учитываем момент, что нам нужно закрыть уже открытое подменю, если открывается другое подменю
   if (targetElement.closest('[data-parent]')) {
      const subMenuId = targetElement.dataset.parent ? targetElement.dataset.parent : null;
      const subMenu = document.querySelector(`[data-submenu="${subMenuId}"]`);
      if (subMenu) {
         const activeLink = document.querySelector('._submenu-active');
         const activeBlock = document.querySelector('._submenu-open');
         if (activeLink && activeLink !== targetElement) {
            activeLink.classList.remove('_submenu-active');
            activeBlock.classList.remove('_submenu-open');
            document.documentElement.classList.remove('submenu-open');
         }
         document.documentElement.classList.toggle('submenu-open');
         targetElement.classList.toggle('_submenu-active');
         subMenu.classList.toggle('_submenu-open');
      }
      e.preventDefault();
   }
   // При клике на "Каталог товаров", который находится в меню-бургер, открываем подменю с каталогом
   // через класс '.catalog-open'
   if (targetElement.closest('.menu-top-header__link_catalog')) {
      document.documentElement.classList.add('catalog-open');
      e.preventDefault();
   }
   if (targetElement.closest('.menu-catalog__back')) {
      document.documentElement.classList.remove('catalog-open');
      document.querySelector('._submenu-active') ? document.querySelector('._submenu-active').classList.remove('._submenu-active') : null;
      document.querySelector('._submenu-open') ? document.querySelector('._submenu-open').classList.remove('._submenu-open') : null;
      e.preventDefault();
   }
   if (targetElement.closest('.submenu-catalog__back')) {
      document.documentElement.classList.remove('submenu-open');
      document.querySelector('._submenu-active') ? document.querySelector('._submenu-active').classList.remove('._submenu-active') : null;
      document.querySelector('._submenu-open') ? document.querySelector('._submenu-open').classList.remove('._submenu-open') : null;
      e.preventDefault();
   }
}
//================================================================
// Range (ползунок nouislider)
function rangeInit() {
   const rangeItems = document.querySelectorAll('[data-range]');
   if (rangeItems.length > 0) {
      rangeItems.forEach(rangeItem => {
         const fromValue = rangeItem.querySelector('[data-range-from]');
         const toValue = rangeItem.querySelector('[data-range-to]');
         const item = rangeItem.querySelector('[data-range-item]');
         noUiSlider.create(item, {
            start: [Number(fromValue.value), Number(toValue.value)],
            connect: true,
            tooltips: [true, true],
            range: {
               'min': [Number(fromValue.dataset.rangeFrom)],
               'max': [Number(toValue.dataset.rangeTo)],
            }
         });
         // Обновление значений Инпутов при перетаскивании ползунков
         item.noUiSlider.on('update', function (values, handle) {
            fromValue.value = values[0];
            toValue.value = values[1];
         });
         // Обновление положения ползунка при вводе значения в Инпут 1
         fromValue.addEventListener('change', function () {
            item.noUiSlider.set([this.value, null]);
         });
         // Обновление положения ползунка при вводе значения в Инпут 2
         toValue.addEventListener('change', function () {
            item.noUiSlider.set([null, this.value]);
         });
      });
   }
}
rangeInit();
// На разрешении меньше 992px показывает тело блока с фильтрами
if (document.querySelector('.filter-catalog__title')) {
   document.querySelector('.filter-catalog__title').addEventListener('click', function (e) {
      if (window.innerWidth < 992) {
         document.querySelector('.filter-catalog__items').classList.toggle('_active');
      }
   });
}

