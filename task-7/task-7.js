/*7.	Задача о коллекции функций: у вас есть массив функций, напишите код, который вызовет каждую функцию в этом массиве и выведет их порядковый номер. Однако, вызов каждой функции должен происходить только после вызова предыдущей функции.
Другими словами, нужно выполнить следующие шаги:
a.	Вызвать первую функцию из массива.
b.	После завершения работы первой функции вызвать вторую функцию.
c.	После завершения работы второй функции вызвать третью функцию.
d.	И так далее, пока все функции в массиве не будут вызваны по порядку.
*/

let arr = [function one() { console.log('я первая') }, function two() { console.log('я вторая') }, function three() { console.log('я третья') }]
function collection(arr) {
   for (let i = 0; i < arr.length; i++)
   {
      console.log(i+1,' - ')
      arr[i]();
   }
}
collection(arr);

/*
Для асинхронных функций:
Если не указать async await в нашей функции, то сначала выполнятся все синхронные операции, а затем асинхронные.
*/
//Функция возращает промис
function delay(ms) {
   return new Promise(resolve => setTimeout(resolve, ms));
}

let arrAsync = [
   async function one() {
      console.log('one');
      await delay(2000);
      console.log('oneone')
   },
   async function two() {
      console.log('two');
      await delay(1000);
      console.log('two two')
   },
   async function three() {
      console.log('three');
      await delay(1500);
      console.log('threee')
   },
];

async function asyncFun(arr) {
   for (let i = 0; i < arr.length; i++) {
      console.log(i + 1, ' - ');
      // После вызова каждой функции она ждет, пока выполнится промис внутри функции.
     // После выполнения промиса функция выполняется дальше.
      await arr[i]();
   }
}

asyncFun(arrAsync);

