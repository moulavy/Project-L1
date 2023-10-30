/*6.	Задача о сортировке объектов: у вас есть массив объектов вида { name: 'John', age: 25 }. 
Напишите код, который сортирует этот массив по возрастанию 	возраста,
а при равных возрастах сортирует по алфавиту по полю name.*/

arrObj = [
   { name: 'John', age: 25 },
   { name: 'Kate', age: 20 },
   { name: 'Aznna', age: 22 },
   { name: 'Aarol', age: 22 },
   { name: 'Bob', age: 89 }
]
console.log('Исходный массив: ', arrObj)
//Сортировка встроенным методом sort
let arrSort = [...arrObj];
arrSort.sort(function (a, b) {
   //проверяем, не равны ли age
   if (a.age !== b.age) {
      //если в sort поступает отрицательное число - элементы меняются(становятся по возрастанию)
      return a.age - b.age;
   }
   //иначе сравниваем по имени при помощи функции localeCompare, которая так же возвращает отрицательное, если a.name идет перед b.name
   //если отрицательное - элементы меняются
   else {
      return a.name.localeCompare(b.name);
   }
});
console.log('Сортировка встроенным методом sort: ', arrSort);


//Сортировка пузырьком. Функция принимает на вход массив и функцию сравнения.
function bubbleSort(arr, comparer) {
   //проходимся по массиву двумя циклами - каждый раз сравнивая два элемента
   for (let i = 0; i < arr.length; i++) {
      for (let j = i + 1; j < arr.length; j++) {
         //если текущий элемент a[j] меньше a[i], то меняем элементы местами
         //и так a[i] сравнивается со всеми числами после него до конца массива
         if (comparer(arr[j], arr[i])) {
            let temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
         }
      }
   }
   return arr;
}

console.log('Сортировка пузырьком:', bubbleSort([...arrObj], function (a, b) {
   if (a.age !== b.age) {
      return a.age < b.age;
   }
   else {
      if (a.name.localeCompare(b.name)) {
         return true;
      }
      else return false;
   }
}));
