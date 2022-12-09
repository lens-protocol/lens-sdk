import { IStorage, IStorageProvider } from '../IStorage';

export function mockStorageProvider(initial: string | null = null): IStorageProvider {
  let internalStorage: string | null = initial;

  return {
    getItem: jest.fn<Promise<string | null>, [string]>(async () => internalStorage),

    setItem: jest.fn<Promise<void>, [string, string]>(async (data) => {
      internalStorage = data;
    }),

    removeItem: jest.fn<Promise<void>, [string]>(async () => {
      internalStorage = null;
    }),
  };
}

// Simulates actual serialization/deserialization.
// Otherwise it might keep references to the actual original objects and it might trick
// consumer tests to think they are deserializing correctly (i.e. it might let them thing they
// are recreating the correct object with appropriate prototype chains while they don't).
export function mockStorageRoundTrip(data: unknown): unknown {
  return JSON.parse(JSON.stringify(data));
}

export function mockStorage<T>(initial: T | null = null): IStorage<T> {
  let internalStorage: unknown | null = mockStorageRoundTrip(initial);

  return {
    get: jest.fn<Promise<T | null>, []>(async () => internalStorage as T | null),

    set: jest.fn<Promise<void>, [T]>(async (data) => {
      internalStorage = JSON.parse(JSON.stringify(data));
    }),

    reset: jest.fn<Promise<void>, []>(async () => {
      internalStorage = null;
    }),
  };
}
