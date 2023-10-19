/*3
Реализовать аналог библиотеки Math(можно назвать MathX) с базовым набором функций, используя замыкания:
вычисление N - го числа в ряду Фибоначчи Ф
вычисление всех чисел в ряду Фибоначчи до числа N
вычисление N - го просто числа
вычисление всех простых чисел до числа N
*/
 function MathX() {
    function simpleNumber(number) {
       if (number <= 1) return false;
       for (let i = 2; i < number; i++) {
          if (number % i === 0) return false;
       }
       return true;
   }
   return {
      fibonacci: function (n) {
         let fib = [0,1];
         for (let i = 2; i <= n; i++) {
            fib[i] = fib[i-1] + fib[i - 2];
         }
         return fib[n];
      },
      fibonacciArray: function (n) {
         let fibArr = [0, 1];
         for (let i = 2; i <= n; i++) {
            fibArr[i] = fibArr[i - 1] + fibArr[i - 2];
         }
         return fibArr.join(' ');
      },
      nSimple: function (n) {
         let arrSimple = [];
         let i = 1;
         while(arrSimple.length<n){
            if (simpleNumber(i)) {
               arrSimple.push(i);               
            }
            i++;
         }
         return arrSimple[n-1];
      },
      allSimple: function (n) {
         let arrSimple = [];
         let i = 1;
         while (i<=n) {
            if (simpleNumber(i)) {
               arrSimple.push(i);
            }
            i++;
         }
         return arrSimple.join(' ');
      }
   };
};
let rez = MathX();
console.log(rez.fibonacci(9)); // 34
console.log(rez.fibonacciArray(5)); // 0 1 1 2 3 5
console.log(rez.nSimple(7)); // 17
console.log(rez.allSimple(17)); // 2 3 5 7 11 13 17


