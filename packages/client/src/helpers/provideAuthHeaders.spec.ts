import { buildTestEnvironment } from '../__helpers__';
import { Authentication } from '../authentication';
import { provideAuthHeaders } from './provideAuthHeaders';

const testConfig = {
  environment: buildTestEnvironment(),
};

describe(`Given the "${provideAuthHeaders.name}" helper`, () => {
  describe(`when the ${Authentication.name} is not available`, () => {
    it(`should provide an empty object as the authentication header`, async () => {
      const result = await provideAuthHeaders(undefined, (header) => {
        return Promise.resolve(header);
      });

      expect(result).toEqual({});
    });
  });

  describe(`when the ${Authentication.name} is available but not authenticated`, () => {
    it(`should provide an empty object as the authentication header`, async () => {
      const authentication = new Authentication(testConfig);
      const result = await provideAuthHeaders(authentication, (header) => {
        return Promise.resolve(header);
      });

      expect(result).toEqual({});
    });
  });

  // describeAuthenticatedScenario()((getTestSetup) => {
  //   describe(`when the ${Authentication.name} is available and authenticated`, () => {
  //     it(`should provide the authentication header`, async () => {
  //       const { authentication } = getTestSetup();
  //       const result = await provideAuthHeaders(authentication, (header) => {
  //         return Promise.resolve(header);
  //       });

  //       expect(result).toEqual({
  //         authorization: expect.any(String),
  //       });
  //     });
  //   });
  // });
});
