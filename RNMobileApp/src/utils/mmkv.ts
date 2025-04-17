import { MMKV } from 'react-native-mmkv';

export const storage = new MMKV({
  id: 'session-storage',
});

export const SecureStoreAdapter = {
  getItem: (key: string) => {
    return storage.getString(key);
  },
  setItem: (key: string, value: string) => {
    storage.set(key, value);
  },
  removeItem: (key: string) => {
    storage.delete(key);
  },
};
