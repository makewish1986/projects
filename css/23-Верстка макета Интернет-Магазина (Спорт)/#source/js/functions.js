/* Плавное выезжание вниз/вверх > */
let _slideUp = (target, duration = 500) => {
	target.style.transitionProperty = 'height, margin, padding';
	target.style.transitionDuration = duration + 'ms';
	target.style.height = target.offsetHeight + 'px';
	target.offsetHeight;
	target.style.overflow = 'hidden';
	target.style.height = 0;
	target.style.paddingTop = 0;
	target.style.paddingBottom = 0;
	target.style.marginTop = 0;
	target.style.marginBottom = 0;
	window.setTimeout(() => {
		target.style.display = 'none';
		target.style.removeProperty('height');
		target.style.removeProperty('padding-top');
		target.style.removeProperty('padding-bottom');
		target.style.removeProperty('margin-top');
		target.style.removeProperty('margin-bottom');
		target.style.removeProperty('overflow');
		target.style.removeProperty('transition-duration');
		target.style.removeProperty('transition-property');
		target.classList.remove('_slide');
	}, duration);
}

let _slideDown = (target, duration = 500) => {
	target.style.removeProperty('display');
	let display = window.getComputedStyle(target).display;
	if (display === 'none') {
		display = 'block';
	}
	target.style.display = display;
	let height = target.offsetHeight;
	target.style.overflow = 'hidden';
	target.style.height = 0;
	target.style.paddingTop = 0;
	target.style.paddingBottom = 0;
	target.style.marginTop = 0;
	target.style.marginBottom = 0;
	target.offsetHeight;
	target.style.transitionProperty = 'height, margin, padding';
	target.style.transitionDuration = duration + 'ms';
	target.style.height = height + 'px';
	target.style.removeProperty('padding-top');
	target.style.removeProperty('padding-bottom');
	target.style.removeProperty('margin-top');
	target.style.removeProperty('margin-bottom');
	window.setTimeout(() => {
		target.style.removeProperty('height');
		target.style.removeProperty('overflow');
		target.style.removeProperty('transition-duration');
		target.style.removeProperty('transition-property');
		target.classList.remove('_slide');
	}, duration);
}

let _slideToggle = (target, duration = 500) => {
	if (!target.classList.contains('_slide')) {
		target.classList.add('_slide');
		if (window.getComputedStyle(target).display === 'none') {
			return _slideDown(target, duration);
		} else {

			return _slideUp(target, duration);
		}
	}
}
/* < Плавное выезжание вниз/вверх */
//============================================
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

if (isMobile.any()) {
	document.querySelector('body').classList.add('_touch');
}
/* < Проверка мобильной версии */
//============================================
/* Спойлеры > */
let spoilers = document.querySelectorAll('._spoiler');
if (spoilers.length > 0) {
	for (let index = 0; index < spoilers.length; index++) {
		const spoiler = spoilers[index];
		spoiler.addEventListener('click', function (e) {
			if (spoiler.classList.contains('_spoiler-992') & window.innerWidth > 992) {
				return false;
			}
			if (spoiler.classList.contains('_spoiler-768') & window.innerWidth > 768) {
				return false;
			}
			if (spoiler.closest('._spoilers').classList.contains('_one')) {
				let current_spoilers = spoiler.closest('._spoilers').querySelectorAll('._spoiler');
				for (let i = 0; i < spoilers.length; i++) {
					let el = current_spoilers[i];
					if (el != spoiler) {
						el.classList.remove('_active');
						_slideUp(el.nextElementSibling);
					}
				}
			}
			spoiler.classList.toggle('_active');
			_slideToggle(spoiler.nextElementSibling);
		});
	}
}
/* < Спойлеры */
//============================================
/* Табы > */
const tabs = document.querySelectorAll('._tabs');
for (let index = 0; index < tabs.length; index++) {
	const tab = tabs[index];
	const tabs_items = tab.querySelectorAll('._tabs-item');
	const tabs_blocks = tab.querySelectorAll('._tabs-block');
	for (let index = 0; index < tabs_items.length; index++) {
		const tabs_item = tabs_items[index];
		tabs_item.addEventListener('click', function (e) {
			for (let index = 0; index < tabs_items.length; index++) {
				const tabs_item = tabs_items[index];
				tabs_item.classList.remove('_active');
				tabs_blocks[index].classList.remove('_active');
			}
			tabs_item.classList.add('_active');
			tabs_blocks[index].classList.add('_active');
			e.preventDefault();
		});
	}
}
/* < Табы */
//============================================
//============================================
