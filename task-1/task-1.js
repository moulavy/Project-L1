//palindrom
/*Задача о палиндроме: напишите функцию, которая проверяет,
 является ли заданная строка палиндромом.
 Палиндром — это строка, которая читается одинаково 
 в обоих направлениях(например, «аргентина манит негра»).*/

function isPalindrome(value) {
   //Проверяем на тип, превращаем в строку при типе number
   if (typeof value === 'number') {
      value = value.toString();
      console.log(typeof (str))
   }
   //Переводим в нижний регистр и превращаем в массив
   let arr = value.toLowerCase().split('');
   //Убираем пробелы и знаки препинания
   let filterArr = arr.filter(function (item) {
      if (item !== ' ') {
         return item;
      }
   })
   //Строка без пробелов
   let strWithoutSpace = filterArr.join('');
   //Сравнение строк, если строки равны, то возвращаем true, иначе false
   if (strWithoutSpace === filterArr.reverse().join('')) {
      return true;
   }
   else {
      return false
   }
}
console.log(isPalindrome('moli nan ilom')); //true
console.log(isPalindrome('create react app')); //false
console.log(isPalindrome(123321));//true
console.log(isPalindrome(1231234));//false