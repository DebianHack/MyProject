
// получить случайное число от min до (max+1)
function random(min, max) {
  
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}




/* ****************************
функции для создания элементов игры

*****************************/


// функция создания блока Старт
function sozdanieStartBlock () {
   // создание элемента див стартблок 
   startBlock = document.createElement ("div");
   // прописываем айди стартблока
   startBlock.id = "start-block";
   // вкладываем в блок igraPole "ребенка" - 
   igraPole.appendChild (startBlock);
   // создаем старткнопку
   startKnopka = document.createElement ("button");
   // прописываем айди старткнопки
   startKnopka.id = "startknopka";
   // прописываем текст в старткнопке
   startKnopka.innerText = "Начать";
   // вкладываем старткнопку в стартблок 
   startBlock.appendChild (startKnopka);
}



// функция создания блока Таймера <h2>Время: <span id = "timer">30</span></h2>
function sozdanieTimerBlock () {
  // создаем заголовок 
  let h2 = document.createElement ("h2");
  // прописываем в заголовок "Время"
  h2.innerText = "Время: "
  // создаем элемент "спан"
  timerBlock = document.createElement ("span");
  // присваеваем айди "таймер"
  timerBlock.id = "timer";
  // выводим в таймере количество секунд
  timerBlock.innerText = "50";
  // создаем внутри заголовка Н2 тег "спан"
  h2.appendChild (timerBlock);
  // добавляем в информационнй блок заголовок с таймером 
  infoBlock.appendChild (h2);
  
}

//  функция создания блока очков <div id="stars">0</div>
function sozdanieOchkovBlock () {
   // создание блока div stars 
   stars = document.createElement ("div");
   // прописываем айди очков
   stars.id = "stars";
   // прописывает в Очках ноль
   stars.innerText = 0;
   // вкладываем в блок igraPole "ребенка" - очки
   igraPole.appendChild (stars);
   
}


// функция создания блока жизней <div id="lifes"> <span></span> ..... </div>
function sozdanieJizneyBlock () {
   // создание блока жизней 
   lifes = document.createElement ("div");
   // вкладываем в блок igraPole "ребенка" - жизни
   igraPole.appendChild (lifes);
   // прописываем айди жизней
   lifes.id = "lifes";
   // текущее количество жизней
   var tekuseekolichestvoLifes = 0;
      // условие если текущее количество меньше пяти
      while (tekuseekolichestvoLifes < colichestvoLifes) {      
          // создание жизни спана
          span = document.createElement ("span");
          // вкладываем внутрь блока жизней тег "спан"
          lifes.appendChild (span);
          tekuseekolichestvoLifes = tekuseekolichestvoLifes + 1;
      }
}

// функция создания игрока - доктора <div id="player"></div> 
function sozdaniePlayer (){
   // создание игрока 
   player = document.createElement ("div");
   // вкладываем в блок igraPole "ребенка" - игрока
   igraPole.appendChild (player);
   // прописываем айди игрока
   player.id = "player";
}


// Добавляю событие нажатия клавиши
document.addEventListener('keydown', function(event) {
  switch(event.keyCode){
    // Нажали вниз(s)
    case 40:
      player.style.top = player.offsetTop + 30 + "px";
      break;
    // Нажали вверх(w)
    case 38:
      player.style.top = player.offsetTop - 30 + "px";
      break;
    // Нажали пробел
    case 32:
      createBullet();
      break;
  }
});   


// Создание лекарства - пули
//<div class="bullet"></div>
function createBullet() {
    // Создаем блок для лекарства
    let bullet = document.createElement("div");
    // звук выстрела
    soundVistrel();
    // даем класс лекарства
    bullet.className = "bullet";
    // задаем начальное значение позиции лекарства
    bullet.style.top = player.offsetTop + 90 + "px";
    // добавляем лекарство на игровое поле
    document.body.appendChild(bullet);
    // делаем движение лекарства
    bulletMove(bullet);
    
}

function bulletMove(bullet) {
    // создаем таймер для движения пули
    let timerId = setInterval(function() {
       // двигаем пулю влево
       bullet.style.left = bullet.offsetLeft - 10 + "px";
       // проверяем попала ли пуля в мишень 
       isShot(bullet, timerId);
          if(bullet.offsetLeft < -10) {
             bullet.remove();
             clearInterval(timerId);
          }
    }, 10);
}

// Функция создания врага <div class="enemy"></div>
function createEnemy() {
    var enemy = document.createElement("div");
    igraPole.appendChild(enemy);
    soundZombi();
    enemy.className = "enemy";
    enemy.style.top = random(200, document.body.offsetHeight - 100) + "px"; 

    let timerId = setInterval(function() {
        enemy.style.left = (enemy.offsetLeft + 10) + "px";
        isDie();
           if(enemy.offsetLeft > 1300) {
              enemy.remove ();
              clearInterval(timerId);
              createEnemy();
              // отнимаем жизнь
              die();
            }
     }, 50);
  enemy.dataset.timer = timerId; 
}   


 

// функция попадания в зомби
function isShot(bullet, timer) {
  // Координаты верхней и нижней точки пули
  let topB = bullet.offsetTop;
  let bottomB = bullet.offsetTop + bullet.offsetHeight;

  let enemy = document.querySelector(".enemy");
  if(enemy != null) {
    // Координаты верхней и нижней точки противника
    let topE = enemy.offsetTop - 50;
    let bottomE = enemy.offsetTop + enemy.offsetHeight;
    let leftB = bullet.offsetLeft;
    let leftE = enemy.offsetLeft;
    let rightE = enemy.offsetLeft + enemy.offsetWidth - 50;

    if(topB >= topE && topB <= bottomE && leftB <= rightE) {
          enemy.className = 'boom';
          //soundRevzombi();
          bullet.remove();
          enemy.style.top = (topE - 50) + "px";
          enemy.style.left = (leftE - 50) + "px";
          clearInterval(enemy.dataset.timer);
          colichestvoOchkov = colichestvoOchkov + 1;
          stars.innerText = colichestvoOchkov;
          setTimeout(function() {
          enemy.remove ();
          createEnemy();
          clearInterval(timer);
          }, 500)
    }
  } 

}

// функция попадания зомби в доктора
 function isDie() {
  let enemy = document.querySelector('.enemy');
  if(enemy.offsetTop > player.offsetTop - 100 && 
     enemy.offsetTop < player.offsetTop + player.offsetHeight &&
     enemy.offsetLeft >= player.offsetLeft - 50) {
          soundRevzombi();
          enemy.className = 'boom';
          enemy.style.top = (player.offsetTop + 10) + "px";
          enemy.style.left = (player.offsetLeft + 10) + "px";
          clearInterval(enemy.dataset.timer);
          setTimeout(function() {
              enemy.remove ();
              createEnemy();
          }, 500);
    die();
  }
}


function die() {
      // уменьшаем количество жизней
      colichestvoLifes = colichestvoLifes - 1;
            // если количество жизней равно нулю, то вызываем функцию КонецИгра
            if (colichestvoLifes == 0) {
                konecIgra ();  
            }
      // удаляем блок жизней
      udalenieJizneyBlock ();
      // создаем новый блок жизней с учетом переменной colichestvoLifes
      sozdanieJizneyBlock ();              
}



// создание функции конца игры

function sozdanieKonecIgra () {
  // создание блока див
  var div = document.createElement ("div");
  // присваиваем айди "конец-игра"
  div.id = "konec-igra";
  // созданием заголовок
  let h2 = document.createElement ("h2");
  // прописываем в заголовке "Игра окончена!
  h2.innerText = "Игра окончена!";
  // создаем заголовок третьего уровня
  let h3 = document.createElement ("h3");
  // прописываем "Вы набрали.."
  h3.innerText = "Вы набрали: " + colichestvoOchkov + " очков";
  // вкладываем заголовки в блок див
  div.appendChild (h2);
  div.appendChild (h3);
  // вкладываем блок див в блок Игра поле
  igraPole.appendChild (div);
  timerBlock.innerText = 0;
  clearInterval(chasy);
}


/*******************************
Функции для звуков
*********************************/

function soundFon() {
    var audioF = new Audio(); // Создаём новый элемент Audio
    audioF.src = 'Fon.mp3'; // Указываем путь к звуку 
    audioF.play (); // запускаем
}

function stopFon() {
    audioF.pause(); // стоп звук
}

function soundVistrel() {
    var audioV = new Audio(); // Создаём новый элемент Audio
    audioV.src = 'Vistrel.mp3'; // Указываем путь к звуку 
    audioV.play (); // запускаем
}

function soundZombi() {
    var audioZ = new Audio(); // Создаём новый элемент Audio
    audioZ.src = 'Zombi.mp3'; // Указываем путь к звуку 
    audioZ.play (); // запускаем
}

function soundRevzombi() {
    var audioR = new Audio(); // Создаём новый элемент Audio
    audioR.src = 'Rev-zombi.mp3'; // Указываем путь к звуку 
    audioR.play (); // запускаем
}

function soundProbka() {
    var audioP = new Audio(); // Создаём новый элемент Audio
    audioP.src = 'Probka.mp3'; // Указываем путь к звуку
    audioP.play (); // запускаем
}


function soundKoniec() {
    var audioK = new Audio(); // Создаём новый элемент Audio
    audioK.src = 'Koniec.mp3'; // Указываем путь к звуку 
    audioK.play (); // запускаем
}


/****************************
функции для удаления элементов игры
***************************/

// функция удаления стартового блока
function udalenieStartBlock () {
   // удаляем стартблок
   startBlock.remove ();
}


// функция удаления Таймерблока
function udalenieTimerBlock () {
    // выбираем заголовок с таймерблоком
    let h2 = document.querySelector ("h2");
    // удаляем таймерблок
    h2.remove ();
}


// функция удаления блока очков
function udalenieOchkovBlock () {
   // удаляем блок очков
   stars.remove ();
}


// функция удаления блока жизней
function udalenieJizneyBlock () {
   // удаляем блок жизней
   lifes.remove ();
}


// функция удаления врага
function udalenieEnemy () {
   // выбираем по селектору блок врага
   let enemy = document.querySelector (".enemy");
   // удаляем блок врага
   enemy.remove ();
} 

// функция очистки игрового поля
function ochistkaIgrovogoPolia () {
  igraPole.innerText = "";
}
