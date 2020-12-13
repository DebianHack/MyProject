// stars = очки на игровом поле
var stars = null;
// переменная для статуса при удалении шариков с игрового поля
var status = "open"
// жизни на игровом поле
var lifes = null;
// количество жизней
var colichestvoLifes = 4;
// startBlock = блок со стартовой кнопкой
var startBlock = null;
// startKnopka = кнопка "начать"
var startKnopka = null;
// colichestvoOchkov = количество очков
var colichestvoOchkov = 0;
// timerBlock = таймер обратного отсчета
var timerBlock = null;
// igraPole = игровое поле
var igraPole = document.querySelector ("#game");
// infoblock - блок очков
var infoBlock = document.querySelector ("#infoblock");
// переменная таймера часов
var chasy = null;