import { Storage } from './Storage';
import { CHAT_URL } from './consts';

const time = () => new Date().toLocaleTimeString('ru');
const refreshTabs = ({ url, log }: { url: string; log: boolean }) => {
	chrome.tabs.query({ url }).then(tabs => {
		for (const tab of tabs) {
			if (tab.id) {
				chrome.tabs.reload(tab.id);
				if (log) console.log(`${time()}: pinged tab:${tab.id}`);
			}
		}
	});
};

chrome.alarms.create({ periodInMinutes: 2 });
chrome.alarms.onAlarm.addListener(async () => {
	try {
		const active = await Storage.getOrDefault('active', false);
		if (active) return;
		refreshTabs({ url: CHAT_URL, log: true });
	} catch (err) {
		console.warn(err);
	}
});
