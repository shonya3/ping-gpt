import { $ } from '../$';
import { Storage } from '../Storage';
import { getSecondsUntilReload, rateLimit } from './lib';
import { TimerElement } from './timer-element/TimerElement';

TimerElement.define();

const timerElement = document.createElement('timer-element');
document.body.append(timerElement);

const reactivate = async () => {
	inactiveTimer = 0;

	const active = await Storage.getOrDefault('active', false);
	if (!active) {
		Storage.set('active', true);
	}
};

let inactiveTimer = 0;

$.textarea()?.addEventListener('input', reactivate);
window.addEventListener('pointermove', rateLimit(reactivate, 1000));

setInterval(() => {
	inactiveTimer++;
	if (inactiveTimer > 90) {
		Storage.set('active', false);
	}
}, 1000);

setInterval(() => {
	timerElement.value = getSecondsUntilReload(inactiveTimer);
	console.log(timerElement);
}, 1000);
