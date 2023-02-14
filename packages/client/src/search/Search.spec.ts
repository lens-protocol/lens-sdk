import { mumbaiSandbox } from '../consts/environments';
import { Search } from './Search';

const testConfig = {
  environment: mumbaiSandbox,
};

describe(`Given the ${Search.name} configured to work with sandbox`, () => {
  describe(`when the method ${Search.prototype.profiles.name} is called`, () => {
    it('should execute with success', async () => {
      const search = new Search(testConfig);

      await expect(
        search.profiles({
          query: 'test',
          limit: 10,
        }),
      ).resolves.not.toThrow();
    });

    it('should paginate to the next page if there are more results', async () => {
      const search = new Search(testConfig);

      const result = await search.searchProfiles({
        query: 'test',
        limit: 10,
      });

      expect(result.items.length).not.toBe(0);

      const nextResult = await result.next();

      expect(nextResult).not.toBe(null);
      expect(nextResult?.items.length).not.toBe(0);
    });

    it('should paginate between pages with the same instance of results', async () => {
      const search = new Search(testConfig);

      const result = await search.searchProfiles({
        query: 'test',
        limit: 10,
      });

      const nextResult = await result.next();

      expect(nextResult).not.toBe(null);
      expect(nextResult?.items.length).not.toBe(0);

      const prevResult = await result?.prev();

      expect(prevResult?.items).toEqual(result.items);
    });
  });

  describe(`when the method ${Search.prototype.publications.name} is called`, () => {
    it('should execute with success', async () => {
      const search = new Search(testConfig);

      await expect(
        search.publications({
          query: 'test',
          limit: 10,
        }),
      ).resolves.not.toThrow();
    });
  });
});
