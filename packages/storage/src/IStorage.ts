import type { ResultAsync } from '@lens-protocol/types';
import type { SchemaMismatchError } from './BaseStorageSchema';
import type { StorageError } from './Storage';

/**
 * A generic storage subscriber
 *
 * @internal
 */
export type StorageSubscriber<Data> = (newData: Data | null, oldData: Data | null) => void;

/**
 * A string storage subscriber
 */
export type StorageProviderSubscriber = StorageSubscriber<string>;

/**
 * A storage provider that supports asynchronous storage of key-value pairs
 */
export interface IStorageProvider {
  getItem(key: string): Promise<string | null> | string | null;
  setItem(key: string, value: string): Promise<string> | Promise<void> | void | string;
  removeItem(key: string): Promise<string> | Promise<void> | void;
}

export type StorageSubscription = {
  unsubscribe(): void;
};

/**
 * An observable storage provider that supports asynchronous storage of key-value pairs
 */
export interface IObservableStorageProvider extends IStorageProvider {
  subscribe(key: string, subscriber: StorageProviderSubscriber): StorageSubscription;
}

/**
 * @internal
 */
export interface IStorage<Data> {
  set(data: Data): ResultAsync<IStorage<Data>, SchemaMismatchError | StorageError>;
  get(): Data | null;
  reset(): ResultAsync<IStorage<Data>, StorageError>;
  resume(): ResultAsync<IStorage<Data>, SchemaMismatchError | StorageError>;
  subscribe(subscriber: StorageSubscriber<Data>): StorageSubscription;
}
