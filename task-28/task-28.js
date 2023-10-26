// 28.	Задача: Создать и добавить элемент с использованием шаблонов: Напишите функцию,
//    которая создает новый элемент с использованием шаблонов(например, с помощью тега < template >)
//    и добавляет его в DOM.

//получаем контейнер в который будем добавлять элементы
const list = document.querySelector('.list');
//получаем ссылку на элемент <template>
const template = document.querySelector('.template').content;

const array = [
   {
      id: 1,
      title: 'Трехцветная кошка',
      description: 'Домашняя кошка с пятнами чёрного, белого и рыжего цветов.Чёрный(пигмент эумеланин) и рыжий(пигмент феомеланин) под воздействием генов, видоизменяющих их оттенки, могут превращаться соответственно в голубой и кремовый, шоколадный и рыжий, лиловый и кремовый и др.',
      img:'https://wp-s.ru/wallpapers/6/3/561029086232966/otdyxayushhij-kotenok-s-ustalym-vzglyadom.jpg'
   },
   {
      id: 2,
      title: 'Рыжая кошка',
      description: 'Уникальный окрас шерсти рыжих котов обусловлен генетически. Orange-ген, отвечающий за рыжий пигмент, связан с женской хромосомой X. По логике, именно у кошек-«девочек», в ДНК которых две такие хромосомы, он должен проявляться чаще. Однако к этой хромосоме привязан и чёрный пигмент, поэтому оранжевый окрас у кошек возможен, только если обе X-хромосомы «рыжие». В мужской генетической паре XYOrange-ген всегда доминантный, поэтому рыжих котов значительно больше, чем животных противоположного пола.',
      img: 'https://proprikol.ru/wp-content/uploads/2020/12/kartinki-ryzhih-kotov-9.jpg'
   },
   {
      id: 3,
      title: 'Вислоухая кошка',
      description: 'Шотландские вислоухие кошки (иначе их порода звучит как скоттиш-фолд) — домашние питомцы среднего размера, их вес колеблется в пределах 3-6 кг, высота в холке около 30 см. Отличительная черта этих животных — небольшие ушки, устремленные вперед, с несколько опущенными кончиками, огромные внимательные глаза, обтекаемые формы тела и своеобразный скрипучий голос.',
      img: 'https://proprikol.ru/wp-content/uploads/2019/08/kartinki-nyashnye-kotiki-16.jpg'
   }
]

//функция создает новый элемент списка на основе объекта item
function createElement(item) {
   //клонируем и создаем копию элемента li
   const element = template.querySelector('.list-item').cloneNode(true);
   //находим элементы внутри скопированного элемента
   const elementTitle = element.querySelector('.title');
   const elementDescription = element.querySelector('.description');
   const elementImage = element.querySelector('.list-img');

   //устанавливаем значения
   elementTitle.textContent = item.title;
   elementDescription.textContent = item.description;
   elementImage.src = item.img;

   //возвращаем новый элемент
   return element;
}

//проходимся по всему массиву данных и каждый item отправляем создаваться в createElement
array.forEach(function (item) {
   const element = createElement(item);
   //добавляем в конец контейнера списка
   list.append(element);
})
