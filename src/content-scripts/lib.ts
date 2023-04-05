import { RELOAD_SECONDS } from '../consts';
import { AnyFunction } from '../types';

export const getSecondsUntilReload = (inactiveTimer: number, secondsReload = RELOAD_SECONDS) => {
	return secondsReload - inactiveTimer;
};

export const rateLimit = <T extends AnyFunction>(f: T, timeoutMs: number) => {
	let canRun = true;
	return (...args: Parameters<T>): ReturnType<T> | void => {
		if (!canRun) return;
		const result = f(args);
		canRun = false;
		setTimeout(() => {
			canRun = true;
		}, timeoutMs);

		return result;
	};
};
