import { Notifications } from '.';
import { buildTestEnvironment, describeAuthenticatedScenario } from '../__helpers__';

const testConfig = {
  environment: buildTestEnvironment(),
};

describe(`Given the ${Notifications.name} configured to work with the test environment`, () => {
  describe(`when the method ${Notifications.prototype.fetch.name} is called`, () => {
    describeAuthenticatedScenario({ withNewProfile: true })((getTestSetup) => {
      it('should execute with success', async () => {
        const { authentication, profileId } = getTestSetup();
        const notifications = new Notifications(testConfig, authentication);

        const result = await notifications.fetch({
          profileId,
          limit: 10,
        });

        expect(result.isSuccess()).toBeTruthy();
      });
    });
  });
});
