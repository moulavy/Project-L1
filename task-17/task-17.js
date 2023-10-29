const inputElement = document.querySelector('.input');
const listHint = document.querySelector('.hint-container');
let arrayResults = [];
const apiKey = '12753de4-be84-4671-a144-6b77639eefa8';
const apiUrlBase = `https://suggest-maps.yandex.ru/v1/suggest?apikey=${apiKey}&text=`;

function debounce(callback, delay) {
   let timeoutId;
   return function () {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
         callback.apply(this, arguments);
      }, delay);
   };
}

function throttle(callback, delay) {
   let isThrottled = false;
   return function () {
      if (!isThrottled) {
         isThrottled = true;
         callback.apply(this, arguments);
         setTimeout(() => {
            isThrottled = false;
         }, delay);
      }
   };
}

async function apiHandler() {
   const inputValue = inputElement.value;
   const apiUrl = apiUrlBase + inputValue;
   try {
      const response = await fetch(apiUrl);
      if (response.ok) {
         const data = await response.json();
         arrayResults = data.results;
         updateHints();
      } else {
         throw new Error('Ошибка на сервере');
      }
   } catch (error) {
      console.error('Ошибка:', error);
   }
}

function updateHints() {
   listHint.innerHTML = '';
   listHint.classList.remove('display');
   if (arrayResults) {
      arrayResults.forEach(function (item) {
         const itemListElement = document.createElement('li');
         itemListElement.classList.add('itemList');
         if (item.subtitle) {
            itemListElement.textContent = item.title.text + ' ' + item.subtitle.text;
         } else {
            itemListElement.textContent = item.title.text;
         }
         itemListElement.addEventListener('click', function () {
            inputElement.value = itemListElement.textContent;
         });
         listHint.appendChild(itemListElement);
         listHint.classList.add('display');
      });
   }
}

const debouncedApiHandler = debounce(apiHandler, 1000); 
const throttledApiHandler = throttle(apiHandler, 1000); 

inputElement.addEventListener('input', function () {
   debouncedApiHandler();
   throttledApiHandler();
});
