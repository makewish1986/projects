@@include("functions.js");
@@include("dynamic_adapt.js");
@@include("sliders.js");
@@include("script_main.js");

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