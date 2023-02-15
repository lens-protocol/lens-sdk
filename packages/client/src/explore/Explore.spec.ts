import { Explore } from './Explore';
import { mumbaiSandbox } from '../consts/environments';
import { ProfileSortCriteria, PublicationSortCriteria } from '../graphql/types.generated';

const testConfig = {
  environment: mumbaiSandbox,
};

describe(`Given the ${Explore.name} configured to work with sandbox`, () => {
  describe(`when the method ${Explore.prototype.publications.name} is called`, () => {
    it(`should execute successfully`, async () => {
      const explore = new Explore(testConfig);

      await expect(
        explore.publications({
          sortCriteria: PublicationSortCriteria.TopCommented,
        }),
      ).resolves.not.toThrow();
    });
  });

  describe(`when the method ${Explore.prototype.profiles.name} is called`, () => {
    it(`should execute successfully`, async () => {
      const explore = new Explore(testConfig);

      await expect(
        explore.profiles({
          sortCriteria: ProfileSortCriteria.MostFollowers,
        }),
      ).resolves.not.toThrow();
    });
  });
});
