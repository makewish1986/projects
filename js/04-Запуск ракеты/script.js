var output = document.querySelector('.output');
var btn = document.querySelector('button');
var btnClr = document.querySelector('.clear');


btn.addEventListener('click', start);
btnClr.addEventListener('click', clr);

function start () {
  var i = 10;
  while (i > 0) {
    if (i === 10) {
      printp('Обратный отсчёт 10');
    } else {
      printp(i);
    }
    i--;
  }
  printp('Пуск!');
  i = 10;
}

function printp(line) {
  var para = document.createElement('p');
  output.appendChild(para);
  para.textContent = line; 
}

function clr () {
  while (output.firstChild) {
    output.removeChild(output.firstChild);
}
}


