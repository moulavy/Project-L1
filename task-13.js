// 13.	Задача на классы и наследование: создайте базовый класс Shape(фигура),
//    который имеет методы для расчета площади и периметра.Затем создайте подклассы, представляющие различные фигуры,
//    такие как прямоугольник, круг и треугольник.Реализуйте методы расчета площади и периметра для каждой фигуры.

//Создаем базовый абстрактный класс, от которого будем наследоваться.
class Shape{
   constructor() {
      
   }
   area(){
      throw new Error('Метод должен быть переопределен в наследуемом классе.')
   }
   perimetro() {
      throw new Error('Метод должен быть переопределен в наследуемом классе.')
   }
}
//наследуемся от базового класса и определяем методы для треугольника
class Triangle extends Shape {
   constructor(a, b, c) {
      super();
      this.a = a;
      this.b = b;
      this.c = c;
   }
   area() {
      this.p = (this.a + this.b + this.c )/ 2;
      return Math.sqrt(this.p*(this.p - this.a)*(this.p - this.b)*(this.p - this.c));
   }
   perimetro() {
      return this.a + this.b + this.c;
   }
}
//наследуемся от базового класса и определяем методы для прямоугольника
class Rectangle extends Shape {
   constructor(a, b) {
      super();
      this.a = a;
      this.b = b;
   }
   area() {      
      return this.a*this.b;
   }
   perimetro() {
      return 2*(this.a+this.b);
   }
}
//наследуемся от базового класса и определяем методы для круга
class Circle extends Shape {
   constructor(r) {
      super();
      this.r = r;
   }
   area() {
      return Math.PI * this.r * this.r;
   }
   perimetro() {
      return 2 * Math.PI * this.r;
   }
}

const rectangle = new Rectangle(4, 6);
console.log('Площадь прямоугольника:',rectangle.area());
console.log('Периметр прямоугольника:',rectangle.perimetro());

const triangle = new Triangle(3, 4, 5);
console.log('Площадь треугольника:', triangle.area());
console.log('Периметр треугольника:', triangle.perimetro());

const circle = new Circle(3);
console.log('Площадь круга:', circle.area());
console.log('Периметр круга:', circle.perimetro());