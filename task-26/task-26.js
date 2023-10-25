// 26.	Задача: Рекурсивный обход дерева DOM:: Напишите функцию, которая рекурсивно обходит дерево DOM, начиная с указанного элемента,
//    и выполняет определенное действие с каждым узлом(например, выводить информацию о теге в консоль).

//реурсивная функция, которая принимает узел и действие
function recursiveDOM(element, action) {
   //выполняем действие с текущим эелементом
   action(element);
   //получаем первого ребенка текущего элемента
   element = element.firstChild;
   //проходися по всем дочерним узлам
   while (element) {
      //рекурсивно вызываем нашу функцию для каждого узла
      recursiveDOM(element, action);
      //получаем следующего соседа текущего узла
      element = element.nextSibling;
   }
}

//функция вывода информации в консоль
function consoleInfo(element) {
   //если у узла nodeType равен 1, тоо это узел-тег
   if (element.nodeType === 1) {
      console.log('Информация о теге:', element.tagName);
   }
}

recursiveDOM(document.body, consoleInfo);
