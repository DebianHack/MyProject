
// главный файл, в котором я буду вызывать необходимые функции и действия
function start () {
  // вызов функции создания стартового блока
  sozdanieStartBlock ();
  // при клике на кнопку "Начать"" запускаем игру
  startKnopka.onclick = nachat; 
}
start ();


// функция начала игры
function nachat () {
  // присваиваем переменной статус значение "начать"
  status = "nachat";
  // удаляем стартблок
  udalenieStartBlock ();
  // вызов функции создание блока таймера
  sozdanieTimerBlock ()
  // вызов функции создания блока очков
  sozdanieOchkovBlock (); 
  // вызов функции sozdanieJizney
  sozdanieJizneyBlock ();
  // создаем игрока - доктора
  sozdaniePlayer ();
  // вызов функции обратного отсчета таймера
  timerIgra ();
  // создаем врага
  createEnemy ();
  soundFon(); 
}


function konecIgra () {
  // присваиваем переменной статус значение "конец"
  status = "koniec"; 
  soundKoniec(); 
  // удаляем блок жизней
  udalenieJizneyBlock ();
  // удаляем блок очков
  udalenieOchkovBlock ();
  // очищаем игровое поле
  ochistkaIgrovogoPolia ();
  // запускаем функцию создание Конец Игра
  sozdanieKonecIgra ();
  // удаление врагов
  //udalenieEnemy ();
  setTimeout ("location.reload()", 3000);
}


function timerIgra () {
// включение таймера игры посекундно
chasy = setInterval (function() {
    timerBlock.innerText = timerBlock.innerText - 1;
        // условие если время окончено, то таймер возвращается к 30 и исчезают шарик, очки и жизни
        if (timerBlock.innerText == 0) {
           clearInterval(chasy);
           konecIgra ();         
           }
  }, 1000); 
}
