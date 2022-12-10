//Объявление переменных
const customName = document.getElementById('customname');
const randomize = document.querySelector('.randomize');
const story = document.querySelector('.story');

//В функцию передается массив
//Возвращается случайный элемент массива
function randomValueFromArray(array){
  const random = Math.floor(Math.random()*array.length);
  return array[random];
}

//storyText - исходный текст с местами для вставок x,y,z
var storyText = 'It was 94 fahrenheit outside, so :insertx: went for a walk. When they got to :inserty:, they stared in horror for a few moments, then :insertz:. Bob saw the whole thing, but was not surprised — :insertx: weighs 300 pounds, and it was a hot day.'
//Массивы с набором слов для x,y,z
var insertX = [	'Willy the Goblin',
				'Big Daddy',
				'Father Christmas'];
var insertY = [	'the soup kitchen',
				'Disneyland',
				'the White House'];

var insertZ = [	'spontaneously combusted',
				'melted into a puddle on the sidewalk',
				'turned into a slug and crawled away'];

//При нажатии на кнопку срабатывае функция result()
randomize.addEventListener('click', result);

//Функция - генерация текста со случайными вставками x,y,z
function result() {

//Если в поле для имени что-то есть, записываем это в name
//и заменяем в тексте Bob на новое имя
  if(customName.value !== '') {
    const name = customName.value;
    storyText = storyText.replace('Bob', name);
  }
  var newStory = storyText;

  //Получаем случайные строки из массивов x,y,z
  var xItem = randomValueFromArray(insertX);
  var yItem = randomValueFromArray(insertY);
  var zItem = randomValueFromArray(insertZ);

  //Делаем замены в местах для вставок
  newStory = newStory.replace(':insertx:', xItem);
  newStory = newStory.replace(':insertx:', xItem);
  newStory = newStory.replace(':inserty:', yItem);
  newStory = newStory.replace(':insertz:', zItem);

  //Перевод в стоуны и цельсии, если выбран UK
  if(document.getElementById("uk").checked) {
    const weight = Math.round(300/14) + ' stone';
    const temperature =  Math.round((94 - 32) / 1.8) + ' centigrade';
    newStory = newStory.replace('94 fahrenheit', temperature);
    newStory = newStory.replace('300 pounds', weight);
  }

  story.textContent = newStory;
  story.style.visibility = 'visible';
}