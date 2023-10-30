const inputElement = document.querySelector('.input');//поле ввода
const listHint = document.querySelector('.hint-container');//контейнер списка для подсказок
let arrayResults = [];//массив для хранения результатов поиска
const apiKey = '12753de4-be84-4671-a144-6b77639eefa8';
const apiUrlBase = `https://suggest-maps.yandex.ru/v1/suggest?apikey=${apiKey}&text=`;

//Дебоусинг используется для того чтобы не посылать запросы к серверу слишком часто.
//Мы отправляем запрос только по истечению заданного количества милисекунд.
/*когда функция debounce вызывается с определенным количеством 
миллисекунд, она создает таймер, который откладывает выполнение функции 
callback на это количество миллисекунд
если функция debounce вызывается снова в течение этого времени, старый таймер отменяется и создается новый.
так мы откладываем выполнение функции callback до тех пор, пока не пройдет достаточное количество времени без новых вызовов функции debounce
*/
//callback - функция которую нам надо отложить
function debounce(callback, ms) {
   let timer;//храним идентификатор таймера
   //возвращаем анонимную функцию, которая будет вызываться каждый раз, когда функция debounce будет вызвана
   return function (...args) {
      clearTimeout(timer);//очищаем предыдущий таймер,чтобы избежать большого количества вызовов функции callback когда много событий
      //устанавливаем новый таймер. функция будет вызвана после ms после последнего вызова строчки ниже.
      timer = setTimeout(() => {
         callback.apply(this, args);//запускаем функцию с переданными аргументами через apply
      }, ms);
   };
}

/*
Функция throttle ограничивает частоту выполнения определенной функции (callback). 
Она обеспечивает, что функция callback может быть вызвана не чаще, чем один раз 
за определенный промежуток времени (ms миллисекунд). Если попытаться вызвать функцию callback чаще, 
чем раз в указанный интервал времени, лишние вызовы будут проигнорированы до истечения этого интервала.
*/
//callback - функция которую нам надо отложить
function throttle(callback, ms) {
   let isThrottled = false;//флаг, с помощью которого отслеживаем разрешено ли в данный момент выполнение функции callback
   return function () {
      if (isThrottled) {
         return;//если выполнение функции уже отложено, не делаем ничего и выходим из функции
      }
      callback.apply(this, arguments);//вызываем функцию callback с переданными аргументами и текущим контекстом
      isThrottled = true; //устанавливаем флаг, чтобы предотвратить повторный вызов функции до истечения заданного интервала времени
      setTimeout(() => {
         isThrottled = false;//по истечении времени снимаем ограничение
      }, ms);
   }
}
//асинхронная функция для обработки api запроса
async function apiHandler() {
   const inputValue = inputElement.value;//получаем значение из поля ввода
   const apiUrl = apiUrlBase + inputValue;//создаем url для запроса
   try {
      const response = await fetch(apiUrl);//отправляем запрос на сервер
      if (response.ok) {
         const data = await response.json();//парсим json ответ
         arrayResults = data.results;//обновляем массив результатов
         updateHints();//обновляем подсказки
      } else {
         throw new Error('Ошибка на сервере');
      }
   } catch (error) {
      console.error('Ошибка:', error);
   }
}
//функция для обновления подсказок 
function updateHints() {
   listHint.innerHTML = '';//очищаем список подсказок
   listHint.classList.remove('display');//убираем отображение списка
   if (arrayResults) {//если массив не пустой
      arrayResults.forEach(function (item) {
         const itemListElement = document.createElement('li');//создаем эелемент спсика для подсказки
         itemListElement.classList.add('itemList');
         if (item.subtitle) {//если в ответе с сервера у результата есть подзаголовок 
            itemListElement.textContent = item.title.text + ' ' + item.subtitle.text;
         } else {
            itemListElement.textContent = item.title.text;
         }
         itemListElement.addEventListener('click', function () {
            inputElement.value = itemListElement.textContent;//при клике на подсказку устанавливаем ее текст в поле ввода
         });
         listHint.appendChild(itemListElement);//добавляем в контейнер
         listHint.classList.add('display');//отображаем контейнер
      });
   }
}

const debouncedApiHandler = debounce(apiHandler, 1000);//применяем debounce к функции apiHandler с задержкой в 1000 миллисекунд
//const throttledApiHandler = throttle(apiHandler, 1000); 

//Считаю нецелесообразным использовать и троттлинг и дебоусинг. Выбор был сделан в пользу дебоусинга
inputElement.addEventListener('input', function () {
   debouncedApiHandler();
   //  throttledApiHandler();
});
