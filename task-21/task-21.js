/*
21.	Вычислить размер коллстэка в основных браузерах: Chrome, Firefox, Opera и Safari (если есть возможность).
*/

//Проверим размер колстека через глубину вызова рекурсии. Как только вылетит ошибка - значит стек переполнился.
let callStackSize = 0;
function recursiveFunction() {   
   try {
      callStackSize++;
      recursiveFunction();
   } catch (error) {
      console.error('Максимальный размер коллстека:', callStackSize);
   }
}

recursiveFunction();

//Яндекс Браузер: 8958 вызовов
//Google Chrome:15449 вызовов
//Opera: 8962 вызовов

/* Из источника https://habr.com/ru/articles/550534/ размер Execution Stack приблизительно 72 байта

//Яндекс Браузер: 8958 вызовов=644976 байт=629Кбайт
//Google Chrome:15449 вызовов=1112328=1Мбайт
//Opera: 8962 вызовов=645264байт=630Кбайт
*/




