import {
  assertErr,
  assertOk,
  Deferred,
  InvariantError,
  never,
} from '@lens-protocol/types';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { type TypeOf, z } from 'zod';
import { mockStorageProvider } from './__helpers__/mocks';
import {
  BaseStorageSchema,
  type IStorageItem,
  SchemaMismatchError,
} from './BaseStorageSchema';
import { InMemoryStorageProvider } from './InMemoryStorageProvider';
import type { IStorageProvider } from './IStorage';
import { Storage } from './Storage';

const schema = z.object({
  name: z.string(),
});

const key = 'STORAGE_KEY';
const storageSchema = new BaseStorageSchema(key, schema);

function createStorage(provider: IStorageProvider) {
  return Storage.create(storageSchema, provider);
}

describe(`Given a ${Storage.name} instance`, () => {
  const data = { name: 'Pawel' };
  const metadata = {
    createdAt: Date.now(),
    updatedAt: Date.now(),
    version: 1,
  };
  const storageItem = {
    data: data,
    metadata: metadata,
  };

  afterEach(async () => {
    vi.restoreAllMocks();
  });

  describe(`When the '${Storage.prototype.get.name}' method gets invoked`, () => {
    it('Then it should return the stored data', async () => {
      const mockedStorageProvider = mockStorageProvider(
        JSON.stringify(storageItem),
      );

      const result = await createStorage(mockedStorageProvider)
        .resume()
        .map((storage) => storage.get());

      assertOk(result);
      expect(result.value).toEqual(data);
      expect(mockedStorageProvider.getItem).toHaveBeenCalledWith(key);
    });

    it('Then it should return `null` if empty', async () => {
      const mockedStorageProvider = mockStorageProvider();

      const result = await createStorage(mockedStorageProvider)
        .resume()
        .map((storage) => storage.get());

      assertOk(result);
      expect(result.value).toBeNull();
      expect(mockedStorageProvider.getItem).toHaveBeenCalledWith(key);
    });
  });

  describe(`When the '${Storage.prototype.resume.name}' method gets invoked`, () => {
    it('Then it should migrate data with the migration strategy provided', async () => {
      const newSchema = z.object({
        userName: z.string(),
      });
      const expectedMigratedData = { userName: 'Pawel' };

      class TestStorageSchema extends BaseStorageSchema<typeof newSchema> {
        version = 2;

        protected async migrate(
          storageItem: IStorageItem<unknown>,
        ): Promise<TypeOf<typeof newSchema>> {
          const storageVersion = storageItem.metadata.version;

          switch (storageVersion) {
            case 1: {
              const version1Data = schema.parse(storageItem.data);

              return {
                userName: version1Data.name,
              };
            }
            default: {
              never();
            }
          }
        }
      }

      const mockedStorageProvider = mockStorageProvider(
        JSON.stringify(storageItem),
      );

      const result = await Storage.create(
        new TestStorageSchema(key, newSchema),
        mockedStorageProvider,
      )
        .resume()
        .map((storage) => storage.get());

      assertOk(result);
      expect(result.value).toEqual(expectedMigratedData);
      expect(mockedStorageProvider.getItem).toHaveBeenCalledWith(key);
    });

    it(`Then it should fail with a 'InvariantError' if a migration to newest version was not provided`, async () => {
      const mockedStorageProvider = mockStorageProvider(
        JSON.stringify(storageItem),
      );

      class TestStorageSchema extends BaseStorageSchema<typeof schema> {
        version = 2;
      }

      const result = await Storage.create(
        new TestStorageSchema(key, schema),
        mockedStorageProvider,
      ).resume();

      assertErr(result);
      expect(result.error).toBeInstanceOf(InvariantError);
    });

    it(`Then it should fail with a '${SchemaMismatchError.name}' if 'data' field is corrupted`, async () => {
      const mockedStorageProvider = mockStorageProvider(
        JSON.stringify({
          ...storageItem,
          data: {
            bar: 'foo',
          },
        }),
      );

      const result = await createStorage(mockedStorageProvider).resume();
      assertErr(result);

      expect(result.error).toBeInstanceOf(SchemaMismatchError);
      expect(result.error.toString()).toMatchInlineSnapshot(`
        "SchemaMismatchError: Schema mismatch for STORAGE_KEY with errors: [
          {
            "code": "invalid_type",
            "expected": "string",
            "received": "undefined",
            "path": [
              "name"
            ],
            "message": "Required"
          }
        ]"
      `);
    });

    it(`Then it should fail with a '${SchemaMismatchError.name}' if 'metadata' field is corrupted`, async () => {
      const mockedStorageProvider = mockStorageProvider(
        JSON.stringify({
          ...storageItem,
          metadata: {
            bar: 'foo',
          },
        }),
      );

      const result = await createStorage(mockedStorageProvider).resume();

      assertErr(result);
      expect(result.error).toBeInstanceOf(SchemaMismatchError);
      expect(result.error).toMatchInlineSnapshot(`
        [SchemaMismatchError: Schema mismatch for STORAGE_KEY with errors: [
          {
            "code": "invalid_type",
            "expected": "number",
            "received": "undefined",
            "path": [
              "metadata",
              "version"
            ],
            "message": "Required"
          },
          {
            "code": "invalid_type",
            "expected": "number",
            "received": "undefined",
            "path": [
              "metadata",
              "createdAt"
            ],
            "message": "Required"
          },
          {
            "code": "invalid_type",
            "expected": "number",
            "received": "undefined",
            "path": [
              "metadata",
              "updatedAt"
            ],
            "message": "Required"
          },
          {
            "code": "unrecognized_keys",
            "keys": [
              "bar"
            ],
            "path": [
              "metadata"
            ],
            "message": "Unrecognized key(s) in object: 'bar'"
          }
        ]]
      `);
    });
  });

  describe(`When the '${Storage.prototype.set.name}' method gets invoked`, () => {
    it(`Then it should be immediately available in via the '${Storage.prototype.get.name}' method`, async () => {
      const result = await createStorage(new InMemoryStorageProvider())
        .resume()
        .andTee((storage) => storage.set(data))
        .map((storage) => storage.get());

      assertOk(result);
      expect(result.value).toEqual(data);
    });

    it('Then it should run the schema validation on the data', async () => {
      const result = await createStorage(new InMemoryStorageProvider())
        .resume()
        .andTee((storage) =>
          storage.set({
            name: '123',
            something: 'else',
            // biome-ignore lint/suspicious/noExplicitAny: it's a test!
          } as any),
        )
        .map((storage) => storage.get());

      assertOk(result);
      expect(result.value).toEqual({ name: '123' });
    });

    describe('for previously empty storage', () => {
      it('Then it should set properly data and metadata with current date', async () => {
        const now = new Date('2020-01-01T00:00:00').valueOf();
        vi.spyOn(global.Date, 'now').mockImplementation(() => now);

        const mockedStorageProvider = mockStorageProvider();

        await createStorage(mockedStorageProvider)
          .resume()
          .andTee((storage) => storage.set(data));

        expect(mockedStorageProvider.setItem).toHaveBeenCalledWith(
          key,
          JSON.stringify({
            data: data,
            metadata: {
              version: metadata.version,
              createdAt: now,
              updatedAt: now,
            },
          }),
        );
      });
    });

    describe('for previously non empty storage', () => {
      it('Then it should set properly data and metadata with existing `createdAt` date', async () => {
        const now = new Date('2020-01-01T00:00:00').valueOf();
        vi.spyOn(global.Date, 'now').mockImplementation(() => now);

        const mockedStorageProvider = mockStorageProvider(
          JSON.stringify(storageItem),
        );

        const newData = {
          name: 'Josh',
        };
        await createStorage(mockedStorageProvider)
          .resume()
          .andTee((storage) => storage.set(newData));

        expect(mockedStorageProvider.setItem).toHaveBeenCalledWith(
          key,
          JSON.stringify({
            data: newData,
            metadata: {
              version: metadata.version,
              createdAt: metadata.createdAt,
              updatedAt: now,
            },
          }),
        );
      });
    });
  });

  describe(`When the "${Storage.prototype.reset.name}" method gets invoked`, () => {
    it('Then it should remove the storage data', async () => {
      const mockedStorageProvider = mockStorageProvider();

      await createStorage(mockedStorageProvider)
        .resume()
        .andTee((storage) => storage.reset());

      expect(mockedStorageProvider.removeItem).toHaveBeenCalledWith(key);
    });
  });

  describe('when subscribing to updates', () => {
    const oldStorageItem = {
      data: { name: 'Pawel' },
      metadata: {
        createdAt: Date.now(),
        updatedAt: Date.now(),
        version: 1,
      },
    };
    const newStorageItem = {
      data: { name: 'Cesare' },
      metadata: {
        createdAt: Date.now(),
        updatedAt: Date.now(),
        version: 1,
      },
    };

    it('Then it should call the subscriber with new data and old data', async () => {
      const oldValue = JSON.stringify(oldStorageItem);
      const mockedStorageProvider = mockStorageProvider(oldValue);

      const deferred = new Deferred<unknown>();

      await createStorage(mockedStorageProvider)
        .resume()
        .andTee((storage) => {
          storage.subscribe((newData, oldData) =>
            deferred.resolve({ newData, oldData }),
          );
        });

      const newValue = JSON.stringify(newStorageItem);
      const subscriber =
        vi.mocked(mockedStorageProvider.subscribe).mock.calls[0]?.[1] ??
        never();
      subscriber(newValue, oldValue);

      const result = await deferred.promise;
      expect(result).toEqual({
        newData: newStorageItem.data,
        oldData: oldStorageItem.data,
      });
    });
  });
});
