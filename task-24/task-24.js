let arrayData = [];
const table = document.querySelector('.table');
let currentPage = 1;
const countItemsOnPage = 50;
const sortedStates = [false, false, false, false, false, false];
//Создаем заголовки в таблице
function createHeaders() {
   const headerRow = document.createElement('tr'); // Создаем новую строку для заголовков
   const headers = ['Имя', 'Фамилия', 'Телефон', 'Адрес', 'Город', 'Состояние', 'Индекс'];

   headers.forEach(headerText => {
      const headerCell = document.createElement('th'); // Создаем новую ячейку заголовка
      headerCell.textContent = headerText; // Устанавливаем текст ячейки
      headerRow.appendChild(headerCell); // Добавляем ячейку в строку      
   });

   table.appendChild(headerRow); // Добавляем строку с заголовками в таблицу
   const headersElements = document.querySelectorAll('.table tr th');

   headersElements.forEach((headerElement, fieldIndex) => {
      headerElement.addEventListener('click', () => {
         switch (fieldIndex) {
            case 3:
               sortData(compareAddress, fieldIndex);
               break;
            case 6:
               sortData(compareNumberField(fieldIndex), fieldIndex);
               break;
            default:
               sortData(compareStringField(fieldIndex), fieldIndex);
         }
      });
   });


}
function compareStringField(fieldIndex) {
   return function (a, b) {
      return a[Object.keys(a)[fieldIndex]].localeCompare(b[Object.keys(b)[fieldIndex]]);
   };
}
function compareAddress(a, b) {
   if (parseInt(a.address) < parseInt(b.address)) return -1;
   else if (parseInt(a.address) === parseInt(b.address)) {
      const aWithoutNumbers = a.address.replace(/\d+/g, '');
      const bWithoutNumbers = b.address.replace(/\d+/g, '');
      return aWithoutNumbers.localeCompare(bWithoutNumbers);
   }
   else return 1;
}
function compareNumberField(fieldIndex) {
   return function (a, b) {
      return a[Object.keys(a)[fieldIndex]]-b[Object.keys(b)[fieldIndex]];
   };
}

function sortData(compareFunction, fieldIndex) {  
   const direction = !sortedStates[fieldIndex];
   sortedStates.fill(false);
   sortedStates[fieldIndex] = direction;
   if (direction) {
      arrayData.sort(compareFunction);
   } else {
      arrayData.sort((a, b) => compareFunction(b, a));
   }
   updateData();
}

function updateData() {
   const start = (currentPage - 1) * countItemsOnPage;
   const end = start + countItemsOnPage;
   const showData = arrayData.slice(start, end);   
   table.innerHTML = "";
   createHeaders();
   showData.forEach(item => {
      const row = table.insertRow();
      const nameCell = row.insertCell(0);
      const surnameCell = row.insertCell(1);
      const tellCell = row.insertCell(2);
      const addressCell = row.insertCell(3);
      const cityCell = row.insertCell(4);
      const stateCell = row.insertCell(5);
      const zipCell = row.insertCell(6);
      nameCell.textContent = item.fname;
      surnameCell.textContent = item.lname;
      tellCell.textContent = item.tel;
      addressCell.textContent = item.address;
      cityCell.textContent = item.city;
      stateCell.textContent = item.state;
      zipCell.textContent = item.zip;
   })
}

function paginationButtons() {
   const pageCount = Math.ceil(arrayData.length / countItemsOnPage); 
   const paginationBlock = document.querySelector(".pagination-container");
   for (let i = 1; i <= pageCount; i++){
      const button = document.createElement("button");
      button.classList.add('pagination-btn');
      button.textContent = i;
      button.addEventListener("click", function () {
         buttons.forEach(function (item) {
            item.classList.remove('active');
         })
         currentPage = i;
         button.classList.add('active');
         updateData();
      });
      paginationBlock.appendChild(button);
   }
   document.body.appendChild(paginationBlock);
   const buttons = document.querySelectorAll('.pagination-btn');
}

fetch('http://www.filltext.com/?rows=1000&fname=%7BfirstName%7D&lname=%7BlastName%7D&tel=%7Bphone%7Cformat%7D&address=%7BstreetAddress%7D&city=%7Bcity%7D&state=%7BusState%7Cabbr%7D&zip=%7Bzip%7D&pretty=true')
   .then(response => {
      if (!response.ok) {
         throw new Error('Ответ с сервера не получен.')
      }
      return response.json();
   })
   .then(data => {
      arrayData = [...data];
      updateData();
      paginationButtons();
   })
   .catch(error => {
      console.error('Произошла ошибка получения данных с сервера: ',error)
   })
