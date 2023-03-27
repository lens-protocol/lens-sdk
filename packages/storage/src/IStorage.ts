export type StorageSubscription = {
  unsubscribe(): void;
};

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
 * A storage provider that supports asynchronous storage of arbitrary data as strings
 */
export interface IStorageProvider {
  getItem(key: string): Promise<string | null> | string | null;
  setItem(key: string, value: string): Promise<string> | Promise<void> | void | string;
  removeItem(key: string): Promise<string> | Promise<void> | void;
}

/**
 * An observable storage provider that supports asynchronous storage of arbitrary data as strings
 */
export interface IObservableStorageProvider extends IStorageProvider {
  subscribe(key: string, subscriber: StorageProviderSubscriber): StorageSubscription;
}

/**
 * @internal
 */
export interface IStorage<Data> {
  set(data: Data): Promise<void>;
  get(): Promise<Data | null>;
  reset(): Promise<void>;
  subscribe(subscriber: StorageSubscriber<Data>): StorageSubscription;
}
