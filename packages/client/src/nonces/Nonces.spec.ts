import { setupRandomAuthentication } from '../authentication/__helpers__/setupAuthentication';
import { mumbaiSandbox } from '../consts/environments';
import { Nonces } from './Nonces';

const testConfig = {
  environment: mumbaiSandbox,
};

describe(`Given the ${Nonces.name} configured to work with sandbox`, () => {
  const getAuthentication = setupRandomAuthentication();

  describe(`when the method ${Nonces.prototype.fetch.name} is called`, () => {
    it(`should return result`, async () => {
      const auth = getAuthentication();
      const nonces = new Nonces(testConfig, auth);
      const result = await nonces.fetch();

      expect(result.unwrap()).toMatchObject({
        lensHubOnChainSigNonce: expect.any(Number),
        peripheryOnChainSigNonce: expect.any(Number),
      });
    });
  });
});
