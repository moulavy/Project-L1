//Нам необходимо найти такое число, при котором будет ошибка переполнения localStorage
//Обычным поиском, где я бы прибалвляла 1 пока не вылетела ошибка браузеру нужно было бы сделать 5миллионов действий(браузер просто зависал)
//На помощь пришел бинарный поиск, который каждый раз исключает половину неподходящих чисел.
localStorage.removeItem('test');
function getMaxLocalStorageSize() {
   let low = 1; // Минимальный размер данных(1байт)
   let high = Number.MAX_SAFE_INTEGER; // Максимально возможный размер данных
   // Продолжаем бинарный поиск, пока минимальный размер не станет больше или равен максимальному
   while (low <= high) {
      const mid = Math.floor((low + high) / 2); // Средний размер данных
      try {
         const data = new Array(mid).join('a');//Создаем строку размером mid байт
         localStorage.setItem('test', data);//Записываем данные в localStorage
         low = mid + 1; // Увеличиваем минимальный размер данных
      } catch (error) {
         high = mid - 1; // Уменьшаем размер данных, так как произошла ошибка переполнения
      }
   }
   localStorage.removeItem('test');
   return high;
}


//console.log(`Максимальный объем данных в localStorage: ${maxLocalStorageSize} байт`);


//Размер localStorage 5242877 байт(5мб)