var select = document.querySelector('select#month');
var themeSelect = document.querySelector('select#themeSelect');
var list = document.querySelector('ul');
var h1 = document.querySelector('h1');
var html = document.querySelector('html');

select.addEventListener('change', changeMonth);
function changeMonth () {
  var choice = select.value;
  var days = 31;
  if (choice === 'Апрель' || choice === 'Июнь' || choice === 'Сентябрь' || choice === 'Ноябрь') {
    days = 30;
  } else if (choice === 'Февраль') {
    days = 28;  
  };

  createCalendar (days, choice);
}

  function createCalendar(days, choice) {
    list.innerHTML = '';
    h1.textContent = choice;
    for (var i = 1; i <= days; i++) {
      var listItem = document.createElement('li');
      listItem.textContent = i;
      list.appendChild(listItem);
    }
  }

 themeSelect.addEventListener('change', changeTheme);
 function changeTheme () {
    var themeChoice = themeSelect.value;
    switch (themeChoice) {
      case 'Черная':
      update ('black', 'white');
      break;

      case 'Желтая':
      update ('yellow', 'black');
      break;

      case 'Пурпурная':
      update ('rebeccapurple', 'white');
      break;

      default:
      update ('white', 'black');
    }
  }

  

createCalendar(31,'Январь');

function update(bgColor, fontColor) {
    html.style.backgroundColor = bgColor;
    html.style.color = fontColor;
  }
