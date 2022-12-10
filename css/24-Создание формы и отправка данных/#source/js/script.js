@@include("functions.js");
@@include("select.js");
"use strict"

document.addEventListener('DOMContentLoaded', function () {
   const form = document.getElementById('form');
   form.addEventListener('submit', formSend);

   // Отправка формы
   async function formSend(e) {
      e.preventDefault();
      // В переменную error получаем кол-во ошибок в форме
      let error = formValidate(form);
      // В переменную formData получаем значения всех полей и заодно загруженный файл
      let formData = new FormData(form);
      formData.append('image', formImage.files[0]);
      if (error === 0) {
         // Если ошибок нет, то будем отправлять форму
         // Отправка формы может занять некоторое время,
         // Поэтому для стилизации добавляем к форме класс '._sending'
         form.classList.add('_sending');
         // Отправляем данные в файл sendmail.php, обратно получаем JSON-ответ
         let response = await fetch('sendmail.php', {
            method: 'POST',
            body: formData
         });
         // Ожидаем ответ отправки
         // Если всё OK, выводим сообщение об успехе и очищаем поля формы
         // Иначе выводим ошибку
         if (response.ok) {
            let result = await response.json();
            alert(result.message);
            formPreview.innerHTML = '';
            form.reset();
            form.classList.remove('_sending');
         } else {
            alert('Ошибка');
            form.classList.remove('_sending');
         }
      } else {
         alert('Заполните обязательные поля');
      }
   }
   // Валидация полей формы (возвращает количество ошибок)
   function formValidate(form) {
      let error = 0;
      const formReq = document.querySelectorAll('._req');
      for (let index = 0; index < formReq.length; index++) {
         const input = formReq[index];
         formRemoveError(input);

         if (input.classList.contains('_email')) {
            if (emailTest(input)) {
               formAddError(input);
               error++;
            }
         } else if (input.getAttribute("type") === "checkbox" && input.checked === false) {
            formAddError(input);
            error++;
         } else {
            if (input.value === '') {
               formAddError(input);
               error++;
            }
         }
      }
      return error;
   }
   // Добавляет класс '._error' самому объекту и его родителю
   function formAddError(input) {
      input.parentElement.classList.add('_error');
      input.classList.add('_error');
   }
   // Убирает класс '._error' у самомго объекта и его родителя
   function formRemoveError(input) {
      input.parentElement.classList.remove('_error');
      input.classList.remove('_error');
   }
   // Тест Email
   function emailTest(input) {
      return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
   }
   // Находим объекты: Поле ввода изображения и div, куда будем выводить первью
   const formImage = document.getElementById('formImage');
   const formPreview = document.getElementById('formPreview');
   formImage.addEventListener('change', () => {
      uploadFile(formImage.files[0]);
   });
   // Вывод загруженного файла в div-превью
   function uploadFile(file) {
      // Проверяем тип файла
      if (!['image/jpeg', 'image/png', 'image/gif'].includes(file.type)) {
         alert('Разрешены только изображения');
         formImage.value = '';
         return;
      }
      // Проверяем размер файла (< 5 Мб)
      if (file.size > 5 * 1024 * 1024) {
         alert('Файл должен быть менее 2 Мб');
         return;
      }
      // Если проверка на размер и тип пройдена, выводим в превью
      var reader = new FileReader();
      reader.onload = function (e) {
         formPreview.innerHTML = `<img src="${e.target.result}" alt="Фото">`;
      }
      reader.onerror = function (e) {
         alert('Ошибка');
      }
      reader.readAsDataURL(file);
   }
});