import { mumbaiSandbox } from '../consts/environments';
import { Search } from './Search';

const testConfig = {
  environment: mumbaiSandbox,
};

describe(`Given the ${Search.name} configured to work with sandbox`, () => {
  describe(`when the method ${Search.prototype.searchProfiles.name} is called`, () => {
    it('should execute with success', async () => {
      const search = new Search(testConfig);

      await expect(
        search.searchProfiles({
          query: 'test',
          limit: 10,
        }),
      ).resolves.not.toThrow();
    });
  });

  describe(`when the method ${Search.prototype.searchPublications.name} is called`, () => {
    it('should execute with success', async () => {
      const search = new Search(testConfig);

      await expect(
        search.searchPublications({
          query: 'test',
          limit: 10,
        }),
      ).resolves.not.toThrow();
    });
  });
});
