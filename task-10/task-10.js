/*
10.	Реализовать функцию конвертации строки в JSON со всеми необходимыми проверками и валидациями.
*/
function newStringToJson(jsonString) {
   let index = 0;//Переменная которая будет идти по нашей строке
   //Функция парсинга объекта
   function parseObject() {
      const obj = {};//Создаем объект
      index++; // Пропускаем открывающую фигурную скобку
      //Пока не дойдем до закрывающей скобки
      while (jsonString[index] !== '}') {
         const key = parseString();//Для ключа вызываем функцию парсинга строки
         index++; // Пропускаем двоеточие
         const value = parseValue();//Для значения вызываем общую функцию парсинга
         obj[key] = value;//Записываем в объект ключ значение
         if (jsonString[index] === ',') {
            index++; // Пропускаем запятую ','
         }
      }
      index++; // Пропускаем закрывающую фигурную скобку '}'
      return obj;
   }

   //Функция парсинга массива
   function parseArray() {
      const arr = [];//Создаем массив
      index++; // Пропускаем открывающую квадратную скобку '['
      //Идем пока не встретится закрывающаяся скобка
      while (jsonString[index] !== ']') {
         const value = parseValue();//Парсим значение массива общей функцией парсинга
         arr.push(value);//Добавляем значение в массив методом push
         if (jsonString[index] === ',') {
            index++; // Пропускаем запятую ','
         }
      }
      index++; // Пропускаем закрывающую квадратную скобку ']'
      return arr;
   }
//Функция парсинга строки
   function parseString() {
      index++; // Пропускаем открывающую кавычку '"'
      let str = '';//СОздаем строку
      //Пока не вторая кавычка
      while (jsonString[index] !== '"') {
         str += jsonString[index];
         index++;
      }
      index++; // Пропускаем закрывающую кавычку '"'
      return str;
   }
//Функция парсинга числа
   function parseNumber() {
      let numStr = '';//создаем строку в которую будем записывать число
      //идем пока это число
      while (/[0-9.+-]/.test(jsonString[index])) {
         numStr += jsonString[index];
         index++;
      }
      return parseFloat(numStr);//возвращаем число
   }
//Общая функция парсинга, при поомщи которой сравниваем и вызываем другие функции преобразования
   function parseValue() {
      const char = jsonString[index];
      if (char === '{') {
         return parseObject();
      } else if (char === '[') {
         return parseArray();
      } else if (char === '"') {
         return parseString();
      } else if (char === '-' || (char >= '0' && char <= '9')) {
         return parseNumber();
      } else if (jsonString.substr(index, 4) === 'true') {
         index += 4;
         return true;
      } else if (jsonString.substr(index, 5) === 'false') {
         index += 5;
         return false;
      } else if (jsonString.substr(index, 4) === 'null') {
         index += 4;
         return null;
      } else {
         throw new SyntaxError('JSON не определен');
      }
   }
   return parseValue();
}

// Пример использования функции
const jsonString = '{"name":"Галина","age":50,"city":"Москва","isMarried":true,"array":[1,2,3],"address":{"street":"Балканская 3","zip":"123456"}}';
const parsedData = newStringToJson(jsonString);

console.log(parsedData);
