/*
8.	Задача о замыканиях: напишите функцию, которая будет принимать массив функций и возвращать новую функцию, 
которая вызывает каждую функцию в этом массиве и возвращает массив результатов, полученных после вызова каждой функции.
*/
let arrFun = [function one() { return 1; }, function two() { return 2; }, function three() { return 3; }]

//Функция которая принимает в себя массив функций arrFun. В функции создаем массив, в котором будем хранить результаты вызовов функций.
function rezArrFun(arrFun) {
  let arr = [];
  return function inner() {
    //проходимся по всему массиву
    arrFun.forEach(element => {
      //добавляем в массив результат вызова
      arr.push(element())
    });
    return arr;
  }
}

const output = rezArrFun(arrFun);
console.log(output())