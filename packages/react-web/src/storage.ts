import { IObservableStorageProvider, StorageProviderSubscriber } from '@lens-protocol/storage';

import { window } from './globals';

class LocalStorageProvider implements IObservableStorageProvider {
  private subscribers = new Map<string, StorageProviderSubscriber[]>();

  getItem(key: string) {
    return window?.localStorage.getItem(key) ?? null;
  }

  setItem(key: string, value: string) {
    window?.localStorage.setItem(key, value);
  }

  removeItem(key: string) {
    window?.localStorage.removeItem(key);
  }

  subscribe(key: string, subscriber: StorageProviderSubscriber) {
    if (this.subscribers.has(key)) {
      this.subscribers.get(key)?.push(subscriber);
    } else {
      this.subscribers.set(key, [subscriber]);
    }

    if (this.subscribers.size === 1) {
      this.listenToStorageEvent();
    }

    return {
      unsubscribe: () => {
        const subscribers = this.subscribers.get(key) ?? [];

        const index = subscribers.indexOf(subscriber);

        if (index > -1) {
          subscribers.splice(index, 1);
        }

        if (subscribers.length === 0) {
          this.subscribers.delete(key);
        }

        if (this.subscribers.size === 0) {
          this.stopListeningToStorageEvent();
        }
      },
    };
  }

  private onStorageEvent = (event: StorageEvent) => {
    if (event.storageArea !== window?.localStorage) {
      return;
    }

    if (event.key && this.subscribers.has(event.key)) {
      const subscribers = this.subscribers.get(event.key) ?? [];
      subscribers.forEach((subscriber) => subscriber(event.newValue, event.oldValue));
    }
  };

  private listenToStorageEvent() {
    window?.addEventListener('storage', this.onStorageEvent);
  }

  private stopListeningToStorageEvent() {
    window?.removeEventListener('storage', this.onStorageEvent);
  }
}

export function localStorage(): IObservableStorageProvider {
  return new LocalStorageProvider();
}
