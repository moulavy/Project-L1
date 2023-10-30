/*
Реализовать аналог библиотеки Math(можно назвать MathX) с базовым набором функций, используя замыкания:
вычисление N - го числа в ряду Фибоначчи Ф
вычисление всех чисел в ряду Фибоначчи до числа N
вычисление N - го просто числа
вычисление всех простых чисел до числа N
*/
//Создаем библиотеку MathX. Используем замыкание для создания приватных функций и переменных.
function MathX() {
   //Приватная функция simpleNumber - проверяет, является ли число простым.
   function simpleNumber(number) {
      //Если меньше или равно 1 - не является простым
      if (number <= 1) return false;
      //Если имеет больше двух делителей(1 и себя самого) - не является простым
      for (let i = 2; i < number; i++) {
         if (number % i === 0) return false;
      }
      return true;
   }
   return {
      //Запоминаем значения ряда Фибоначи в массив. Изначально там хранится 0 и 1. 
      //Каждый следующий элемент - сумма двух предыдущих. Возвращаем n-й элемент ряда.
      fibonacci: function (n) {
         let fib = [0, 1];
         for (let i = 2; i <= n; i++) {
            fib[i] = fib[i - 1] + fib[i - 2];
         }
         return fib[n];
      },
      //Аналогично. Возвращаем ряд.
      fibonacciArray: function (n) {
         let fib = [0, 1];
         for (let i = 2; i <= n; i++) {
            fib[i] = fib[i - 1] + fib[i - 2];
         }
         return fib.join(' ');
      },
      //Вычисление n-го простого числа.
      nSimple: function (n) {
         let arrSimple = [];
         let i = 1;
         //Проходимся циклом, пока количество простых не станет равно заданному n.         
         while (arrSimple.length < n) {
            //Если число простое - добавляем в массив простых чисел.
            if (simpleNumber(i)) {
               arrSimple.push(i);
            }
            i++;
         }
         //Возвращаем последнее число
         return arrSimple[n - 1];
      },
      allSimple: function (n) {
         let arrSimple = [];
         let i = 1;
         //Проверяем числа на простоту до числа n
         while (i <= n) {
            if (simpleNumber(i)) {
               arrSimple.push(i);
            }
            i++;
         }
         //Возвращаем список простых чисел
         return arrSimple.join(' ');
      }
   };
};
//Создаем объект, который имеет публичные методы. Публичные методы имеют доступ к приватным переменным и функциям.
let rez = MathX();
console.log(rez.fibonacci(9)); // 34
console.log(rez.fibonacciArray(5)); // 0 1 1 2 3 5
console.log(rez.nSimple(7)); // 17
console.log(rez.allSimple(17)); // 2 3 5 7 11 13 17


