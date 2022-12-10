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
/* Спойлеры через класс > */
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
/* < Спойлеры через класс */
//============================================
/* Спойлеры через атрибут data > */
const spoilersArray = document.querySelectorAll('[data-spoilers]');
if (spoilersArray.length > 0) {
	// Получение обычных спойлеров
	const spoilersRegular = Array.from(spoilersArray).filter(function (item, index, self) {
		return !item.dataset.spoilers.split(",")[0];
	});
	// Инициализация обычных спойлеров
	if (spoilersRegular.length > 0) {
		initSpoilers(spoilersRegular);
	}

	// Получение спойлеров с медиа-запросами
	const spoilersMedia = Array.from(spoilersArray).filter(function (item, index, self) {
		return item.dataset.spoilers.split(",")[0];
	});

	// Инициализация спойлеров с медиа-запросами
	if (spoilersMedia.length > 0) {
		const breakpointsArray = [];
		spoilersMedia.forEach(item => {
			const params = item.dataset.spoilers;
			const breakpoint = {};
			const paramsArray = params.split(",");
			breakpoint.value = paramsArray[0];
			breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : "max";
			breakpoint.item = item;
			breakpointsArray.push(breakpoint);
		});

		// Получаем уникальные брейкпоинты
		let mediaQueries = breakpointsArray.map(function (item) {
			return '(' + item.type + "-width: " + item.value + "px)," + item.value + ',' + item.type;
		});
		mediaQueries = mediaQueries.filter(function (item, index, self) {
			return self.indexOf(item) === index;
		});

		// Работаем с каждым брейкпоинтом
		mediaQueries.forEach(breakpoint => {
			const paramsArray = breakpoint.split(",");
			const mediaBreakpoint = paramsArray[1];
			const mediaType = paramsArray[2];
			const matchMedia = window.matchMedia(paramsArray[0]);

			// Объекты с нужными условиями
			const spoilersArray = breakpointsArray.filter(function (item) {
				if (item.value === mediaBreakpoint && item.type === mediaType) {
					return true;
				}
			});
			// Событие
			matchMedia.addListener(function () {
				initSpoilers(spoilersArray, matchMedia);
			});
			initSpoilers(spoilersArray, matchMedia);
		});
	}
	// Инициализация
	function initSpoilers(spoilersArray, matchMedia = false) {
		spoilersArray.forEach(spoilersBlock => {
			spoilersBlock = matchMedia ? spoilersBlock.item : spoilersBlock;
			if (matchMedia.matches || !matchMedia) {
				spoilersBlock.classList.add('_init');
				initSpoilerBody(spoilersBlock);
				spoilersBlock.addEventListener('click', setSpoilerAction);
			} else {
				spoilersBlock.classList.remove('_init');
				initSpoilerBody(spoilersBlock, false);
				spoilersBlock.removeEventListener('click', setSpoilerAction);
			}
		});
	}
	// Работа с контентом
	function initSpoilerBody(spoilersBlock, hideSpoilerBody = true) {
		const spoilerTitles = spoilersBlock.querySelectorAll('[data-spoiler]');
		if (spoilerTitles.length > 0) {
			spoilerTitles.forEach(spoilerTitle => {
				if (hideSpoilerBody) {
					spoilerTitle.removeAttribute('tabindex');
					if (!spoilerTitle.classList.contains('_active')) {
						spoilerTitle.nextElementSibling.hidden = true;
					}
				} else {
					spoilerTitle.setAttribute('tabindex', '-1');
					spoilerTitle.nextElementSibling.hidden = false;
				}
			});
		}
	}
	function setSpoilerAction(e) {

		const el = e.target;
		if (el.hasAttribute('data-spoiler') || el.closest('[data-spoiler]')) {
			const spoilerTitle = el.hasAttribute('data-spoiler') ? el : el.closest('[data-spoiler]');
			const spoilersBlock = spoilerTitle.closest('[data-spoilers]');
			const oneSpoiler = spoilersBlock.hasAttribute('data-one-spoiler') ? true : false;
			if (!spoilersBlock.querySelectorAll('._slide').length) {
				if (oneSpoiler && !spoilerTitle.classList.contains('_active')) {
					hideSpoilersBody(spoilersBlock);
				}
				spoilerTitle.classList.toggle('_active');
				_slideToggle(spoilerTitle.nextElementSibling, 500);
			}
			e.preventDefault();
		}
	}
	function hideSpoilersBody(spoilersBlock) {
		const spoilerActiveTitle = spoilersBlock.querySelector('[data-spoiler]._active');
		if (spoilerActiveTitle) {
			spoilerActiveTitle.classList.remove('_active');
			_slideUp(spoilerActiveTitle.nextElementSibling, 500);
		}
	}
}
/* < Спойлеры через атрибут data */
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
/* Убираем все классы у коллекции объектов > ПИСАЛ САМ, ПРОВЕРИТЬ, КАК БУДЕТ ВОЗМОЖНОСТЬ*/
let _removeClasses = (blocks, removeClass) => {
	for (let index = 0; index < blocks.length; index++) {
		const block = blocks[index];
		block.classList.remove(removeClass);
	}
}
/* < Убираем все классы у коллекции объектов */
//============================================
