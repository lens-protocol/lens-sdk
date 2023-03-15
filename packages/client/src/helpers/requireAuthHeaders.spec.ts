import { Authentication } from '../authentication';
import { setupRandomAuthentication } from '../authentication/__helpers__/setupAuthentication';
import { mumbaiSandbox } from '../consts/environments';
import { NotAuthenticatedError } from '../consts/errors';
import { requireAuthHeaders } from './requireAuthHeaders';

const testConfig = {
  environment: mumbaiSandbox,
};

describe(`Given the "${requireAuthHeaders.name}" helper`, () => {
  describe(`when the ${Authentication.name} is not provided`, () => {
    it(`should return failure with ${NotAuthenticatedError.name}`, async () => {
      const result = await requireAuthHeaders(undefined, (header) => {
        return Promise.resolve(header);
      });

      expect(result.isFailure()).toBeTruthy();
      expect(() => result.unwrap()).toThrow(NotAuthenticatedError);
    });
  });

  describe(`when the ${Authentication.name} is available but not authenticated`, () => {
    it(`should return failure with ${NotAuthenticatedError.name}`, async () => {
      const authentication = new Authentication(testConfig);
      const result = await requireAuthHeaders(authentication, (header) => {
        return Promise.resolve(header);
      });

      expect(result.isFailure()).toBeTruthy();
      expect(() => result.unwrap()).toThrow(NotAuthenticatedError);
    });
  });

  describe(`when the ${Authentication.name} is available and authenticated`, () => {
    const getAuthentication = setupRandomAuthentication();

    it(`should provide the authentication header`, async () => {
      const authentication = getAuthentication();
      const result = await requireAuthHeaders(authentication, (header) => {
        return Promise.resolve(header);
      });

      expect(result.isSuccess()).toBeTruthy();
      expect(result.unwrap()).toEqual({
        authorization: expect.any(String),
      });
    });
  });
});
