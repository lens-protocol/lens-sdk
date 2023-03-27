import { assertError } from '@lens-protocol/shared-kernel';
import { z } from 'zod';

/**
 * Error thrown when the storage item does not match the validation schema
 */
export class SchemaMismatchError extends Error {
  name = 'SchemaMismatchError' as const;

  constructor(schemaId: string, errors: string) {
    super(`Schema mismatch for ${schemaId} with errors: ${errors}`);
  }
}

/**
 * Error thrown when no migration path is found between two versions
 */
export class NoMigrationPathError extends Error {
  name = 'NoMigrationPathError' as const;

  constructor(schemaId: string, fromVersion: number, toVersion: number) {
    super(`No migration path for schema ${schemaId} from version ${fromVersion} to ${toVersion}`);
  }
}

const storageMetadata = z
  .object({
    version: z.number().int().positive(),
    createdAt: z.number().int().positive(),
    updatedAt: z.number().int().positive(),
  })
  .strict();

export type StorageMetadata = z.infer<typeof storageMetadata>;

export interface IStorageItem<Data> {
  data: Data;
  metadata: StorageMetadata;
}

/**
 * A storage schema that can be used to migrate data between versions
 */
export interface IStorageSchema<Data> {
  get key(): string;
  get version(): number;

  process(item: unknown): Promise<IStorageItem<Data>>;
}

/**
 * A basic storage schema implementation without migration strategy.
 *
 * Use it directly of as the base class for specific schemas when migrations are required.
 */
export class BaseStorageSchema<
  T extends z.ZodSchema<Output, z.ZodTypeDef, Input>,
  Output = z.output<T>,
  Input = z.input<T>,
> implements IStorageSchema<Output>
{
  readonly version: number = 1;

  constructor(readonly key: string, private schema: T) {}

  async process(storageItemUnknown: unknown): Promise<IStorageItem<Output>> {
    const storageItem = this.parseStorageItem(storageItemUnknown);

    const data = this.migrate(storageItem);

    return Promise.resolve({ data, metadata: storageItem.metadata });
  }

  protected migrate(storageItem: IStorageItem<Input>): Output {
    const storageVersion = storageItem.metadata.version;
    if (this.version !== storageVersion) {
      throw new NoMigrationPathError(this.key, storageVersion, this.version);
    }

    // make sure we received correct shape from external storage
    return this.parseData(storageItem.data);
  }

  protected parseStorageItem(storageItem: unknown): IStorageItem<Input> {
    try {
      return (
        z
          .object({
            data: z.unknown(),
            metadata: storageMetadata,
          })
          .strict()
          // force casting required due to the bug in zod
          // https://github.com/colinhacks/zod/issues/493
          .parse(storageItem) as IStorageItem<Input>
      );
    } catch (error) {
      assertError(error);

      throw new SchemaMismatchError(this.key, error.message);
    }
  }

  protected parseData(data: Input): Output {
    try {
      const t = this.schema.parse(data);
      return t;
    } catch (error) {
      assertError(error);

      throw new SchemaMismatchError(this.key, error.message);
    }
  }
}
