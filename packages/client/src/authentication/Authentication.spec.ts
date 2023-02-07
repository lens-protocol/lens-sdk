import { mumbaiSandbox } from '../consts/environments';
import { Authentication } from './Authentication';

const testConfig = {
  environment: mumbaiSandbox,
};

describe(`Given the ${Authentication.name} configured to work with sandbox`, () => {
  const auth = new Authentication(testConfig);

  describe(`when a method ${Authentication.prototype.challenge.name} is called`, () => {
    it(`should return the challenge for an address`, async () => {
      const address = '0x3fC47cdDcFd59dce20694b575AFc1D94186775b0';
      const result = await auth.challenge(address);

      expect(result).toContain('Sign in with ethereum to lens');
    });
  });
});
