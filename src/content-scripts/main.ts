import { RELOAD_SECONDS } from '../consts';
import { secondsLeft, rateLimit } from './lib';
import { TimerElement } from './timer-element/TimerElement';

TimerElement.define();
const timerElement = document.createElement('timer-element');
document.body.append(timerElement);

let secondsInactive = 0;
const reactivate = () => {
	secondsInactive = 0;
};

document.body.addEventListener('input', reactivate);
window.addEventListener('pointermove', rateLimit(reactivate, 1000));

setInterval(() => {
	secondsInactive++;
	timerElement.value = secondsLeft(secondsInactive, RELOAD_SECONDS);
	if (secondsInactive === RELOAD_SECONDS) {
		window.location.reload();
	}
}, 1000);
