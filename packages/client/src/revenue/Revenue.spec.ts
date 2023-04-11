import { buildTestEnvironment, existingProfileId, existingPublicationId } from '../__helpers__';
import { Revenue } from './Revenue';

const testConfig = {
  environment: buildTestEnvironment(),
};

describe(`Given the ${Revenue.name} configured to work with the test environment`, () => {
  const revenue = new Revenue(testConfig);

  describe(`when the method ${Revenue.prototype.publication.name} is called`, () => {
    it(`should run successfully`, async () => {
      await expect(
        revenue.publication({ publicationId: existingPublicationId }),
      ).resolves.not.toThrow();
    });
  });

  describe(`when the method ${Revenue.prototype.profileFollow.name} is called`, () => {
    it(`should run successfully`, async () => {
      await expect(revenue.profileFollow({ profileId: existingProfileId })).resolves.not.toThrow();
    });
  });

  describe(`when the method ${Revenue.prototype.profilePublication.name} is called`, () => {
    it(`should run successfully`, async () => {
      await expect(
        revenue.profilePublication({ profileId: existingProfileId }),
      ).resolves.not.toThrow();
    });
  });
});
