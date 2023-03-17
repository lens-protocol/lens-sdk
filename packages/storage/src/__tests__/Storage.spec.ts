import { Deferred, never } from '@lens-protocol/shared-kernel';
import { TypeOf, z } from 'zod';

import {
  BaseStorageSchema,
  IStorageItem,
  NoMigrationPathError,
  SchemaMismatchError,
} from '../BaseStorageSchema';
import { Storage } from '../Storage';
import { mockStorageProvider } from '../__helpers__/mocks';

describe(`Given a ${Storage.name} instance`, () => {
  const schema = z.object({
    name: z.string(),
  });

  const key = 'STORAGE_KEY';
  const storageSchema = new BaseStorageSchema(key, schema);

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
    jest.restoreAllMocks();
  });

  describe(`when the "${Storage.prototype.get.name}" method gets invoked`, () => {
    it('should return `null` when empty', async () => {
      const mockedStorageProvider = mockStorageProvider();
      const storage = Storage.createForSchema(storageSchema, mockedStorageProvider);

      const value = await storage.get();

      expect(value).toBeNull();
      expect(mockedStorageProvider.getItem).toHaveBeenCalledWith(key);
    });

    it('should return data', async () => {
      const mockedStorageProvider = mockStorageProvider(JSON.stringify(storageItem));

      const storage = Storage.createForSchema(storageSchema, mockedStorageProvider);

      const value = await storage.get();

      expect(value).toEqual(data);
      expect(mockedStorageProvider.getItem).toHaveBeenCalledWith(key);
    });

    it('should migrate data if a migration strategy was provided', async () => {
      const newSchema = z.object({
        userName: z.string(),
      });
      const expectedMigratedData = { userName: 'Pawel' };

      class TestStorageSchema extends BaseStorageSchema<typeof newSchema> {
        version = 2;

        protected migrate(storageItem: IStorageItem<unknown>): TypeOf<typeof newSchema> {
          const storageVersion = storageItem.metadata.version;

          switch (storageVersion) {
            case 1: {
              const version1Data = schema.parse(storageItem.data);

              return {
                userName: version1Data.name,
              };
            }
            default: {
              throw new NoMigrationPathError(this.key, storageVersion, this.version);
            }
          }
        }
      }

      const mockedStorageProvider = mockStorageProvider(JSON.stringify(storageItem));

      const storage = Storage.createForSchema(
        new TestStorageSchema(key, newSchema),
        mockedStorageProvider,
      );

      const value = await storage.get();

      expect(value).toEqual(expectedMigratedData);
      expect(mockedStorageProvider.getItem).toHaveBeenCalledWith(key);
    });

    it(`should throw ${NoMigrationPathError.name} if a migration to newest version was not provided`, async () => {
      const mockedStorageProvider = mockStorageProvider(JSON.stringify(storageItem));

      class TestStorageSchema extends BaseStorageSchema<typeof schema> {
        version = 2;
      }

      const storage = Storage.createForSchema(
        new TestStorageSchema(key, schema),
        mockedStorageProvider,
      );

      await expect(() => storage.get()).rejects.toThrow(new NoMigrationPathError(key, 1, 2));
    });

    it(`should throw ${SchemaMismatchError.name} if 'data' field is corrupted`, async () => {
      const mockedStorageProvider = mockStorageProvider(
        JSON.stringify({
          ...storageItem,
          data: {
            bar: 'foo',
          },
        }),
      );

      const storage = Storage.createForSchema(storageSchema, mockedStorageProvider);

      const getPromise = () => storage.get();

      await expect(getPromise).rejects.toThrow(SchemaMismatchError);
      await expect(getPromise).rejects.toThrowErrorMatchingInlineSnapshot(`
        "Schema mismatch for STORAGE_KEY with errors: [
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

    it(`should throw ${SchemaMismatchError.name} if 'metadata' field is corrupted`, async () => {
      const mockedStorageProvider = mockStorageProvider(
        JSON.stringify({
          ...storageItem,
          metadata: {
            bar: 'foo',
          },
        }),
      );

      const storage = Storage.createForSchema(storageSchema, mockedStorageProvider);

      const getPromise = () => storage.get();

      await expect(getPromise).rejects.toThrow(SchemaMismatchError);
      await expect(getPromise).rejects.toThrowErrorMatchingInlineSnapshot(`
        "Schema mismatch for STORAGE_KEY with errors: [
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
        ]"
      `);
    });
  });

  describe(`when the "${Storage.prototype.set.name}" method gets invoked`, () => {
    describe('for previously empty storage', () => {
      it('should set properly data and metadata with current date', async () => {
        const now = new Date('2020-01-01T00:00:00').valueOf();
        jest.spyOn(global.Date, 'now').mockImplementation(() => now);

        const mockedStorageProvider = mockStorageProvider();
        const storage = Storage.createForSchema(storageSchema, mockedStorageProvider);

        await storage.set(data);

        expect(mockedStorageProvider.setItem).toHaveBeenCalledWith(
          key,
          JSON.stringify({
            data: data,
            metadata: {
              ...metadata,
              createdAt: now,
              updatedAt: now,
            },
          }),
        );
      });
    });

    describe('for previously non empty storage', () => {
      it('should set properly data and metadata with existing `createdAt` date', async () => {
        const now = new Date('2020-01-01T00:00:00').valueOf();
        jest.spyOn(global.Date, 'now').mockImplementation(() => now);

        const mockedStorageProvider = mockStorageProvider(JSON.stringify(storageItem));

        const storage = Storage.createForSchema(storageSchema, mockedStorageProvider);

        const newData = {
          name: 'Josh',
        };

        await storage.set(newData);

        expect(mockedStorageProvider.setItem).toHaveBeenCalledWith(
          key,
          JSON.stringify({
            data: newData,
            metadata: {
              ...metadata,
              updatedAt: now,
            },
          }),
        );
      });
    });
  });

  describe(`when the "${Storage.prototype.reset.name}" method gets invoked`, () => {
    it('should remove the storage data', async () => {
      const mockedStorageProvider = mockStorageProvider();
      const storage = Storage.createForSchema(storageSchema, mockedStorageProvider);

      await storage.reset();

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

    it('should call the subscriber with new data and old data', async () => {
      const oldValue = JSON.stringify(oldStorageItem);
      const mockedStorageProvider = mockStorageProvider(oldValue);

      const deferred = new Deferred<unknown>();
      const storage = Storage.createForSchema(storageSchema, mockedStorageProvider);

      storage.subscribe((newData, oldData) => deferred.resolve({ newData, oldData }));

      const newValue = JSON.stringify(newStorageItem);
      const subscriber = jest.mocked(mockedStorageProvider.subscribe).mock.calls[0]?.[1] ?? never();
      subscriber(newValue, oldValue);

      const result = await deferred.promise;
      expect(result).toEqual({
        newData: newStorageItem.data,
        oldData: oldStorageItem.data,
      });
    });
  });
});
