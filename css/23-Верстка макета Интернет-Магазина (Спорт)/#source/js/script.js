@@include("script_main.js");
@@include("dynamic_adapt.js");
@@include("functions.js");
@@include("forms.js");
@@include("sliders.js");
@@include("libs/wNumb.js");
@@include("libs/nouislider.js");


// Действия с боковым меню.
// Добавляем/Убираем класс '.active' для родителя '.menu-page__parent'
// На ПК версии:
// Открываем/Закрываем боковое подменю при наведении на соответствующий пункт в основном меню
// На мобильной версии:
// Открываем/Закрываем подменю при клике на соответствующий пункт в основном меню
if (isMobile.any()) {
   let menuParents = document.querySelectorAll('.menu-page__parent>a');
   for (let index = 0; index < menuParents.length; index++) {
      const menuParent = menuParents[index];
      menuParent.addEventListener('click', function (e) {
         menuParent.parentElement.classList.toggle('_active');
         e.preventDefault();
      });
   }
} else {
   let menuParents = document.querySelectorAll('.menu-page__parent');
   for (let index = 0; index < menuParents.length; index++) {
      const menuParent = menuParents[index];
      menuParent.addEventListener('mouseenter', function (e) {
         menuParent.classList.add('_active');
      });
      menuParent.addEventListener('mouseleave', function (e) {
         menuParent.classList.remove('_active');
      });
   }
}

//=====================================================================

// Раскрываем/скрываем основное меню '.menu-page__body' по нажатию на иконку бургера '.menu-page__burger'
let menuPageBurger = document.querySelector('.menu-page__burger');
let menuPageBody = document.querySelector('.menu-page__body');
menuPageBurger.addEventListener('click', function (e) {
   menuPageBurger.classList.toggle('_active');
   _slideToggle(menuPageBody); // Функция из файла "functions.js"
});

//=====================================================================

// Раскрываем/скрываем меню с категориями '.categories-search' по нажатию на кнопку поиска '.search-page__title'
let searchSelect = document.querySelector('.search-page__title');
let categoriesSearch = document.querySelector('.categories-search');
searchSelect.addEventListener('click', function (e) {
   searchSelect.classList.toggle('_active');
   _slideToggle(categoriesSearch); // Функция из файла "functions.js"
});

let checkboxCategories = document.querySelectorAll('.categories-search__checkbox');
for (let index = 0; index < checkboxCategories.length; index++) {
   const checkboxCategory = checkboxCategories[index];
   checkboxCategory.addEventListener('change', function (e) {
      checkboxCategory.classList.toggle('_active');

      let checkboxactiveCategories = document.querySelectorAll('.categories-search__checkbox._active');
      if (checkboxactiveCategories.length > 0) {
         searchSelect.classList.add('_categories');
         let searchQuantity = document.querySelector('.search-page__quantity');
         searchQuantity.innerHTML = searchQuantity.getAttribute('data-text') + ' ' + checkboxactiveCategories.length;
      } else {
         searchSelect.classList.remove('_categories');
      }
   });
}

//=====================================================================

// Инициализация слайдера nouislider - ползунки
let priceSlider = document.querySelector('.price-filter__slider');

noUiSlider.create(priceSlider, {
   start: [10000, 100000],
   tooltips: [wNumb({ decimals: 0 }), wNumb({ decimals: 0 })],
   connect: true,
   margin: 60000,
   range: {
      'min': 0,
      'max': 200000
   }
});

const priceStart = document.getElementById('price-start');
const priceEnd = document.getElementById('price-end');
priceStart.addEventListener('change', function () {
   priceSlider.noUiSlider.set([priceStart.value,]);
});
priceEnd.addEventListener('change', function () {
   priceSlider.noUiSlider.set([, priceEnd.value]);
});

//=====================================================================
// Раскрываем/скрываем блок с фильтрами '.filter__content' по нажатию на заголовок блока с фильтрами '.filter__title'
if (isMobile.any()) {
   const filterTitle = document.querySelector('.filter__title');
   filterTitle.addEventListener('click', function (e) {
      filterTitle.classList.toggle('_active');
      _slideToggle(filterTitle.nextElementSibling); // Функция из файла "functions.js"
   });
}
//=====================================================================
//=====================================================================
//=====================================================================