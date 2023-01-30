import {IStorageProvider} from '@lens-protocol/react';
import {MMKV} from 'react-native-mmkv';

class MmkvStorageProvider implements IStorageProvider {
  private readonly storage;

  constructor() {
    this.storage = new MMKV({id: 'lens-sdk-storage'});
  }

  async getItem(key: string) {
    const result = await this.storage.getString(key);

    return result ?? null;
  }

  setItem(key: string, value: string) {
    this.storage.set(key, value);
  }

  removeItem(key: string) {
    this.storage.delete(key);
  }

  // Required only when multiple threads modify the storage to make sure lens-sdk is in sync across tabs/devices
  subscribe() {
    return {
      unsubscribe: () => {},
    };
  }
}

export function mmkvStorageProvider(): IStorageProvider {
  return new MmkvStorageProvider();
}
