import { Authentication } from '../authentication';
import { setupRandomAuthentication } from '../authentication/__helpers__/setupAuthentication';
import { mumbaiSandbox } from '../consts/environments';
import { provideAuthHeaders } from './provideAuthHeaders';

const testConfig = {
  environment: mumbaiSandbox,
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

  describe(`when the ${Authentication.name} is available and authenticated`, () => {
    const getAuthentication = setupRandomAuthentication();

    it(`should provide the authentication header`, async () => {
      const authentication = getAuthentication();
      const result = await provideAuthHeaders(authentication, (header) => {
        return Promise.resolve(header);
      });

      expect(result).toEqual({
        authorization: expect.any(String),
      });
    });
  });
});
