import { DateUtils } from '@lens-protocol/shared-kernel';

import { Credentials } from './Credentials';

const accessToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjB4YjE5QzI4OTBjZjk0N0FEM2YwYjdkN0U1QTlmZkJjZTM2ZDNmOWJkMiIsInJvbGUiOiJub3JtYWwiLCJpYXQiOjE2Mzc3NTQ2ODEsImV4cCI6MTYzNzc1NDc0MX0.Be1eGBvVuFL4fj4pHHqc0yWDledsgS2GP3Jgonmy-xw';
const accessTokenExp = 1637754741000;
const refreshToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjB4YjE5QzI4OTBjZjk0N0FEM2YwYjdkN0U1QTlmZkJjZTM2ZDNmOWJkMiIsInJvbGUiOiJyZWZyZXNoIiwiaWF0IjoxNjM3NzU0NjgxLCJleHAiOjE2Mzc3NTQ5ODF9.3SqgsVMyqFPBcem2W9Iog91SWC8cIAFixXBkDue73Rc';
const refreshTokenExp = 1637754981000;

describe(`Given the ${Credentials.name} class`, () => {
  afterAll(() => {
    jest.useRealTimers();
  });

  describe(`when ${Credentials.prototype.canRefresh.name} is invoked`, () => {
    it(`should return true if refresh token is not yet expired`, async () => {
      jest.useFakeTimers().setSystemTime(refreshTokenExp - DateUtils.minutesToMs(1));

      const credentials = new Credentials(undefined, refreshToken);

      expect(credentials.canRefresh()).toBeTruthy();
    });

    it(`should return false if refresh token is 30 seconds before expiring`, async () => {
      jest.useFakeTimers().setSystemTime(refreshTokenExp - DateUtils.secondsToMs(30));

      const credentials = new Credentials(undefined, refreshToken);

      expect(credentials.canRefresh()).toBeFalsy();
    });

    it(`should return false if refresh token already expired`, async () => {
      jest.useFakeTimers().setSystemTime(refreshTokenExp + DateUtils.secondsToMs(1));

      const credentials = new Credentials(undefined, refreshToken);

      expect(credentials.canRefresh()).toBeFalsy();
    });
  });

  describe(`when ${Credentials.prototype.isExpired.name} is invoked`, () => {
    it(`should return true if there is no access token`, async () => {
      const credentials = new Credentials(undefined, refreshToken);

      expect(credentials.isExpired()).toBeTruthy();
    });

    it(`should return true if access token is 30 seconds before expiring`, async () => {
      jest.useFakeTimers().setSystemTime(accessTokenExp - DateUtils.secondsToMs(30));

      const credentials = new Credentials(accessToken, refreshToken);

      expect(credentials.isExpired()).toBeTruthy();
    });

    it(`should return true if access token already expired`, async () => {
      jest.useFakeTimers().setSystemTime(accessTokenExp + DateUtils.secondsToMs(1));

      const credentials = new Credentials(accessToken, refreshToken);

      expect(credentials.isExpired()).toBeTruthy();
    });

    it(`should return false if access token is not yet expired`, async () => {
      jest.useFakeTimers().setSystemTime(accessTokenExp - DateUtils.minutesToMs(1));

      const credentials = new Credentials(accessToken, refreshToken);

      expect(credentials.isExpired()).toBeFalsy();
    });
  });
});
