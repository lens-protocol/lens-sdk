import { vi } from 'vitest';
import type { IStorage } from '../../dist';
import type {
  IObservableStorageProvider,
  StorageProviderSubscriber,
  StorageSubscriber,
  StorageSubscription,
} from '../IStorage';

export function mockStorageProvider(
  initial: string | null = null,
): IObservableStorageProvider {
  let internalStorage: string | null = initial;

  return {
    getItem: vi.fn(async (_key: string) => internalStorage),

    setItem: vi.fn(async (_key: string, _value: string) => {
      internalStorage = _value;
    }),

    removeItem: vi.fn(async (_key: string) => {
      internalStorage = null;
    }),

    subscribe: vi.fn(
      (
        _key: string,
        _subscriber: StorageProviderSubscriber,
      ): StorageSubscription => {
        return {
          unsubscribe() {},
        };
      },
    ),
  };
}

// Simulates actual serialization/deserialization.
// Otherwise it might keep references to the actual original objects and it might trick
// consumer tests to think they are deserializing correctly (i.e. it might let them thing they
// are recreating the correct object with appropriate prototype chains while they don't).
function mockStorageRoundTrip(data: unknown): unknown {
  return JSON.parse(JSON.stringify(data));
}

export interface IMockedStorage<T> extends IStorage<T> {
  simulateUpdate(newData: T | null, oldData: T | null): void;
}

export function mockStorage<T>(initial: T | null = null): IMockedStorage<T> {
  let internalStorage = mockStorageRoundTrip(initial);

  return {
    get: vi.fn(async () => internalStorage as T | null),

    set: vi.fn(async (data: T) => {
      internalStorage = JSON.parse(JSON.stringify(data));
    }),

    reset: vi.fn(async () => {
      internalStorage = null;
    }),

    subscribe: vi.fn(
      (_subscriber: StorageSubscriber<T>): StorageSubscription => {
        return {
          unsubscribe() {},
        };
      },
    ),

    simulateUpdate(newData: T | null, oldData: T | null): void {
      for (const [subscriber] of vi.mocked(this.subscribe).mock.calls) {
        subscriber(newData, oldData);
      }
    },
  };
}
