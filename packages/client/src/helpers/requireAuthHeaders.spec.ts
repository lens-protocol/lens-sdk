import { InMemoryStorageProvider } from '@lens-protocol/storage';

import { buildTestEnvironment } from '../__helpers__';
import { Authentication } from '../authentication';
import { LensContext } from '../context';
import { NotAuthenticatedError } from '../errors';
import { requireAuthHeaders } from './requireAuthHeaders';

const context: LensContext = {
  environment: buildTestEnvironment(),
  storage: new InMemoryStorageProvider(),
  forApps: [],
  mediaTransforms: {},
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
      const authentication = new Authentication(context);
      const result = await requireAuthHeaders(authentication, (header) => {
        return Promise.resolve(header);
      });

      expect(result.isFailure()).toBeTruthy();
      expect(() => result.unwrap()).toThrow(NotAuthenticatedError);
    });
  });

  // describeAuthenticatedScenario()((getTestSetup) => {
  //   describe(`when the ${Authentication.name} is available and authenticated`, () => {
  //     it(`should provide the authentication header`, async () => {
  //       const { authentication } = getTestSetup();
  //       const result = await requireAuthHeaders(authentication, (header) => {
  //         return Promise.resolve(header);
  //       });

  //       expect(result.isSuccess()).toBeTruthy();
  //       expect(result.unwrap()).toEqual({
  //         authorization: expect.any(String),
  //       });
  //     });
  //   });
  // });
});
