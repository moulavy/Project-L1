// 15.	Задача на асинхронность:
// напишите асинхронную функцию, которая использует ключевое слово await для ожидания
// выполнения других асинхронных операций, и возвращает результат выполнения.
//функция которая возвращает промис
function delay(ms) {
   return new Promise((resolve) => {
      setTimeout(resolve,ms)
   })
}

async function asyncFunction() {
   console.log('Начало');
   //благодаря await будет дожидаться выполнения асинхронной функции
   await delay(1000);
   console.log('Прошла 1 секунда');
   await delay(500);
   console.log('Прошло еще пол секунды');
   
}
asyncFunction()
  