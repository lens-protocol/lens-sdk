import { Nonces } from '.';
import { buildTestEnvironment, describeAuthenticatedScenario } from '../__helpers__';

const testConfig = {
  environment: buildTestEnvironment(),
};

describe(`Given the ${Nonces.name} configured to work with the test environment`, () => {
  describe(`when the method ${Nonces.prototype.fetch.name} is called`, () => {
    describeAuthenticatedScenario()((getTestSetup) => {
      it(`should return result`, async () => {
        const { authentication } = getTestSetup();
        const nonces = new Nonces(testConfig, authentication);
        const result = await nonces.fetch();

        expect(result.unwrap()).toMatchObject({
          lensHubOnChainSigNonce: expect.any(Number),
          peripheryOnChainSigNonce: expect.any(Number),
        });
      });
    });
  });
});
