import { DateUtils } from '@lens-protocol/shared-kernel';

import { mumbaiSandbox } from '../consts/environments';
import { CredentialsExpiredError, NotAuthenticatedError } from '../consts/errors';
import { Authentication } from './Authentication';
import { setupRandomAuthentication } from './__helpers__/setupAuthentication';

const testConfig = {
  environment: mumbaiSandbox,
};

describe(`Given the ${Authentication.name} configured to work with sandbox`, () => {
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
    it(`should return true if already authenticated`, async () => {
      const auth = await setupRandomAuthentication();
      const isAuth = await auth.isAuthenticated();

      expect(isAuth).toBe(true);
    });

    it(`should return false if not authenticated`, async () => {
      const auth = new Authentication(testConfig);
      const isAuth = await auth.isAuthenticated();

      expect(isAuth).toBe(false);
    });
  });

  describe(`when the method ${Authentication.prototype.getRequestHeader.name} is called`, () => {
    describe(`and there are no credentials stored`, () => {
      it(`should return a failure with an error`, async () => {
        const auth = new Authentication(testConfig);
        const result = await auth.getRequestHeader();

        expect(result.isFailure()).toBeTruthy();
        expect(() => result.unwrap()).toThrow(NotAuthenticatedError);
      });
    });

    describe(`and credentials are expired and can't refresh`, () => {
      it(`should return a failure with an error`, async () => {
        const auth = await setupRandomAuthentication();
        jest.useFakeTimers().setSystemTime(Date.now() + DateUtils.hoursToMs(24 * 7)); // refreshToken is valid for 7 days

        const result = await auth.getRequestHeader();

        expect(result.isFailure()).toBeTruthy();
        expect(() => result.unwrap()).toThrow(CredentialsExpiredError);
      });
    });

    describe(`and credentials are good`, () => {
      it(`should return the authenticated header`, async () => {
        const auth = await setupRandomAuthentication();
        const result = await auth.getRequestHeader();

        expect(result.isSuccess()).toBeTruthy();
        expect(result.unwrap()).toMatchObject({
          authorization: expect.any(String),
        });
      });
    });

    describe(`and credentials are expired but can be refreshed`, () => {
      it(`should return the authenticated header`, async () => {
        const auth = await setupRandomAuthentication();
        jest.useFakeTimers().setSystemTime(Date.now() + DateUtils.minutesToMs(31)); // accessToken is valid for 30min

        const result = await auth.getRequestHeader();

        expect(result.isSuccess()).toBeTruthy();
      });
    });
  });
});
