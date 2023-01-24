import { Feed } from '.';
import {
  buildTestEnvironment,
  describeAuthenticatedScenario,
  existingProfileId,
} from '../__helpers__';

const testConfig = {
  environment: buildTestEnvironment(),
};

describe(`Given the ${Feed.name} configured to work with the test environment`, () => {
  describeAuthenticatedScenario()((getTestSetup) => {
    describe(`when the method ${Feed.prototype.fetch.name} is called`, () => {
      it('should execute with success', async () => {
        const { authentication } = getTestSetup();
        const feed = new Feed(testConfig, authentication);

        await expect(
          feed.fetch({
            profileId: existingProfileId,
            limit: 10,
          }),
        ).resolves.not.toThrow();
      });
    });

    describe(`when the method ${Feed.prototype.fetchHighlights.name} is called`, () => {
      it('should execute with success', async () => {
        const { authentication } = getTestSetup();
        const feed = new Feed(testConfig, authentication);

        await expect(
          feed.fetchHighlights({
            profileId: existingProfileId,
            limit: 10,
          }),
        ).resolves.not.toThrow();
      });
    });
  });
});
