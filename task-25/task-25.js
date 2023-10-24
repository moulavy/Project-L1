function createElementStyle(tagName,text,styles) {
   const newElement = document.createElement(tagName);
   newElement.textContent = text;
   for (let key in styles) {
      newElement.style[key] = styles[key];
   }
   document.body.appendChild(newElement);
}
const stylesBlock = {
   color: 'red',
   fontSize:'30px',
   width: '500px',
   height: '400px',
   backgroundColor:"blue"
}
createElementStyle('div', 'Я новый элемент', stylesBlock);