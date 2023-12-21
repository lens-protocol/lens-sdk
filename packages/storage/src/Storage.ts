import { IStorageItem, IStorageSchema, StorageMetadata } from './BaseStorageSchema';
import {
  IObservableStorageProvider,
  IStorage,
  IStorageProvider,
  StorageSubscriber,
  StorageSubscription,
} from './IStorage';

/**
 * An implementation of `IStorage` with support for migration strategies
 */
export class Storage<Data> implements IStorage<Data> {
  protected constructor(
    protected readonly schema: IStorageSchema<Data>,
    protected readonly provider: IStorageProvider | IObservableStorageProvider,
  ) {}

  async get(): Promise<Data | null> {
    const storageItem = await this.getWithMetadata();

    return storageItem?.data ?? null;
  }

  async reset(): Promise<void> {
    await this.provider.removeItem(this.getStorageKey());
  }

  async set(data: Data): Promise<void> {
    const lastStorageItem = await this.getWithMetadata();

    const metadata: StorageMetadata = {
      createdAt: lastStorageItem?.metadata.createdAt ?? Date.now(),
      updatedAt: Date.now(),
      version: this.schema.version,
    };

    const storageItem: IStorageItem<Data> = { data, metadata };

    const json = JSON.stringify(storageItem);

    await this.provider.setItem(this.getStorageKey(), json);
  }

  subscribe(subscriber: StorageSubscriber<Data>): StorageSubscription {
    // not all implementations needs to support an observable storage
    if (!('subscribe' in this.provider)) {
      return {
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        unsubscribe() {},
      };
    }

    return this.provider.subscribe(this.getStorageKey(), async (newValue, oldValue) => {
      const newItem = newValue ? await this.parse(newValue) : { data: null };
      const oldItem = oldValue ? await this.parse(oldValue) : { data: null };
      subscriber(newItem.data, oldItem.data);
    });
  }

  private async getWithMetadata(): Promise<IStorageItem<Data> | null> {
    const json = await this.provider.getItem(this.getStorageKey());

    if (!json) {
      return null;
    }

    return this.parse(json);
  }

  protected async parse(json: string): Promise<IStorageItem<Data>> {
    const item: unknown = JSON.parse(json);

    return this.schema.process(item);
  }

  private getStorageKey(): string {
    return this.schema.key;
  }

  static createForSchema<D>(schema: IStorageSchema<D>, provider: IStorageProvider): IStorage<D> {
    return new Storage(schema, provider);
  }
}
