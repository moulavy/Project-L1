// Получаем элементы из DOM
const form = document.querySelector('.form'); // Форма, с которой мы будем взаимодействовать
const print = document.querySelector('.print'); // Элемент, куда будем выводить данные из формы
const data = print.querySelector('.data'); // Элемент, в котором будут отображаться данные
const name = form.querySelector('.name'); // Поле ввода имени
const surname = form.querySelector('.surname'); // Поле ввода фамилии
const email = form.querySelector('.email'); // Поле ввода email
const close = document.querySelector('.close'); // Кнопка закрытия модального окна

// Вешаем обработчик на отправку формы
form.addEventListener('submit', function (event) {
   event.preventDefault(); // Предотвращаем стандартное поведение формы при отправке

   // Показываем модальное окно
   print.classList.add('open');

   // Проверяем, заполнены ли все поля формы
   if (name.value !== '' && surname.value !== '' && email.value !== '') {
      // Если все поля заполнены, выводим сообщение с данными в модальном окне
      print.querySelector('.modal-title').textContent = "Спасибо за регистрацию, " + name.value;
      print.querySelector('.info').textContent = "Вы зарегистрированы в системе с данными: ";
      data.textContent = "Имя: " + name.value + ", Фамилия: " + surname.value + ', Email: ' + email.value;
   } else {
      // Если какое-то из полей не заполнено, выводим сообщение о незаполненных полях
      data.textContent = 'Пожалуйста, заполните все поля.';
   }
});

// Вешаем обработчик на кнопку закрытия модального окна
close.addEventListener('click', function () {
   form.reset(); // Очищаем значения полей формы
   print.classList.remove('open'); // Скрываем модальное окно
   print.querySelector('.modal-title').textContent = ""; // Очищаем заголовок модального окна
   print.querySelector('.info').textContent = ""; // Очищаем информационный блок модального окна
});
