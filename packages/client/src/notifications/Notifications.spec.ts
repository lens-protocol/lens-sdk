import { setupRandomAuthentication } from '../authentication/__helpers__/setupAuthentication';
import { mumbaiSandbox } from '../consts/environments';
import { Notifications } from './Notifications';

const testConfig = {
  environment: mumbaiSandbox,
};

describe(`Given the ${Notifications.name} configured to work with sandbox`, () => {
  const getAuthentication = setupRandomAuthentication();

  describe.skip(`when the method ${Notifications.prototype.fetch.name} is called`, () => {
    it('should execute with success', async () => {
      const auth = getAuthentication();
      const notifications = new Notifications(testConfig, auth);

      await expect(
        notifications.fetch({
          profileId: '0x0185',
          limit: 10,
        }),
      ).resolves.not.toThrow();
    });
  });
});
