/*25.	Задача: Создать и добавить стиль для элемента: Напишите функцию, которая создает новый элемент,
 добавляет его в DOM и устанавливает для него стиль с помощью CSS.
 */
function createElementStyle(tagName, text, styles) {
   //создаем новый элемент с указанным тегом
   const newElement = document.createElement(tagName);
   //устанавливаем текстовое содержимое
   newElement.textContent = text;
   //проходимся по всем ключам объекта и устанавливаем стили по ключу
   for (let key in styles) {
      newElement.style[key] = styles[key];
   }
   //добавляем созданный элемент в конец тела body
   document.body.appendChild(newElement);
}
const stylesBlock = {
   color: 'red',
   fontSize: '30px',
   width: '500px',
   height: '400px',
   backgroundColor: "blue"
}
createElementStyle('div', 'Я новый элемент', stylesBlock);