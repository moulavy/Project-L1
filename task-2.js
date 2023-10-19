//2
/* Задача о странных числах: Напишите функцию, которая принимает число и возвращает true, 
если это число является странным, и false в противном случае. Странным числом считается 
число, которое равно сумме всех своих делителей, кроме самого себя.*/

function isStrangeNumber(value) {
   //Заводим переменную суммы
   let sum = 0;
   //Проходимся 
   for (let i = 1; i < value; i++){
      if (value % i === 0) {
         sum += i;
      }
   }
   return (value===sum)
}
console.log(isStrangeNumber(6))//true, 6=1+2+3
console.log(isStrangeNumber(12))//false
