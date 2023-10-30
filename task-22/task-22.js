let max = 0; // Переменная для отслеживания максимального количества вызовов document.write()

function recursiveDocumentWrite() {
   try {
      max++; // Увеличиваем счетчик каждый раз, когда вызывается document.write()
      document.write('<div>Текст</div>'); // Пишем текст в документ
      recursiveDocumentWrite(); // Рекурсивный вызов функции
   } catch (error) {
      console.log('Максимальное количество раз:', max);
      console.error('Произошла ошибка:', error);
   }
}

recursiveDocumentWrite();


