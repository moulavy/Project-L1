/*
19.	Реализовать виджет, отображающий список постов из любого паблика в VK (подойдет любой паблик, где постов очень много). 
Например, с помощью этой функции API VK. Виджет должен иметь фиксированные размеры и возможность прокрутки. 
При прокрутке содержимого виджета до конца должны подгружаться новые посты. 
Необходимо реализовать возможность кэширования уже загруженных данных: если пользователь закрыл страницу, 
а потом снова открыл ее, виджет должен отображать все загруженные ранее данные (новые данные должны подгружаться из учетом уже загруженных ранее).

При переполнении localStorage, данные, загруженные последними должны вытеснять данные загруженные первыми.
*/
const token = '6957ee6c6957ee6c6957ee6cb46a41f2c0669576957ee6c0c6ada38a6c80bf6d78036ed';
const owner_id = '-29534144';//ID вк группы
const domain = 'lentach';//домен группы
const count = 10;//количество постов, загружаемых за один раз
const apiUrl = `https://api.vk.com/method/wall.get?owner_id=${owner_id}&domain=${domain}&count=${count}&access_token=${token}&v=5.131`;
let posts = [];//массив загруженных постов
let offset = 0;//смещение для запроса следующей порции постов
let currentLocalStorageSize;
let maxLocalStorageSize;
const widgetElement = document.querySelector('.widget');
const list = document.querySelector('.news-list');
const template = document.querySelector('.template').content;//шаблон для создания постов

//данная функция вызывается когда приходят новые данные от API VK
function handleVKResponse(data) {
   const newPosts = data.response.items;//массив объектов постов из группы ВК
   if (newPosts.length > 0) {
      // если есть новые посты, обновляем offset и добавляем новые посты к общему списку
      offset += newPosts.length;
      handlerLocalStorage(newPosts);
      posts = [...posts, ...newPosts];
      // отображаем новые посты на странице
      newPosts.forEach(post => {
         const element = createElement(post);//создаем элемент поста
         list.append(element);//добавляем в список
      });
      // Сохраняем обновленные данные и текущий сдвиг в локальное хранилище    
      localStorage.setItem('posts', JSON.stringify(posts));
      localStorage.setItem('offset', offset.toString());
      //Выводим текущий размер localStorage и максимальный размер localStorage
      console.log("Текущий объем занятой памяти localStorage:", JSON.stringify(localStorage).length);
      console.log("Максимальный размер localStorage", maxLocalStorageSize);
   }
}
function handlerLocalStorage(newPosts) {
   currentLocalStorageSize = JSON.stringify(localStorage).length;
   let newPostsSize = JSON.stringify(newPosts).length;//узнаем сколько будут занимать новые посты
   //если текущий размер данных в localStorage плюс размер новой порции данных превышает максимальный размер хранилища
   //удалить данные из localStorage загруженные первыми
   if (currentLocalStorageSize + newPostsSize > maxLocalStorageSize) {
      let excessDataSize = currentLocalStorageSize + newPostsSize - maxLocalStorageSize;//размер лишних данных
      let removedSize = 0;//размер удаленных постов
      //пока размер удаленных постов меньше лишних 
      //и массив не пустой удаляем 
      while (removedSize < excessDataSize && posts.length > 0) {
         let removedPost = posts.shift();//удаляем первый элемент массива
         removedSize += JSON.stringify(removedPost).length;//обновляем removedSize
      }
   }
}

function loadMorePosts() {
   const newApiUrl = `${apiUrl}&offset=${offset}&callback=handleVKResponse`;// создаем URL для запроса следующих постов с учетом смещения
   const script = document.createElement('script');//создаем элемент <script> для загрузки данных
   script.src = newApiUrl;
   document.body.appendChild(script); // добавляем элемент <script> в тело документа, что вызовет выполнение запроса
}

//обработка события скролла виджета
widgetElement.addEventListener('scroll', function () {
   const scrollHeight = widgetElement.scrollHeight;//scrollHeight определяет полную высоту контейнера(до конца скролла)
   const scrollTop = widgetElement.scrollTop;//scrollTop показывает насколько виджет прокручен сверху
   const clientHeight = widgetElement.clientHeight;//clientHeight определяет высоту видимой области виджета
   //если разность полной высоты и прокрутки сверху становится меньше илии равна всей высоты виджета подгружаем новые посты
   if (scrollHeight - scrollTop <= clientHeight + 20) {
      loadMorePosts();
   }
});
//функция создания поста
function createElement(item) {
   const element = template.querySelector('.list-item').cloneNode(true);
   const elementText = element.querySelector('.text-news');

   elementText.textContent = item.text;//текст поста
   //массив изображений поста
   item.attachments.forEach(attachment => {
      if (attachment.type === 'photo') {
         const photoUrl = attachment.photo.sizes.find(size => size.type === 'x').url;
         const imgElement = document.createElement('img');
         imgElement.src = photoUrl;
         imgElement.classList.add('img-news');
         element.appendChild(imgElement);
      }
   })
   return element;
}

function getPosts() {
   // проверяем наличие данных в локальном хранилище
   const cachedPosts = localStorage.getItem('posts');
   maxLocalStorageSize = localStorage.getItem('maxLocalStorage');
   //если максимальное значение еще не вычислено - вычисляем при помощи функции из задания 18
   if (!maxLocalStorageSize) {
      maxLocalStorageSize = getMaxLocalStorageSize();
      localStorage.setItem('maxLocalStorage', maxLocalStorageSize);
   }
   if (cachedPosts) {
      // если данные есть, загружаем их и отображаем на странице
      posts = JSON.parse(cachedPosts);
      posts.forEach(post => {
         const element = createElement(post);
         list.append(element);
      });
      // получаем последний сдвиг и обновляем offset
      const lastOffset = localStorage.getItem('offset');
      if (lastOffset) {
         offset = parseInt(lastOffset, 10);
      }
   } else {
      loadMorePosts();
   }
}
getPosts();