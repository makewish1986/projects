"use strict"
/* Проверка мобильной версии > */
var isMobile = {
   Android: function () {
      return navigator.userAgent.match(/Android/i);
   },
   BlackBerry: function () {
      return navigator.userAgent.match(/BlackBerry/i);
   },
   iOS: function () {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);
   },
   Opera: function () {
      return navigator.userAgent.match(/Opera Mini/i);
   },
   Windows: function () {
      return navigator.userAgent.match(/IEMobile/i);
   },
   any: function () {
      return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
   }
};
/* < Проверка мобильной версии */
//======================================================
// Для мобильной версии к body добавляем класс'._touch'
// Для ПК версии к body добавляем класс'._pc'
// Для мобильной версии ищем все стрелочки, которые есть в меню
// и к каждой из них вешаем событие click, по которому
// добавляем его родтелю класс '._active', чтобы в CSS показать подменю
if (isMobile.any()) {
   document.body.classList.add('_touch');
   const menuArrows = document.querySelectorAll('.menu__arrow');
   if (menuArrows.length > 0) {
      for (let index = 0; index < menuArrows.length; index++) {
         const menuArrow = menuArrows[index];
         menuArrow.addEventListener('click', function (e) {
            menuArrow.parentElement.classList.toggle('_active');
         });
      }
   }
} else {
   document.body.classList.add('_pc');
}
//======================================================
// Меню бургер
// При клике на бургер '.menu__icon':
// добавляется класс '.active' иконке бургера '.menu__icon',
// добавляется класс '.active' телу меню '.menu__body',
// добавляется класс '._lock' для body (чтобы запретить скролл страницы в состоянии открытого меню)
const iconMenu = document.querySelector('.menu__icon');
const menuBody = document.querySelector('.menu__body');
if (iconMenu) {
   iconMenu.addEventListener('click', function (e) {
      document.body.classList.toggle('_lock');
      iconMenu.classList.toggle('_active');
      menuBody.classList.toggle('_active');
   });
}
//======================================================
// Прокрутка при клике
// Находим только те элементы '.menu__link', у которых есть атрибут [data-goto]
// При клике на них выполняем функцию onMenuLinkClick
const menuLinks = document.querySelectorAll('.menu__link[data-goto]');
if (menuLinks.length > 0) {
   menuLinks.forEach(menuLink => {
      menuLink.addEventListener('click', onMenuLinkClick);
   });

   function onMenuLinkClick(e) {
      // В menuLink получаем объект, на котором сработал клик, то есть по сути ссылку меню
      const menuLink = e.target;
      // Проверяем, заполнен ли у этого объекта атрибут [data-goto], а также
      // проверяем, есть ли на странице тот объект, к которому мы собираемся делать переход,
      // И если оба условия выполнены, получаем в константу gotoBlock этот объект,
      // к которому мы собираемся делать переход
      if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
         const gotoBlock = document.querySelector(menuLink.dataset.goto);
         const gotoBlockValue = gotoBlock.getBoundingClientRect().top + window.scrollY - document.querySelector('header').offsetHeight;

         // Если открыто меню, которое реализовано на мобильной версии,
         // то закроем его перед тем, как проскролить к нужному разделу
         if (iconMenu.classList.contains('_active')) {
            document.body.classList.remove('_lock');
            iconMenu.classList.remove('_active');
            menuBody.classList.remove('_active');
         }

         // Скроллим до нужного места
         window.scrollTo({
            top: gotoBlockValue,
            behavior: "smooth",
         });
         e.preventDefault();
      }
   }
}