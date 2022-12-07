@@include("script_main.js");
@@include("sliders.js");
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