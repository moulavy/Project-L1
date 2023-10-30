/*
21.	Вычислить размер коллстэка в основных браузерах: Chrome, Firefox, Opera и Safari (если есть возможность).
*/

//Проверим размер колстека через глубину вызова рекурсии. Как только вылетит ошибка - значит стек переполнился.
let callStackSize = 0;

function recursiveFunction() {
   callStackSize++;
   recursiveFunction();
}

try {
   recursiveFunction();
} catch (error) {
   console.error('Максимальный размер коллстека:', callStackSize);
   callStackSize = 0;
}

//Google Chrome:24498 вызовов
//Opera: 13941 вызовов
//FireFox: 12398 вызовов

/* Из источника https://habr.com/ru/articles/550534/ размер Execution Stack приблизительно 72 байта

//Google Chrome:24498 вызовов=1763856=1,7Мбайт
//Opera: 13941 вызовов=1003752байт=1Мбайт
//FireFox: 12398 вызовов=892656байт=892Кбайт
*/




