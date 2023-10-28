/*
24.	Разработайте страницу, отображающую таблицу с данными.
      Данные необходимо подгружать из источника: http://www.filltext.com/?rows=1000&fname=%7BfirstName%7D&lname=%7BlastName%7D&tel=%7Bphone%7Cformat%7D&address=%7BstreetAddress%7D&city=%7Bcity%7D&state=%7BusState%7Cabbr%7D&zip=%7Bzip%7D&pretty=true
   Требования:
●	данные должны загружаться при загрузке страницы
●	необходимо реализовать сортировку по убыванию и по возрастания для всех колонок
●	необходимо реализовать клиентскую пагинацию(50 элементов на странице)
*/

//Поместим весь наш код внутрь функции, которую вызывает событие DOMContentLoaded. 
//Оно происходит, когда документ полностью загружен.
document.addEventListener('DOMContentLoaded', function () {
   let arrayData = [];//Создаем массив для хранения данных с сервера
   const table = document.querySelector('.table');//Получаем элемент таблицы
   let currentPage = 1;//Текущая страница
   const countItemsOnPage = 50;//Количество элементов на странице
   const sortedStates = [false, false, false, false, false, false];//Массив флагов, использующийся для определения в каком порядке сортировать

   //Создаем заголовки в таблице
   function createHeaders() {
      const headerRow = document.createElement('tr'); // Создаем новую строку для заголовков
      const headers = ['Имя', 'Фамилия', 'Телефон', 'Адрес', 'Город', 'Состояние', 'Индекс'];

      //Проходимся по массиву заголовков и заполняем элемент заголовка содержимым
      headers.forEach(headerText => {
         const headerCell = document.createElement('th'); // Создаем новую ячейку заголовка
         headerCell.textContent = headerText; // Устанавливаем текст ячейки         
         headerRow.appendChild(headerCell); // Добавляем ячейку в строку      
      });

      table.appendChild(headerRow); // Добавляем строку с заголовками в таблицу
      const headersElements = document.querySelectorAll('.table tr th');//Еще раз считываем заголовки, чтобы с каждым элементом работать по индексу

      headersElements.forEach((headerElement, fieldIndex) => {
         //вешаем обработчик на каждый заголовок, функция для обработчика будет выбираться в зависимости от индекса заголовка
         headerElement.addEventListener('click', () => {
            switch (fieldIndex) {
               case 3:
                  sortData(compareAddress, fieldIndex);//вызываем функцию sortData, в которую передаем функцию сравнения и индекс
                  break;//чтобы дальше не шло
               case 6:
                  sortData(compareNumberField(fieldIndex), fieldIndex);
                  break;
               default:
                  sortData(compareStringField(fieldIndex), fieldIndex);
            }
         });
      });
   }
   //Функция для сравнения строк. Используем замыкание, так как функция sort может работать только с двумя параметрами
   function compareStringField(fieldIndex) {
      return function (a, b) {
         //сравниваем по необходимому полю,Object.keys(a) возвращает массив ключей объекта а. [fieldIndex] обращается к элементу в массиве
         //localeCompare сравнивает строки, возвращает отрицательное значение если a стоит перед b, положительное если наоборот
         return a[Object.keys(a)[fieldIndex]].localeCompare(b[Object.keys(b)[fieldIndex]]);
      };
   }
   //Функция для сравнения по адресу(в адресе число, затем строка). 
   function compareAddress(a, b) {
      //сравниваем по числу
      if (parseInt(a.address) < parseInt(b.address)) return -1;
      //если числа равны, сравниваем по строкам
      else if (parseInt(a.address) === parseInt(b.address)) {
         const aWithoutNumbers = a.address.replace(/\d+/g, '');//при помощи регулярного выражения убираем числа из строки
         const bWithoutNumbers = b.address.replace(/\d+/g, '');
         return aWithoutNumbers.localeCompare(bWithoutNumbers);
      }
      else return 1;
   }
   //сравнение типа Number
   function compareNumberField(fieldIndex) {
      return function (a, b) {
         return a[Object.keys(a)[fieldIndex]] - b[Object.keys(b)[fieldIndex]];
      };
   }
   //Функция сортировки.
   function sortData(compareFunction, fieldIndex) {
      //Если при нажатии на заголовок его флаг имеет состояние false значит он не отсортирован либо отсортирован по убыванию. 
      //В этом случае заходим в условие и выполняем сортировку по возрастанию
      if (!sortedStates[fieldIndex])
         arrayData.sort(compareFunction);
      //Иначе просто переворачиваем отсортированный по возрастанию массив
      else {
         arrayData.reverse();
      }
      //Флаг инвертируем
      sortedStates[fieldIndex] = !sortedStates[fieldIndex];
      //Остальные флаги обновляем в false
      sortedStates.forEach(function (item, index) {
         if (index !== fieldIndex) {
            sortedStates[index] = false;
         }
      })
      updateData();
   }

   function updateData() {
      const start = (currentPage - 1) * countItemsOnPage; // Определяем начальный индекс для отображаемых данных
      const end = start + countItemsOnPage; // Определяем конечный индекс для отображаемых данных
      const showData = arrayData.slice(start, end); // Выделяем данные для текущей страницы из общего массива

      table.innerHTML = ""; // Очищаем таблицу

      createHeaders(); // Создаем заголовки таблицы

      // Заполняем таблицу данными
      showData.forEach(item => {
         const row = table.insertRow(); // Создаем новую строку в таблице
         const nameCell = row.insertCell(0); // Создаем ячейку для имени
         const surnameCell = row.insertCell(1); // для фамилии
         const tellCell = row.insertCell(2); // для телефона
         const addressCell = row.insertCell(3); // для адреса
         const cityCell = row.insertCell(4); // для города
         const stateCell = row.insertCell(5); // для состояния
         const zipCell = row.insertCell(6); // для индекса

         // Записываем данные в DOM элементы
         nameCell.textContent = item.fname;
         surnameCell.textContent = item.lname;
         tellCell.textContent = item.tel;
         addressCell.textContent = item.address;
         cityCell.textContent = item.city;
         stateCell.textContent = item.state;
         zipCell.textContent = item.zip;
      });
   }

//Пагинация 
   function paginationButtons() {
      const pageCount = Math.ceil(arrayData.length / countItemsOnPage);//определяем количество страниц
      const paginationBlock = document.querySelector(".pagination-container");//определяем блок в котором будут располагатсья кнопки
      for (let i = 1; i <= pageCount; i++) {
         //Создаем кнопку
         const button = document.createElement("button");
         button.classList.add('pagination-btn');
         button.textContent = i;
         //делаем активной первую страницу
         if (i === 1) {
            button.classList.add('active');
         }
         //при нажатии на страницу делать ее активной
         button.addEventListener("click", function () {
            //удаляем у всех кнопок active
            buttons.forEach(function (item) {
               item.classList.remove('active');
            })
            //запоминаем текущую страницу
            currentPage = i;
            button.classList.add('active');
            updateData();
         });
         //добавляем кнопку в контейнер
         paginationBlock.appendChild(button);
      }
      //добавляем контейнер в конец страницы
      document.body.appendChild(paginationBlock);
      const buttons = document.querySelectorAll('.pagination-btn');
   }

//осуществляем асинхронный fetch запрос к серверу
   fetch('http://www.filltext.com/?rows=1000&fname=%7BfirstName%7D&lname=%7BlastName%7D&tel=%7Bphone%7Cformat%7D&address=%7BstreetAddress%7D&city=%7Bcity%7D&state=%7BusState%7Cabbr%7D&zip=%7Bzip%7D&pretty=true')
      .then(response => {
         if (!response.ok) {
            throw new Error('Ответ с сервера не получен.')
         }
         return response.json();
      })
      .then(data => {
         //при успешном ответе заполняем массив
         arrayData = [...data];
         updateData();
         paginationButtons();
      })
      .catch(error => {
         console.error('Произошла ошибка получения данных с сервера: ', error)
      })
})