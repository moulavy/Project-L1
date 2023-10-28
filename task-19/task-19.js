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
const count = 20;//количество постов, загружаемых за один раз
const apiUrl = `https://api.vk.com/method/wall.get?owner_id=${owner_id}&domain=${domain}&count=${count}&access_token=${token}&v=5.131`;
let posts = [];//массив загруженных постов
let offset = 0;//смещение для запроса следующей порции постов

const widgetElement = document.querySelector('.widget');
const list = document.querySelector('.news-list');
const template = document.querySelector('.template').content;//шаблон для создания постов

//данная функция вызывается когда приходят новые данные от API VK
function handleVKResponse(data) {   
   const newPosts = data.response.items;//массив объектов постов из группы ВК
   if (newPosts.length > 0) {
      // если есть новые посты, обновляем offset и добавляем новые посты к общему списку
      offset += newPosts.length;
      posts = [...posts, ...newPosts];
      // отображаем новые посты на странице
      newPosts.forEach(post => {
         const element = createElement(post);//создаем элемент поста
         list.append(element);//добавляем в список
      });
   }
}
function loadMorePosts() {
   const newApiUrl = `${apiUrl}&offset=${offset}&callback=handleVKResponse`;// создаем URL для запроса следующих постов с учетом смещения
   const script = document.createElement('script');//создаем элемент <script> для загрузки данных
   script.src = newApiUrl;
   document.body.appendChild(script); // добавляем элемент <script> в тело документа, что вызовет выполнение запроса
}
//получаем первые посты при загрузке страницы
function getPosts() {
   const script = document.createElement('script');//создаем элемент <script> для загрузки данных
   script.src = apiUrl + '&callback=handleVKResponse';
   document.body.appendChild(script);
}
//обработка события скролла виджета
widgetElement.addEventListener('scroll', function () {
   const scrollHeight = widgetElement.scrollHeight;//scrollHeight определяет полную высоту контейнера(до конца скролла)
   const scrollTop = widgetElement.scrollTop;//scrollTop показывает насколько виджет прокручен сверху
   const clientHeight = widgetElement.clientHeight;//clientHeight определяет высоту видимой области виджета
   //если разность полной высоты и прокрутки сверху становится меньше илии равна всей высоты виджета подгружаем новые посты
   if (scrollHeight - scrollTop <= clientHeight) {
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

getPosts();