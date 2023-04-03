import { $ } from '../$';
import { Storage } from '../Storage';

let inactiveTimer = 0;

setInterval(() => {
	inactiveTimer++;
	if (inactiveTimer > 90) {
		Storage.set('active', false);
	}
}, 1000);

$.textarea()?.addEventListener('input', () => {
	Storage.set('active', true);
	inactiveTimer = 0;
});
