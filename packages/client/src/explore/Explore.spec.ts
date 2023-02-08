import { mumbaiSandbox } from '../consts/environments';
import { ProfileSortCriteria, PublicationSortCriteria } from '../graphql/types.generated';
import { Explore } from './Explore';

const testConfig = {
  environment: mumbaiSandbox,
};

describe(`Given the ${Explore.name} configured to work with sandbox`, () => {
  describe(`when the instance is not authenticated and method ${Explore.prototype.explorePublications.name} is called`, () => {
    it(`should execute successfully`, async () => {
      const explore = new Explore(testConfig);

      await expect(
        explore.explorePublications({
          sortCriteria: PublicationSortCriteria.TopCommented,
        }),
      ).resolves.not.toThrow();
    });
  });

  describe(`when the instance is authenticated and method ${Explore.prototype.exploreProfiles.name} is called`, () => {
    it(`should execute successfully`, async () => {
      const explore = new Explore(testConfig);

      await expect(
        explore.exploreProfiles({
          sortCriteria: ProfileSortCriteria.MostFollowers,
        }),
      ).resolves.not.toThrow();
    });
  });
});
