import { rosario, drawRosario} from "./assets/js/rosario-core.js";

const formatTime = value => `${value < 10 ? 0 : ''}${value}`;

function showTime(plannedHour=19) {
    const PLANNED_HOUR = plannedHour;
    const DAY_TIME = 24;
    const timeEl = document.querySelector('#time');
    const time = new Date();
    const hours = time.getHours();
    const hoursLeft = hours >= PLANNED_HOUR ?
        ((DAY_TIME - hours) + PLANNED_HOUR) :
        -(hours - PLANNED_HOUR);
    const minutesLeft = -(time.getMinutes() - 60);
    const secondsLeft = -(time.getSeconds() - 60);
    let timeText = `${formatTime(hoursLeft)}:${formatTime(minutesLeft)}:${formatTime(secondsLeft)} hrs`;
    if (hours % plannedHour === 0) timeText = 'En curso';
    timeEl.innerText = timeText;
}

setInterval(() => showTime(), 1000);

const graphRosario = new drawRosario(3);
const _rosario = new rosario();
_rosario.drawMisterio();

