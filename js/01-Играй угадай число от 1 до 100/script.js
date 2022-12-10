

//В переменную randomNumber записываем случайное число от 1 до 100
var randomNumber = Math.floor(Math.random () * 100 + 1);

//Определяем переменные для селекторов соответствующих классов под будущий вывод результатов в параграфах <p>
var guessesNum = document.querySelector('.guessesNum');
var guesses = document.querySelector('.guesses');
var lastResult = document.querySelector('.lastResult');
var lowOrHi = document.querySelector('.lowOrHi');
var resultParas = document.querySelector('.resultParas');

//Определяем переменные для селекторов соответствующих классов для поля ввода и кнопки
var guessSubmit = document.querySelector('.guessSubmit');
var guessField = document.querySelector('.guessField');

//Определяем переменную для текущего числа попыток. Ставим начальное значение = 1
var guessCount = 1;
//Определяем переменную для количества попыток, которое осталось у пользователя
var attemptsRem = 9;

//Определяем переменную для кнопки сброса (начала новой игры)
var resetButton;

/*Функция checkGuess() проверяет введенное в поле ввода
если число совпало с загаданным - он выиграл
если не совпало, то у него есть следующая попытка угадать
если попытки кончились, он проиграл*/
function checkGuess() {
	var userGuess = Number(guessField.value);//преобразовываем то, что ввел пользователь в число
	if (guessCount === 1) {
		guesses.textContent = 'Your lust number attempts: ';
	}
	guessesNum.textContent = 'Lifes Remaining: '+ attemptsRem;
	guesses.textContent += userGuess + ' ';
	if (userGuess === randomNumber) {
		lastResult.textContent = 'Congratulations! You won!';
		lastResult.style.backgroundColor = '#90df8d';
		lowOrHi.textContent = 'Our number was really: ' + randomNumber;
		setGameOver();
	} else if  (guessCount === 10) {
		lastResult.textContent = 'Sorry! You don\'t have any attempts!';
		lastResult.style.backgroundColor = '#ffb7b7';
		lowOrHi.textContent = 'Our number was: ' + randomNumber;
		setGameOver();
	} else {
		lastResult.textContent = 'Wrong!';
		lastResult.style.backgroundColor = '#ffb7b7';
		if (userGuess < randomNumber) {
			lowOrHi.textContent = 'Our number is higher than yours!';
		} else {
			lowOrHi.textContent = 'Our number is lower than yours!';
		}
		guessCount++;
		attemptsRem--;
		guessField.value = '';
  		guessField.focus();//курсор встает в поле ввода
	}
}

//Ожидаем от пользователя нажатия на кнопку guessSubmit. Если нажал - запускается функция checkGuess()
guessSubmit.addEventListener('click',checkGuess);

/*Функция конца игры. Блокирует дальнейший ввод чисел и нажатие на кнопку.
Создает кнопку с возможностью начать новую игру*/
function setGameOver () {
	guessField.disabled = true;//блокировка ввода
	guessSubmit.disabled = true;//блокировка кнопки
	resetButton = document.createElement('button');//создаем новую кнопку
	resetButton.textContent = 'Start new game';
	resetButton.classList.add('guessSubmit');
	resultParas.appendChild(resetButton);
	resetButton.addEventListener('click',resetGame);//при нажатии на кнопку запускается функция resetGame()
}

/*Функция - сброс настроек игры в случае начала новой игры*/
//перебираем все элементы <p> внутри селектора с классом .resultParas и обнуляем содержимое каждого
function resetGame() {
	guessCount = 1;
	attemptsRem = 9;
	var resetParas = document.querySelectorAll('.resultParas p');
	for (var i = 0; i < resetParas.length; i++) {
		resetParas[i].textContent = '';
	}
	//удаляем созданную кнопку начала новой игры
	resetButton.parentNode.removeChild(resetButton)
	guessField.disabled = false;
	guessSubmit.disabled = false;
	guessField.value = '';
  	guessField.focus();//курсор встает в поле ввода
  	lastResult.style.backgroundColor = 'transparent';
  	randomNumber = Math.floor(Math.random() * 100) + 1;//загадывает новое число
}




