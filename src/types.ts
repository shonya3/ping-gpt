export interface StorageItems {
	active: boolean;
}

export type Option<T> = T | null;

export interface ExtensionStorage<T> {
	get: () => Promise<Record<string, any>>;
	set: <Key extends keyof T>(key: Key, value: T[Key]) => Promise<void>;
	getOrDefault: <Key extends keyof T>(key: Key, defaultValue: T[Key]) => Promise<T[Key]>;
	clearAll: () => Promise<void>;
	delete: (key: keyof T) => Promise<void>;
}
