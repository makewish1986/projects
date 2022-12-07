// Проверяем на чем открыт сайт, на ПК или на мобильном устройстве. Переменная isMobile
let isMobile = {
        Android: function() {return navigator.userAgent.match(/Android/i);},
        BlackBerry: function() {return navigator.userAgent.match(/BlackBerry/i);},
        iOS: function() {return navigator.userAgent.match(/iPhone|iPad|iPod/i);},
        Opera: function() {return navigator.userAgent.match(/Opera Mini/i);},
        Windows: function() {return navigator.userAgent.match(/IEMobile/i);},
        any: function() {return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());}
};
let body = document.querySelector('body');
// Делаем разные действия, если сайт открыт на мобильных устройствах и НЕ на мобильных устройствах
if (isMobile.any()) {
	// body добавляем класс '.touch'
	body.classList.add('touch');
	// Ищем все стрелки, то есть элементы с классом '.arrow' и пробегаем по ним циклом
	let arrow = document.querySelectorAll('.arrow');
	for (i = 0;i < arrow.length; i++) {
		// thisArrow - сам элемент со стрелкой (наш span)
		let thisArrow = arrow[i];
		// thisLink - Элемент перед стрелкой (ссылка a)
		let thisLink = arrow[i].previousElementSibling;
		// subMenu - Элемент после стрелки (подменю ul)
		let subMenu = arrow[i].nextElementSibling;

		// thisLink - вешаем класс '.parent'
		thisLink.classList.add('parent');
		// При клике на стрелку
		thisArrow.addEventListener('click', function() {
			// subMenu - добавляем или убираем класс '.open'
			subMenu.classList.toggle('open');
			// thisArrow - добавляем или убираем класс '.active'
			thisArrow.classList.toggle('active');
		});
	}
} else {
	// body добавляем класс '.mouse'
	body.classList.add('mouse');
}