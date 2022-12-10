"use strict"
// Получаем массив всех рейтингом на странице с классом '.rating'
const ratings = document.querySelectorAll('.rating');
// Если такие существуют, выполняем основную функцию initRatings()
if (ratings.length > 0) {
   initRatings()
}
// Основная функция
function initRatings() {
   // ratingActive - отвечает за желтую полоску заполнения
   let ratingActive;
   // ratingValue - отвечает за цифровой вывод результата
   let ratingValue;
   // Бегаем по всем рейтингам на странице
   // и с каждым рейтингом делаем определенные действия
   for (let index = 0; index < ratings.length; index++) {
      const rating = ratings[index];
      initRating(rating);
   }
   // Инициализация конкретного рейтинга
   function initRating(rating) {
      initRatingVars(rating);
      setRatingActiveWidth();
      // Если у текущего рейтинга есть модификатор '.rating_set',
      // то выполняем дополнительно функцию setRating(rating)
      if (rating.classList.contains('rating_set')) {
         setRating(rating);
      }
   }

   // Инициализация переменных ratingActive, ratingValue
   function initRatingVars(rating) {
      ratingActive = rating.querySelector('.rating__active');
      ratingValue = rating.querySelector('.rating__value');
   }

   // Изменяет ширину активных звезд
   // В функцию передается число рейтинга index и на основании
   // этого числа будет заполняться прогресс звезд
   // Начальное значение index берется из HTML
   // В зависимости от значения index вычисляется ширина заполнения
   function setRatingActiveWidth(index = ratingValue.innerHTML) {
      const ratingActiveWidth = index / 0.05;
      ratingActive.style.width = `${ratingActiveWidth}%`;
   }

   // Возможность указывать оценку
   function setRating(rating) {
      // Получаем массив радиокнопок конкретного рейтинга
      const ratingItems = rating.querySelectorAll('.rating__item');
      // Бегаем по радиокнопкам и вешаем на них события
      for (let index = 0; index < ratingItems.length; index++) {
         const ratingItem = ratingItems[index];
         // Заполняет звезды в реальном времени, когда мышь наводится на звезды
         ratingItem.addEventListener('mouseenter', function (e) {
            initRatingVars(rating);
            setRatingActiveWidth(ratingItem.value);
         });
         // Возвращает изначальное значение заполнения,
         // если например передумали и просто уводим мышь со звезд
         ratingItem.addEventListener('mouseleave', function (e) {
            setRatingActiveWidth();
         });
         ratingItem.addEventListener('click', function (e) {
            initRatingVars(rating);
            if (rating.dataset.ajax) {
               // "Отправить" на сервер
               setRatingValue(ratingItem.value, rating);
            } else {
               // Отобразить указанную оценку
               // в зависимости от кликнутой звезды
               ratingValue.innerHTML = index + 1;
               setRatingActiveWidth();
            }
         });
      }
   }

   async function setRatingValue(value, rating) {
      // Класс '.rating_sending' предотвращает
      // повторную отправку данных, если еще
      // ответ с сервера не пришел обратно из первой отправки
      // У нас нет сервера, поэтому используем файл rating.json, в котором
      // будет как будто бы среднее значение оценки, которое хрпанится на сервере
      // Закомментированный блок как раз нужен, если будет реальная отправка на сервер
      if (!rating.classList.contains('rating_sending')) {
         rating.classList.add('rating_sending');

         // Отправка данных value на сервер
         let response = await fetch('rating.json', {
            method: 'GET',

            // body: JSON.stringify({
            //    userRating: value
            // }),
            // headers: {
            //    'content-type': 'application/json'
            // }

         });
         if (response.ok) {
            const result = await response.json();

            // Получаем новый рейтинг
            const newRating = result.newRating;

            // Вывод нового среднего результата
            ratingValue.innerHTML = newRating;

            // Обновление активных звезд
            setRatingActiveWidth();

            rating.classList.remove('rating_sending');
         } else {
            alert("Ошибка");
            rating.classList.remove('rating_sending');
         }
      }
   }
}

