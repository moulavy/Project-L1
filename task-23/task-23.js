// 23.	Анализатор сложности пароля: создайте функцию, которая оценивает сложность введенного пользователем пароля.
//       Необходимо анализировать длину пароля, использование различных символов,
//       наличие чисел и букв в разных регистрах.Выведите пользователю оценку сложности пароля и предложите улучшения, если пароль слишком слабый.

const form = document.querySelector('.form');
const password = form.querySelector('.password-input');
const message = form.querySelector('.message');
const btn = form.querySelector('.btn');

function analyzerPassword(password) {
   // проверка длины пароля
   if (password.length < 8) {
      return "Пароль слишком короткий. Используйте как минимум 8 символов.";
   }
   // проверка наличия букв в разных регистрах и цифр
   let lowerCase = /[a-z]/.test(password);
   let upperCase = /[A-Z]/.test(password);
   let numbers = /\d/.test(password);
   let specialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);//проверка на специальный символ
   if (lowerCase && upperCase && numbers && specialChars) {
      return "Ура! У вас сильный пароль!";      
   }
   return "Слишком слабый пароль. Его легко взломать. Пароль должен содержать латинские буквы в разных регистрах, цифры и специальные символы.";
}
//вешаем обработчик на кнопку
btn.addEventListener('click', function (e) {
   e.preventDefault();//отменяем действие по умолчанию
let res=analyzerPassword(password.value);
   message.textContent = res;
})

