import './style.css';
import { rosario } from './assets/js/rosario-core.js';

const formatTime = (value) => `${value < 10 ? 0 : ''}${value}`;

// To match October 16
function showTime(plannedHour = 19) {
  const PLANNED_HOUR = plannedHour;
  const DAY_TIME = 24;
  const timeEl = document.querySelector('#time');
  const time = new Date();
  const hours = time.getHours();
  const hoursLeft =
    hours >= PLANNED_HOUR
      ? DAY_TIME - hours + PLANNED_HOUR
      : -(hours - PLANNED_HOUR + 1);
  const minutesLeft = -(time.getMinutes() - 60);
  const secondsLeft = -(time.getSeconds() - 60);
  let timeText = `${formatTime(hoursLeft)}:${formatTime(
    minutesLeft
  )}:${formatTime(secondsLeft)} hrs`;
  if (hours % plannedHour === 0) timeText = 'En curso';
  timeEl.innerText = timeText;
}

function showDate(plannedDate = '2021/10/16') {
  const _MS_PER_DAY = 1000 * 60 * 60 * 24;
  const timeEl = document.querySelector('#time');
  const PLANNED_DATE = new Date(plannedDate);
  const today = new Date();
  const diffTime =  Math.abs(PLANNED_DATE - today);
  const diffDays = Math.ceil(diffTime / _MS_PER_DAY); 
  const diffHours = Math.ceil(diffTime / (1000 * 60 * 60)); 
  timeEl.innerText = `${diffDays} días`;
}

//setInterval(() => showTime(), 1000);
showDate();

const _rosario = new rosario();
_rosario.drawMisterio();

const beforeEl = document.querySelector('.befR');
const nextEl = document.querySelector('.nextR');
const startEl = document.querySelector('.startR');

nextEl.addEventListener('click', () => _rosario.emulate('next'));
beforeEl.addEventListener('click', () => _rosario.emulate('before'));
startEl.addEventListener('click', () => _rosario.emulate('start'));
