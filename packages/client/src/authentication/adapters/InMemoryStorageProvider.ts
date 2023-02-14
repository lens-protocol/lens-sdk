import { IStorageProvider } from '@lens-protocol/storage';

export class InMemoryStorageProvider implements IStorageProvider {
  private readonly storage;

  constructor() {
    this.storage = new Map<string, string>();
  }

  getItem(key: string) {
    return this.storage.get(key) || null;
  }

  setItem(key: string, value: string) {
    this.storage.set(key, value);
  }

  removeItem(key: string) {
    this.storage.delete(key);
  }
}
