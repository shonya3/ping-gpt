import { ExtensionStorage, StorageItems } from './types';

export const Storage = {
	getOrDefault: async (key, defaultValue) => {
		const resultObject = await chrome.storage.sync.get(key);
		if (!Object.hasOwn(resultObject, key)) {
			return defaultValue;
		}
		return resultObject[key];
	},
	get: () => chrome.storage.sync.get(),
	set: (key, value) => chrome.storage.sync.set({ [`${key}`]: value }),
	clearAll: () => chrome.storage.sync.clear(),
	delete: async key => chrome.storage.sync.remove(key),
} satisfies ExtensionStorage<StorageItems>;
