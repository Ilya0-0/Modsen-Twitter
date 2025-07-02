const StorageKeys = {
  THEME_KEY: 'theme',
  USER_DATA_KEY: 'userData',
} as const;

export type StorageKeysType = (typeof StorageKeys)[keyof typeof StorageKeys];

class StorageUtility {
  static setItem<T>(key: StorageKeysType, value: T): void {
    try {
      const jsonValue = JSON.stringify(value);
      localStorage.setItem(key, jsonValue);
    } catch {}
  }

  static getItem<T>(key: StorageKeysType): T | null {
    try {
      const jsonValue = localStorage.getItem(key);
      const value = jsonValue != null ? JSON.parse(jsonValue) : null;
      return value;
    } catch {
      return null;
    }
  }

  static removeItem(key: StorageKeysType): void {
    try {
      localStorage.removeItem(key);
    } catch {}
  }
}
export { StorageKeys, StorageUtility };
