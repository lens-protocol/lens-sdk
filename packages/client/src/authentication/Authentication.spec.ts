import { DateUtils } from '@lens-protocol/shared-kernel';

import { Authentication } from '.';
import { buildTestEnvironment, describeAuthenticatedScenario } from '../__helpers__';
import { CredentialsExpiredError, NotAuthenticatedError } from '../consts/errors';

const testConfig = {
  environment: buildTestEnvironment(),
};

describe(`Given the ${Authentication.name} configured to work with the test environment`, () => {
  afterEach(() => {
    jest.useRealTimers();
  });

  describe(`when the method ${Authentication.prototype.generateChallenge.name} is called`, () => {
    it(`should return the challenge for an address`, async () => {
      const auth = new Authentication(testConfig);
      const address = '0x3fC47cdDcFd59dce20694b575AFc1D94186775b0';
      const result = await auth.generateChallenge(address);

      expect(result).toContain('Sign in with ethereum to lens');
    });
  });

  describe(`when the method ${Authentication.prototype.isAuthenticated.name} is called`, () => {
    describe(`and there are no credentials stored`, () => {
      it(`should return false`, async () => {
        const authentication = new Authentication(testConfig);

        expect(await authentication.isAuthenticated()).toBe(false);
      });
    });

    describeAuthenticatedScenario()((getTestSetup) => {
      describe(`and credentials are expired and can't refresh`, () => {
        it(`should return false`, async () => {
          const { authentication } = getTestSetup();
          jest.useFakeTimers().setSystemTime(Date.now() + DateUtils.hoursToMs(24 * 7)); // refreshToken is valid for 7 days

          expect(await authentication.isAuthenticated()).toBe(false);
        });
      });

      describe(`and credentials are good`, () => {
        it(`should return true`, async () => {
          const { authentication } = getTestSetup();

          expect(await authentication.isAuthenticated()).toBe(true);
        });
      });
    });
  });

  describe(`when the method ${Authentication.prototype.getAccessToken.name} is called`, () => {
    describe(`and there are no credentials stored`, () => {
      it(`should return failure with a correct error`, async () => {
        const authentication = new Authentication(testConfig);

        const result = await authentication.getAccessToken();

        expect(result.isFailure()).toBeTruthy();
        expect(() => result.unwrap()).toThrow(NotAuthenticatedError);
      });
    });

    describeAuthenticatedScenario()((getTestSetup) => {
      describe(`and credentials are expired and can't refresh`, () => {
        it(`should return failure with a correct error`, async () => {
          const { authentication } = getTestSetup();
          jest.useFakeTimers().setSystemTime(Date.now() + DateUtils.hoursToMs(24 * 7)); // refreshToken is valid for 7 days

          const result = await authentication.getAccessToken();

          expect(result.isFailure()).toBeTruthy();
          expect(() => result.unwrap()).toThrow(CredentialsExpiredError);
        });
      });

      describe(`and credentials are good`, () => {
        it(`should return the access token`, async () => {
          const { authentication } = getTestSetup();

          const result = await authentication.getAccessToken();

          expect(result.isSuccess()).toBeTruthy();
          expect(result.unwrap().length).toBeGreaterThan(20); // long jwt token string
        });
      });
    });
  });

  describe(`when the method ${Authentication.prototype.getRequestHeader.name} is called`, () => {
    describe(`and there are no credentials stored`, () => {
      it(`should return a failure with an error`, async () => {
        const authentication = new Authentication(testConfig);
        const result = await authentication.getRequestHeader();

        expect(result.isFailure()).toBeTruthy();
        expect(() => result.unwrap()).toThrow(NotAuthenticatedError);
      });
    });

    describeAuthenticatedScenario()((getTestSetup) => {
      describe(`and credentials are expired and can't refresh`, () => {
        it(`should return a failure with an error`, async () => {
          const { authentication } = getTestSetup();
          jest.useFakeTimers().setSystemTime(Date.now() + DateUtils.hoursToMs(24 * 7)); // refreshToken is valid for 7 days

          const result = await authentication.getRequestHeader();

          expect(result.isFailure()).toBeTruthy();
          expect(() => result.unwrap()).toThrow(CredentialsExpiredError);
        });
      });

      describe(`and credentials are good`, () => {
        it(`should return the authenticated header`, async () => {
          const { authentication } = getTestSetup();
          const result = await authentication.getRequestHeader();

          expect(result.isSuccess()).toBeTruthy();
          expect(result.unwrap()).toMatchObject({
            authorization: expect.any(String),
          });
        });
      });

      // skip unless we mock api token response, as it throws ClockSkewedError
      describe.skip(`and credentials are expired but can be refreshed`, () => {
        it(`should return the authenticated header`, async () => {
          const { authentication } = getTestSetup();
          jest.useFakeTimers().setSystemTime(Date.now() + DateUtils.minutesToMs(31)); // accessToken is valid for 30min

          const result = await authentication.getRequestHeader();

          expect(result.isSuccess()).toBeTruthy();
        });
      });
    });
  });
});
