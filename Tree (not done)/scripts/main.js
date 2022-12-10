var myImage = document.querySelector('img');

myImage.onclick = function() {
    var mySrc = myImage.getAttribute('src');
    if(mySrc === 'images/tree.png') {
      myImage.setAttribute ('src','images/tree1.png');
    } else {
      myImage.setAttribute ('src','images/tree.png');
    }
}
var myButton = document.querySelector('button');
var myHeading = document.querySelector('h2');
function setUserName() {
  var myName = prompt('Введите Ваше имя');
  localStorage.setItem('name', myName);
  myHeading.textContent = 'Добро пожаловать, ' + myName;
}
if(!localStorage.getItem('name')) {
  setUserName();
} else {
  var storedName = localStorage.getItem('name');
  myHeading.textContent = 'Добро пожаловать, ' + storedName;
}
myButton.onclick = function() {
  setUserName();
}