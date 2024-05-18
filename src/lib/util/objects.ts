export function exclude<T extends object, K extends keyof T>(obj: T, ...keys: K[]): Omit<T, K>;
export function exclude<T extends object, K extends keyof T>(obj: T, keys: K[]): Omit<T, K>;
export function exclude<T extends object, K extends keyof T>(obj: T, keys: K[] | K[]): Omit<T, K> {
	const result = { ...obj };
	for (const key of keys) {
		delete result[key];
	}
	return result;
}
