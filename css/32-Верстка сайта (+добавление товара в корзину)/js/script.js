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
;
// Динамический адаптив. Скрипт перекидывает блок HTML из одного места в другой
// Для этого внутри тега перекидываемого блока указываем атрибут data-da="where, position, when"
// where - куда перекидываем блок (в какого будущего родителя)
// position - на какое место в блоке назначение будет вставлен перекидываемый блок
// when - при каком разрешении это будет происходить
// Пример: data-da="item, 2, 640"
(function () {
   let original_positions = [];
   let da_elements = document.querySelectorAll('[data-da]');
   let da_elements_array = [];
   let da_match_media = [];
   // Заполняем массивы
   if (da_elements.length > 0) {
      let number = 0;
      for (let index = 0; index < da_elements.length; index++) {
         const da_element = da_elements[index];
         const da_move = da_element.getAttribute('data-da');
         const da_array = da_move.split(',');
         if (da_array.length == 3) {
            da_element.setAttribute('data-da-index', number);
            // Заполняем массив первоначальных позиций
            original_positions[number] = {
               "parent": da_element.parentNode,
               "index": index_in_parent(da_element)
            }
            // Заполняем массив элементов
            da_elements_array[number] = {
               "element": da_element,
               "destination": document.querySelector('.' + da_array[0].trim()),
               "place": da_array[1].trim(),
               "breakpoint": da_array[2].trim()
            }
            number++;
         }
      }
      dynamic_adapt_sort(da_elements_array);

      // Создаем события в точке брейкпоинта
      for (let index = 0; index < da_elements_array.length; index++) {
         const el = da_elements_array[index];
         const da_breakpoint = el.breakpoint;
         const da_type = "max"; // Для mobile first поменять на min

         da_match_media.push(window.matchMedia("(" + da_type + "-width: " + da_breakpoint + "px)"));
         // da_match_media[index].addListener(dynamic_adapt);
         da_match_media[index].addEventListener('change', dynamic_adapt);

      }
   }
   // Основная функция
   function dynamic_adapt(e) {
      for (let index = 0; index < da_elements_array.length; index++) {
         const el = da_elements_array[index];
         const da_element = el.element;
         const da_destination = el.destination;
         const da_place = el.place;
         const da_breakpoint = el.breakpoint;
         const da_classname = "_dynamic_adapt_" + da_breakpoint;

         if (da_match_media[index].matches) {
            // Перебрасываем элементы
            if (!da_element.classList.contains(da_classname)) {
               let actual_index;
               if (da_place == 'first') {
                  actual_index = index_of_elements(da_destination)[0];
               } else if (da_place == 'last') {
                  actual_index = index_of_elements(da_destination)[index_of_elements(da_destination).length];
               } else {
                  actual_index = index_of_elements(da_destination)[da_place];
               }
               da_destination.insertBefore(da_element, da_destination.children[actual_index]);
               da_element.classList.add(da_classname);
            }
         } else {
            // Возвращаем на место
            if (da_element.classList.contains(da_classname)) {
               dynamic_adapt_back(da_element);
               da_element.classList.remove(da_classname);
            }
         }
      }
      custom_adapt();
   }

   // Вызов основной функции
   dynamic_adapt();

   // Функция возврата на место
   function dynamic_adapt_back(el) {
      const da_index = el.getAttribute('data-da-index');
      const original_place = original_positions[da_index];
      const parent_place = original_place['parent'];
      const index_place = original_place['index'];
      const actual_index = index_of_elements(parent_place, true)[index_place];
      parent_place.insertBefore(el, parent_place.children[actual_index]);
   }
   // Функция получения индекса внутри родителя
   function index_in_parent(el) {
      var children = Array.prototype.slice.call(el.parentNode.children);
      return children.indexOf(el);
   }
   //Функция получения массива индексов элементов внутри родителя
   function index_of_elements(parent, back) {
      const children = parent.children;
      const children_array = [];
      for (let i = 0; i < children.length; i++) {
         const children_element = children[i];
         if (back) {
            children_array.push(i);
         } else {
            // Исключая перенесенный элемент
            if (children_element.getAttribute('data-da') == null) {
               children_array.push(i);
            }
         }
      }
      return children_array;
   }
   // Сортировка объекта
   function dynamic_adapt_sort(arr) {
      arr.sort(function (a, b) {
         if (a.breakpoint > b.breakpoint) { return -1 } else { return 1 } // Для mobile first поменять
      });
      arr.sort(function (a, b) {
         if (a.place > b.place) { return 1 } else { return -1 }
      });
   }
   // Дополнительные сценарии адаптации
   function custom_adapt() {
      const viewport_width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
   }

   // Слушаем изменение экрана
   window.addEventListener('resize', function (event) {

   });
}());;
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

         if (slider.classList.contains('_swiper_scroll')) {
            let sliderScroll = document.createElement('div');
            sliderScroll.classList.add('swiper-scrollbar');
            slider.appendChild(sliderScroll);
         }
      }
      if (slider.classList.contains('_gallery')) {
         // slider.data('lightGallery').destroy(true);
      }
   }
   sliders_bild_callback();
}

function sliders_bild_callback(params) { }

let sliderScrollItems = document.querySelectorAll('._swiper_scroll');
if (sliderScrollItems.length > 0) {
   for (let index = 0; index < sliderScrollItems.length; index++) {
      const sliderScrollItem = sliderScrollItems[index];
      const sliderScrollBar = sliderScrollItem.querySelector('.swiper-scrollbar');
      const sliderScroll = new Swiper(sliderScrollItem, {
         observer: true,
         observeParents: true,
         direction: 'vertical',
         slidesPerView: 'auto',
         freeMode: true,
         scrollbar: {
            el: sliderScrollBar,
            draggable: true,
            snapOnRelease: false
         },
         mousewheel: {
            releaseOnEdges: true,
         },
      });
      sliderScroll.scrollbar.updateSize();
   }
}


function sliders_bild_callback(params) { }

//Build slider END
//=============================
// Init Slider (slider-main__body) START
if (document.querySelector('.slider-main__body')) {
   new Swiper('.slider-main__body', {
      observer: true,
      observeParents: true,
      slidesPerView: 1,
      spaceBetween: 32,
      watchOverflow: true,
      speed: 800,
      loop: true,
      loopAdditionalSlides: 5,
      preloadImages: false,
      parallax: true,
      // Dotts
      pagination: {
         el: '.controls-slider-main__dotts',
         clickable: true,
      },
      // Arrows
      navigation: {
         nextEl: '.slider-main .slider-arrow_next',
         prevEl: '.slider-main .slider-arrow_prev',
      },
   });
}
// Init Slider (slider-main__body) END
//=============================
// Init Slider (slider-rooms__body) START
if (document.querySelector('.slider-rooms__body')) {
   new Swiper('.slider-rooms__body', {
      observer: true,
      observeParents: true,
      slidesPerView: 'auto',
      spaceBetween: 24,
      watchOverflow: true,
      speed: 800,
      loop: true,
      loopAdditionalSlides: 5,
      preloadImages: false,
      parallax: true,
      // Dotts
      pagination: {
         el: '.slider-rooms__dotts',
         clickable: true,
      },
      // Arrows
      navigation: {
         nextEl: '.slider-rooms .slider-arrow_next',
         prevEl: '.slider-rooms .slider-arrow_prev',
      },
   });
}
// Init Slider (slider-rooms__body) END
//=============================
// Init Slider (slider-tips__body) START
if (document.querySelector('.slider-tips__body')) {
   new Swiper('.slider-tips__body', {
      observer: true,
      observeParents: true,
      slidesPerView: 3,
      spaceBetween: 32,
      watchOverflow: true,
      speed: 800,
      loop: true,
      // Dotts
      pagination: {
         el: '.slider-tips__dotts',
         clickable: true,
      },
      // Arrows
      navigation: {
         nextEl: '.slider-tips .slider-arrow_next',
         prevEl: '.slider-tips .slider-arrow_prev',
      },
      breakpoints: {
         320: {
            slidesPerView: 1.1,
            spaceBetween: 15,
         },
         768: {
            slidesPerView: 2,
            spaceBetween: 20,
         },
         992: {
            slidesPerView: 3,
            spaceBetween: 32,
         },
      },
   });
}
// Init Slider (slider-tips__body) END;
/* Действия при клике на  иконке бургера > */
// Добавляет или убирает класс .active при клике на '.icon-menu'
$('.icon-menu').click(function (event) {
	$(this).toggleClass('_active');
	$('.menu__body').toggleClass('_active');
	$('body').toggleClass('lock');
});
/* < Действия при клике на  иконке бургера */

/* Превращает изображение в фон > */
function ibg() {
	$.each($('._ibg'), function(index,val) {
		if ($(this).find('img').length > 0) {
			$(this).css('background-image','url("'+$(this).find('img').attr('src')+'")');
		}
	});
}
ibg();
/* < Превращает изображение в фон */

/* Переключение класса .active при клике на "табсах(tabs)" > */
$('body').on('click','.tab__navitem', function(event) {
	var eq = $(this).index();
	if ($(this).hasClass('parent')) {
		var eq = $(this).parent().index();
	}
	if (!$(this).hasClass('active')) {
		$(this).closest('.tabs').find('.tab__navitem').removeClass('active');
		$(this).addClass('active');
		$(this).closest('.tabs').find('.tab__item').removeClass('active').eq(eq).addClass('active');
		if ($(this).closest('.tabs').find('.slick-slider').length > 0) {
			$(this).closest('.tabs').find('.slick-slider').slick('setPosition');
		}
	}
});
/* < Переключение класса .active при клике на "табсах(tabs)" */

;

window.onload = function () {
   document.addEventListener('click', documentActions);

   // Actions (делегирование события click)
   function documentActions(e) {
      const targetElement = e.target;
      // Для мобильных устройств и на ширине > 768
      // добавляем к элементу '.menu__item' класс '._hover' для открытия подменю,
      // убираем класс '._hover', если клик произошел вне области октрытого подменю
      if (window.innerWidth > 768 && isMobile.any()) {
         if (targetElement.classList.contains('menu__arrow')) {
            targetElement.closest('.menu__item').classList.toggle('_hover');
         }
         if (!targetElement.closest('.menu__item') && document.querySelectorAll('.menu__item._hover').length > 0) {
            _removeClasses(document.querySelectorAll('.menu__item._hover'), "_hover");
         }
      }
      // ================================
      // При клике на иконку лупы, которая у нас появляется только на разрешениях меньше 992px
      // добавляем класс '._active', по которому открывается меню поиска,
      // убираем класс '._active', если клик произошел вне области полосы поиска
      if (targetElement.classList.contains('search-form__icon')) {
         document.querySelector('.search-form').classList.toggle('_active');
      } else if (!targetElement.closest('.search-form') && document.querySelector('.search-form._active')) {
         document.querySelector('.search-form').classList.remove('_active');
      }
      // ================================
      // По клику на кнопку "Show more", будем получать новую порцию товаров - функция getProducts()
      if (targetElement.classList.contains('products__more')) {
         getProducts(targetElement);
         e.preventDefault();
      }
      // ================================
      // По клику на кнопку "Add to cart", будем добавлять товар в корзину.
      // За это будет отвечать функция addToCart()
      if (targetElement.classList.contains('actions-product__button')) {
         const productId = targetElement.closest('.item-product').dataset.pid;
         addToCart(targetElement, productId);
         e.preventDefault();
      }
      // ================================
      // Открываем корзину при клике на ее иконку
      // При клике вне области открывшегося окна с корзиной, закрываем ее
      if (targetElement.classList.contains('cart-header__icon') || targetElement.closest('.cart-header__icon')) {
         if (document.querySelector('.cart-list').children.length > 0) {
            document.querySelector('.cart-header').classList.toggle('_active');
         }
         e.preventDefault();
      } else if (!targetElement.closest('.cart-header') && !targetElement.classList.contains('actions-product__button')) {
         document.querySelector('.cart-header').classList.remove('_active');
      }
      // ================================
      // Отслеживаем нажатие на кнопку Delete в корзине и обновляем корзину
      if (targetElement.classList.contains('cart-list__delete')) {
         const productId = targetElement.closest('.cart-list__item').dataset.cartPid;
         updateCart(targetElement, productId, false);
         e.preventDefault();
      }
   }
   // ================================
   // Шапка
   const headerElement = document.querySelector('.header');
   const callback = function (entries, observer) {
      if (entries[0].isIntersecting) {
         headerElement.classList.remove('_scroll');
      } else {
         headerElement.classList.add('_scroll');
      }
   };
   const headerObserver = new IntersectionObserver(callback);
   headerObserver.observe(headerElement);
   // ================================
   // Подгружаем больше товаров.
   // Класс '._hold' поможет избежать повторных запросов, пока еще не вернулся ответ от сервера по первому запросу.
   // Считываем данные о новых товарах с файла "json/products.json"
   // и передаем их в функцию loadProducts(), которая выведет товары уже на страницу.
   // Чтобы избежать ошибок, связанных с получением новых товаров уже после подгрузки первой партии,
   // просто удалим кнопку "Show More".
   // В реальном проекте товары должны подгружаться порционно и кнопка "Show More" оставаться на странице
   async function getProducts(button) {
      if (!button.classList.contains('_hold')) {
         button.classList.add('_hold');
         const file = "json/products.json";
         let response = await fetch(file, {
            method: "GET"
         });
         if (response.ok) {
            let result = await response.json();
            loadProducts(result);
            button.classList.remove('_hold');
            button.remove();
         } else {
            alert("Ошибка");
         }
      }
   }
   // Функция loadProducts(), которая выведет товары на страницу, полученные из json-файла.
   function loadProducts(data) {
      const productsItems = document.querySelector('.products__items');
      data.products.forEach(item => {
         const productId = item.id;
         const productUrl = item.url;
         const productImage = item.image;
         const productTitle = item.title;
         const productText = item.text;
         const productPrice = item.price;
         const productOldPrice = item.priceOld;
         const productShareUrl = item.shareUrl;
         const productLikeUrl = item.likeUrl;
         const productLabels = item.labels;

         let productTemplateStart = `<article data-pid="${productId}" class="products__item item-product">`;
         let productTemplateEnd = `</article>`;

         let productTemplateLabels = '';
         if (productLabels) {
            let productTemplateLabelStart = `<div class="item-product__labels">`;
            let productTemplateLabelEnd = `</div>`;
            let productTemplateLabelContent = '';

            productLabels.forEach(labelItem => {
               productTemplateLabelContent += `<div class="item-product__label item-product__label_${labelItem.type}">${labelItem.value}</div>`;
            });

            productTemplateLabels += productTemplateLabelStart;
            productTemplateLabels += productTemplateLabelContent;
            productTemplateLabels += productTemplateLabelEnd;
         }

         let productTemplateImage = `<a href="${productUrl}" class="item-product__image _ibg"><img src="img/products/${productImage}" alt="${productTitle}"></a>`;

         let productTemplateBodyStart = `<div class="item-product__body">`;
         let productTemplateBodyEnd = `</div>`;

         let productTemplateContent = `
         <div class="item-product__content">
            <div class="item-product__title">${productTitle}</div>
            <div class="item-product__text">${productText}</div>
         </div>
         `;

         let productTemplatePrices = '';
         let productTemplatePricesStart = `<div class="item-product__prices">`;
         let productTemplatePricesCurrent = `<div class="item-product__price">Rp ${productPrice}</div>`;
         let productTemplatePricesOld = `<div class="item-product__price item-product__price_old">Rp ${productOldPrice}</div>`;
         let productTemplatePricesEnd = `</div>`;

         productTemplatePrices = productTemplatePricesStart;
         productTemplatePrices += productTemplatePricesCurrent;
         if (productOldPrice) {
            productTemplatePrices += productTemplatePricesOld;
         }
         productTemplatePrices += productTemplatePricesEnd;

         let productTemplateActions = `
         <div class="item-product__actions actions-product">
            <div class="actions-product__body">
               <a href="" class="actions-product__button btn btn_white">Add to cart</a>
               <a href="${productShareUrl}" class="actions-product__link _icon-share">Share</a>
               <a href="${productLikeUrl}" class="actions-product__link _icon-favorite">Like</a>
            </div>
         </div>
         `;

         let productTemplateBody = '';
         productTemplateBody += productTemplateBodyStart;
         productTemplateBody += productTemplateContent;
         productTemplateBody += productTemplatePrices;
         productTemplateBody += productTemplateActions;
         productTemplateBody += productTemplateBodyEnd;

         let productTemplate = '';
         productTemplate += productTemplateStart;
         productTemplate += productTemplateLabels;
         productTemplate += productTemplateImage;
         productTemplate += productTemplateBody;
         productTemplate += productTemplateEnd;

         productsItems.insertAdjacentHTML('beforeend', productTemplate);
      });
   }
   // ================================
   // Добавление товара в корзину
   function addToCart(productButton, productId) {

      if (!productButton.classList.contains('_hold')) {
         productButton.classList.add('_hold');
         productButton.classList.add('_fly');

         const cart = document.querySelector('.cart-header__icon');
         const product = document.querySelector(`[data-pid="${productId}"]`);
         const productImage = product.querySelector('.item-product__image');
         // создаем клон картинки товара, которая потом будет лететь в корзину
         const productImageFly = productImage.cloneNode(true);
         // получаем размеры и координаты картинки товара
         const productImageFlyWidth = productImage.offsetWidth;
         const productImageFlyHeight = productImage.offsetHeight;
         const productImageFlyTop = productImage.getBoundingClientRect().top;
         const productImageFlyLeft = productImage.getBoundingClientRect().left;
         // Применение полученных размеров для созданного клона Fly?
         // а также перезаписываем его классы на новые: '_flyImage _ibg'
         productImageFly.setAttribute('class', '_flyImage _ibg');
         productImageFly.style.cssText = `
            left: ${productImageFlyLeft}px;
            top: ${productImageFlyTop}px;
            width: ${productImageFlyWidth}px;
            height: ${productImageFlyHeight}px;
         `;
         // Выводим полученный клон в конец тега body
         document.body.append(productImageFly);
         // Получаем координаты корзины
         const cartFlyLeft = cart.getBoundingClientRect().left;
         const cartFlyTop = cart.getBoundingClientRect().top;
         // Отправляем картинку в полет в корзину, задавая ей новые координаты и размеры
         productImageFly.style.cssText = `
            left: ${cartFlyLeft}px;
            top: ${cartFlyTop}px;
            width: 0px;
            height: 0px;
            opacity: 0;
         `;
         // Слушаем события "долёта" клона с картинкой до корзины.
         // В конце прилета удаляем созданный клон,
         // отправляем нужные данные в функцию updateCart() для формирования содержимого корзины,
         // удаляем класс '_fly' у кнопки
         productImageFly.addEventListener('transitionend', function () {
            if (productButton.classList.contains('_fly')) {
               productImageFly.remove();
               updateCart(productButton, productId);
               productButton.classList.remove('_fly');
            }
         });
      }
   }
   // Формирование корзины (ее обновление)
   function updateCart(productButton, productId, productAdd = true) {
      const cart = document.querySelector('.cart-header');
      const cartIcon = cart.querySelector('.cart-header__icon');
      const cartQuantity = cartIcon.querySelector('span');
      const cartProduct = document.querySelector(`[data-cart-pid="${productId}"]`);
      const cartList = document.querySelector('.cart-list');

      // Товар добавляется на ветке условия true
      // Товар удаляется на ветке условия false
      if (productAdd) {
         if (cartQuantity) {
            cartQuantity.innerHTML = ++cartQuantity.innerHTML;
         } else {
            cartIcon.insertAdjacentHTML('beforeend', `<span>1</span>`);
         }

         if (!cartProduct) {
            const product = document.querySelector(`[data-pid="${productId}"]`);
            const cartProductImage = product.querySelector('.item-product__image').innerHTML;
            const cartProductTitle = product.querySelector('.item-product__title').innerHTML;
            const cartProductContent = `
               <a href="" class="cart-list__image _ibg">${cartProductImage}</a>
               <div class="cart-list__body">
                  <a href="" class="cart-list__title">${cartProductTitle}</a>
                  <div class="cart-list__quantity">Quantity: <span>1</span></div>
                  <a href="" class="cart-list__delete">Delete</a>
               </div>
            `;
            cartList.insertAdjacentHTML('beforeend', `<li data-cart-pid="${productId}" class="cart-list__item">${cartProductContent}</li>`);
         } else {
            const cartProductQuantity = cartProduct.querySelector('.cart-list__quantity span');
            cartProductQuantity.innerHTML = ++cartProductQuantity.innerHTML;
         }
         // Убираем класс '._hold' по окончании
         productButton.classList.remove('_hold');
      } else {
         const cartProductQuantity = cartProduct.querySelector('.cart-list__quantity span');
         cartProductQuantity.innerHTML = --cartProductQuantity.innerHTML;
         if (!parseInt(cartProductQuantity.innerHTML)) {
            cartProduct.remove();
         }

         const cartQuantityValue = --cartQuantity.innerHTML;

         if (cartQuantityValue) {
            cartQuantity.innerHTML = cartQuantityValue;
         } else {
            cartQuantity.remove();
            cart.classList.remove('_active');
         }
      }
   }
   // ================================
   // Галерея
   const furniture = document.querySelector('.furniture__body');
   if (furniture && !isMobile.any()) {
      const furnitureItems = document.querySelector('.furniture__items');
      const furnitureColumn = document.querySelectorAll('.furniture__column');
      // Скорость анимации
      const speed = furniture.dataset.speed;
      // Объявление переменных
      let positionX = 0;
      let coordXprocent = 0;

      function setGalleryMouseStyle() {
         let furnitureItemsWidth = 0;
         furnitureColumn.forEach(element => {
            furnitureItemsWidth += element.offsetWidth;
         });

         const furnitureDifferent = furnitureItemsWidth - furniture.offsetWidth;
         const distX = Math.floor(coordXprocent - positionX);

         positionX = positionX + (distX * speed);
         let position = furnitureDifferent / 200 * positionX;

         furnitureItems.style.cssText = `transform: translate3d(${-position}px,0,0);`;

         if (Math.abs(distX) > 0) {
            requestAnimationFrame(setGalleryMouseStyle);
         } else {
            furniture.classList.remove('_init');
         }
      }
      furniture.addEventListener('mousemove', function (e) {
         // Получение ширины
         const furnitureWidth = furniture.offsetWidth;

         // Ноль посередине
         const coordX = e.pageX - furnitureWidth / 2;

         // Получаем проценты
         coordXprocent = coordX / furnitureWidth * 200;

         if (!furniture.classList.contains('_init')) {
            requestAnimationFrame(setGalleryMouseStyle);
            furniture.classList.add('_init');
         }
      });
   }
}