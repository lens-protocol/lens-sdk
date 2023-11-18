import { IStorageProvider } from '@lens-protocol/storage';
import { MMKV } from 'react-native-mmkv';

class MmkvStorageProvider implements IStorageProvider {
  private readonly storage;

  constructor() {
    this.storage = new MMKV({ id: 'lens-sdk-storage' });
  }

  getItem(key: string) {
    return this.storage.getString(key) ?? null;
  }

  setItem(key: string, value: string) {
    this.storage.set(key, value);
  }

  removeItem(key: string) {
    this.storage.delete(key);
  }
}

export function storage(): IStorageProvider {
  return new MmkvStorageProvider();
}
