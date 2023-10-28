/*
9.	Реализовать функцию конвертации JSON в строку
*/

function stringify(data) {
   // Если примитивы (числа, строки, boolean, null)
   if (typeof data === 'number' || typeof data === 'boolean' || data === null) {
      return String(data);
   }
   if (typeof data === 'string') {
      return `"${data}"`;
   }

   // ЕСли массив
   if (Array.isArray(data)) {
      const arrayString = data.map(item => stringify(item)).join(',');
      return `[${arrayString}]`;
   }

   // Если объект
   if (typeof data === 'object') {
      const objectKeys = Object.keys(data);
      const objectString = objectKeys.map(key => `"${key}":${stringify(data[key])}`).join(',');
      return `{${objectString}}`;
   }

   // Если тип данных не определен:
   return undefined;
}

const jsonData = [{
   name: "Екатерина",
   age: 78,
   city: "Москва"
},
{
   name: "Руслан",
   age: 10,
   city: "Сочи"
},
{
   name: "Михаил",
   age: 20,
   city: "Омск"
},
];

const jsonString = stringify(jsonData);
console.log(jsonString); 
