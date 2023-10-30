/*5.	Разработайте функцию преобразования JSON в связный список. 
На входе функция должна получать JSON, содержащий список объектов, 
на выходе объект, представляющий из себя односвязный список.*/

//Узел односвязаного списка
function Node(json) {
   //Запоминаем значение узла - JSON объект
   this.data = json;
   //Ссылка на следующий узел
   this.next = null;
}

//Функция принимает массив JSON объектов и возращает список
function jsonToList(jsonArr) {
   //Проверяем, пустой ли массив и существует ли он
   if (!jsonArr || !jsonArr.length) {
      return null;
   }
   // Создаем первый-головной узел списка с данными первого JSON объекта
   let head = new Node(jsonArr[0]);
   //Устанавливаем текущий узел как головной
   let current = head;
   // Проходим по массиву из JSON объектов и создаем список
   for (let i = 1; i < jsonArr.length; i++) {
      let newNode = new Node(json[i]);
      //устанавливаем ссылку на следующий узел у текущего узла чтоб образовать связный список
      current.next = newNode;
      current = newNode;
   }

   return head;
}

const json = [
   { number: 1 },
   { number: 2 },
   { number: 3 },
   { number: 4 },
   { number: 5 },
];

const list = jsonToList(json);

//выводим односвязный список
let currentNode = list;
while (currentNode) {
   console.log(currentNode.data);
   currentNode = currentNode.next;
}
