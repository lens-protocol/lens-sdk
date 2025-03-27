import { Result, ResultAsync, ResultAwareError, ok, okAsync } from '@lens-protocol/types';

import type {
  IStorageItem,
  IStorageSchema,
  SchemaMismatchError,
  StorageMetadata,
} from './BaseStorageSchema';
import type {
  IObservableStorageProvider,
  IStorage,
  IStorageProvider,
  StorageSubscriber,
  StorageSubscription,
} from './IStorage';

/**
 * An error originating from the SDK storage layer.
 *
 * Note: This is unrelated to Grove storage.
 */
export class StorageError extends ResultAwareError {
  name = 'StorageError' as const;
}

const safeJsonParse = Result.fromThrowable(JSON.parse, (err) => StorageError.from(err));
const safeJsonStringify = Result.fromThrowable(JSON.stringify, (err) => StorageError.from(err));

/**
 * An implementation of `IStorage` with support for migration strategies
 */
export class Storage<Data> implements IStorage<Data> {
  protected storageItem: IStorageItem<Data> | null = null;

  constructor(
    protected readonly schema: IStorageSchema<Data>,
    protected readonly provider: IStorageProvider | IObservableStorageProvider,
  ) {}

  get(): Data | null {
    return this.storageItem?.data ?? null;
  }

  reset(): ResultAsync<Storage<Data>, StorageError> {
    const promise = Promise.any([this.provider.removeItem(this.schema.key)]);
    return ResultAsync.fromPromise(promise, (err) => StorageError.from(err)).andThen((_) => {
      this.storageItem = null;
      return ok(this);
    });
  }

  set(data: Data): ResultAsync<Storage<Data>, SchemaMismatchError | StorageError> {
    const metadata: StorageMetadata = {
      createdAt: this.storageItem?.metadata.createdAt ?? Date.now(),
      updatedAt: Date.now(),
      version: this.schema.version,
    };

    return this.schema.process({ data, metadata }).andThen((storageItem) => {
      return safeJsonStringify(storageItem).asyncAndThen((json) => {
        const promise = Promise.any([this.provider.setItem(this.schema.key, json)]);
        return ResultAsync.fromPromise(promise, (err) => StorageError.from(err)).andThen(() => {
          this.storageItem = storageItem;
          return ok(this);
        });
      });
    });
  }

  resume(): ResultAsync<IStorage<Data>, SchemaMismatchError | StorageError> {
    const promise = Promise.any([this.provider.getItem(this.schema.key)]);

    return ResultAsync.fromPromise(promise, (err) => StorageError.from(err))
      .andThen((value) => {
        if (value === null) {
          return okAsync(null);
        }
        return this.parse(value);
      })
      .map((data) => {
        this.storageItem = data;
        return this;
      });
  }

  subscribe(subscriber: StorageSubscriber<Data>): StorageSubscription {
    // not all implementations needs to support an observable storage
    if (!('subscribe' in this.provider)) {
      return {
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        unsubscribe() {},
      };
    }

    return this.provider.subscribe(this.schema.key, async (newValue, oldValue) => {
      const newItem = newValue
        ? await this.parse(newValue).unwrapOr({ data: null })
        : { data: null };
      const oldItem = oldValue
        ? await this.parse(oldValue).unwrapOr({ data: null })
        : { data: null };
      subscriber(newItem.data, oldItem.data);
    });
  }

  static create<D>(schema: IStorageSchema<D>, provider: IStorageProvider): Storage<D> {
    // biome-ignore lint/complexity/noThisInStatic: valid use case
    return new this(schema, provider);
  }

  private parse(
    value: string,
  ): ResultAsync<IStorageItem<Data>, StorageError | SchemaMismatchError> {
    return safeJsonParse(value).asyncAndThen(this.schema.process);
  }
}
