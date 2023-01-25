import { LensClient } from '../LensClient';
import { staging } from '../consts/environments';
import { LensAuth } from './LensAuth';

describe(`Given the ${LensAuth.name} configured to work with staging environment`, () => {
  const client = new LensClient({
    environment: staging,
  });

  const auth = new LensAuth(client);

  describe(`when a method ${LensAuth.prototype.generateChallenge.name} is called`, () => {
    it(`returns the challenge for an address`, async () => {
      const address = '0x3fC47cdDcFd59dce20694b575AFc1D94186775b0';
      const result = await auth.generateChallenge(address);

      expect(result).toContain('Sign in with ethereum to lens');
    });
  });
});
