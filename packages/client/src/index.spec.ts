import { staging } from './environments';
import { LensClient } from './index';

describe(`Given the ${LensClient.name} configured to work with staging environment`, () => {
  const config = {
    environment: staging,
  };
  const lensClient = new LensClient(config);

  describe(`when a method from Auth module is called`, () => {
    it(`returns the challenge for an address`, async () => {
      const address = '0x3fC47cdDcFd59dce20694b575AFc1D94186775b0';
      const result = await lensClient.auth.generateChallenge(address);

      expect(result).toContain('Sign in with ethereum to lens');
    });
  });
});
