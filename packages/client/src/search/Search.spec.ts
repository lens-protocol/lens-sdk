import { buildTestEnvironment } from '../__helpers__';
import { Search } from './Search';

const testConfig = {
  environment: buildTestEnvironment(),
};

describe(`Given the ${Search.name} configured to work with the test environment`, () => {
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
