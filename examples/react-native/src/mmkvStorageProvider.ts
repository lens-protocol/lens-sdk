import {IStorageProvider, StorageProviderSubscriber} from '@lens-protocol/react';
import {MMKV} from 'react-native-mmkv';

class MmkvStorageProvider implements IStorageProvider {
  private storage = new MMKV();

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

  subscribe(key: string, subscriber: StorageProviderSubscriber) {
    return {
      unsubscribe: () => {},
    };
  }
}

export function mmkvStorageProvider(): IStorageProvider {
  return new MmkvStorageProvider();
}
