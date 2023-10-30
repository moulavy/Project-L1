//Создаем класс в котором определены геттеры и сеттеры, при помощи которых можно получить свойства книги или изменить.
class Book {
   constructor(name, author, year) {
      //определеяем приватные переменные, this обозначает текущий экземпляр объекта
      this._name = name;
      this._author = author;
      this._year = year;
   }

   get name() {
      return this._name;
   }

   get author() {
      return this._author;
   }

   get year() {
      return this._year;
   }

   set name(newName) {
      this._name = newName;
   }

   set author(newAuthor) {
      this._author = newAuthor;
   }

   set year(newYear) {
      this._year = newYear;
   }
}

const bookOne = new Book('Алиса в стране чудес', 'Льюис Кэрролл', 1862);
bookOne.name = 'Оливия';
console.log(bookOne.name);