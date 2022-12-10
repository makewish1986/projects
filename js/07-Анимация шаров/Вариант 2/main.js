// Ссылка на абзац <p>, который будет выводит Count - 
// число оставщихся шариков
const para = document.querySelector('p');
let count = 0;

// Ссылка на абзац <p>, который будет выводит сообщение конца игры
const paraEnd = document.querySelector('.end');

// Установка области рисования
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

// Генерирует случайное число в диапазоне min-max
function random(min, max) {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
}

// Используя созданную выше функцию для генерации случайноо числа в диапазоне min-max
// генерируем случайный цвет. Возвращает строку типа 'rgb(a,b,c)'

function randomRGB() {
  return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}

//Конструктор объекта Shape (фигура) - только свойства
// x,y - начальные координаты
// velX, velY - скорость по осям x и y
// exists - отслеживание наличия шаров в программе (не было съедено злым кругом)
function Shape(x, y, velX, velY, exists) {
  this.x = x;
  this.y = y;
  this.velX = velX;
  this.velY = velY;
  this.exists = exists;
}

// Конструктор объекта Ball (шар) - только свойства
// Ball наследует от Shape свойства x,y,velX,velY,exists
// и добавляет свои собственные сolor (цвет) и size (радиус шара)
function Ball(x, y, velX, velY, exists, color, size) {
  Shape.call(this, x, y, velX, velY, exists);
  this.color = color;
  this.size = size;
}

// Конструктор объекта EvilCircle (Злой шар) - только свойства
// EvilCircle наследует от Shape свойства x,y,velX=20,velY=20,exists
// и добавляет свои собственные сolor (цвет)=white и size=30 (радиус шара)
function EvilCircle(x, y, velX, velY, exists, color, size) {
  Shape.call(this, x, y, 20, 20, exists);
  this.color = "white";
  this.size = 30;
}

// Объект Ball - метод draw
// Метод рисует окружность и заливает ее цветом
// arc - рисует дугу; 
// последние 2 значения в arc - это начальное и конечное число градусов по кругу,
// по которому проходит дуга.
Ball.prototype.draw = function() {
  ctx.beginPath();
  ctx.fillStyle = this.color;
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
  ctx.fill();
}

// Объект EvilCircle - метод draw
// Рисует окружность, но не заливает ее цветом,
// а обводить контуром
EvilCircle.prototype.draw = function() {
  ctx.beginPath();
  ctx.strokeStyle = this.color;
  ctx.lineWidth = 3;
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
  ctx.stroke();
}

// Объект Ball - метод update
// Метод обновляет координаты шара, путем прибавления скоростей velX, velY к x,y
// причем проверяет, не выйдет ли шар после прибавления скорости за пределы экрана
// если видно, что он выйдет за пределы, скорости наоборот уменьшаются, а не прибавляется,
// то есть как бы будет эффект отталкивания от границ
Ball.prototype.update = function() {
  if ((this.x + this.size) >= width) {
    this.velX = -(this.velX);
  }

  if ((this.x - this.size) <= 0) {
    this.velX = -(this.velX);
  }

  if ((this.y + this.size) >= height) {
    this.velY = -(this.velY);
  }

  if ((this.y - this.size) <= 0) {
    this.velY = -(this.velY);
  }

  this.x += this.velX;
  this.y += this.velY;
}

// Объект EvilCircle - метод checkBounds
// Проверка на касание стенок, но
// в отличие от Ball.prototype.update, для Злого шара
// мы не обновляем скорость, а просто изменяем координаты
// на величину size
EvilCircle.prototype.checkBounds = function() {
  if ((this.x + this.size) >= width) {
    this.x -= this.size;
  }

  if ((this.x - this.size) <= 0) {
    this.x += this.size;
  }

  if ((this.y + this.size) >= height) {
    this.y -= this.size;
  }

  if ((this.y - this.size) <= 0) {
    this.y += this.size;
  }
}

// Объект EvilCircle - метод setControls
// Изменяет координаты, в зависимости от нажатой кнопки
EvilCircle.prototype.setControls = function() {
  var _this = this;
  window.onkeydown = function(e) {
      if (e.keyCode === 65) {
        _this.x -= _this.velX;
      } else if (e.keyCode === 68) {
        _this.x += _this.velX;
      } else if (e.keyCode === 87) {
        _this.y -= _this.velY;
      } else if (e.keyCode === 83) {
        _this.y += _this.velY;
      }
    }
}

// Объект Ball - метод collisionDetect
// Проверка столкновения шаров
Ball.prototype.collisionDetect = function() {
  // Цикл будет сравнивать текущий шар this со всеми остальными
  // для этого запускаем еще один цкил по j
  for (var j = 0; j < balls.length; j++) {
    // из проверки столкновения исключаем текущий шар-объект
    if (!(this === balls[j])) {
      // Используем общий алгоритм для проверки столкновения двух окружностей
      var dx = this.x - balls[j].x;
      var dy = this.y - balls[j].y;
      var distance = Math.sqrt(dx * dx + dy * dy);
      // Если обнаружено столкновение, цвет обоих шаров меняется на новый случайный
      if (distance < this.size + balls[j].size) {
        balls[j].color = this.color = 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) +')';
      }
    }
  }
}

// Объект EvilCircle - метод collisionDetect
// Проверка столкновения шаров - при столкновении Злой шар съедает обычный шар
// Счетчик оставшихся шаров уменьшается
EvilCircle.prototype.collisionDetect = function() {
  // Цикл будет сравнивать текущий шар this со всеми остальными
  // для этого запускаем еще один цкил по j
  for (var j = 0; j < balls.length; j++) {
    if (balls[j].exists) {
      // Используем общий алгоритм для проверки столкновения двух окружностей
      var dx = this.x - balls[j].x;
      var dy = this.y - balls[j].y;
      var distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < this.size + balls[j].size) {
        balls[j].exists = false;
        count--;
        para.textContent = 'Ball count: ' + count;
        if (count === 0) {
          paraEnd.textContent = 'YOU WIN!';
        }
      }
    }
  }
}

// Массив, который будет хранить все наши шары
var balls = [];

// Создаем 25 шаров - 25 экземпляров объетка Ball
// Помещаем созданные объекты в вышесозданный массив balls[]
while (balls.length < 25) {
  var ball = new Ball(
    random(0,width),
    random(0,height),
    random(-7,7),
    random(-7,7),
    true,
    'rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) +')',
    random(10,20)
  );
  balls.push(ball);
  count++;
  para.textContent = 'Ball count: ' + count;
}

// Создаем Злой шар. Передаем только 2 первых параметра,
// остальные уже определены в конструкторе явно  
const evilBall = new EvilCircle(random(0,width),random(0,height));
evilBall.setControls();

// Анимация движения
function loop() {
  // Устанавливает цвет на 25% черного
  // Рисует прямоугольник на всю область с цветом выше
  // Это позволяет скрыть рисунок предыдущего кадра до того, как будет нарисован следующий.
  ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
  ctx.fillRect(0, 0, width, height);

  // Для всех существующих в массиве balls[] шаров рисуем каждый шар,
  // а затем обновляем его координаты
  for (var i = 0; i < balls.length; i++) {
    if (balls[i].exists) {
      balls[i].draw();
      balls[i].update();
      balls[i].collisionDetect(); 
    } 
  }

  evilBall.draw();
  evilBall.checkBounds();
  evilBall.collisionDetect();

  //requestAnimationFrame() - когда этот метод постоянно запускается
  // и передаётся одно и то же имя функции,
  // он будет запускать эту функцию определённое количество раз в секунду
  // для создания плавной анимации.
  requestAnimationFrame(loop);
}

// Нам нужно вызвать функцию loop() один раз для запуска анимации
loop();