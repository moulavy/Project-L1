// 27.	Задача: Добавить анимацию для элемента: Напишите функцию,
//    которая добавляет анимацию для элемента на веб - странице, например,
//       плавное изменение его положения или размера.


function moveAnimation() {
   //получаем блок который будет двигаться
   let element = document.querySelector('.block');
   //для top и left
   let position = 0;
   let direction = -1; // Направление движения: 1 - вперед, -1 - назад
   let animation = setInterval(frame, 5);//повторение

   function frame() {
      if (position === 750 || position === 0) {
         // Если элемент достиг края контейнера (750 пикселей) или начальной позиции (0 пикселей), меняем направление движения
         direction *= -1;
      }
      // Обновляем позицию элемента в зависимости от направления движения
      position += direction;
      element.style.top = position + 'px';
      element.style.left = position + 'px';
   }
}
