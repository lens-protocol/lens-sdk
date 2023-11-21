import { DateUtils } from '@lens-protocol/shared-kernel';

import { Credentials } from './Credentials';

const accessToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjB4MWEiLCJldm1BZGRyZXNzIjoiMHhhNTY1M2U4OEQ5YzM1MjM4N2RlRGRDNzliY2Y5OWYwYWRhNjJlOWM2Iiwicm9sZSI6Im5vcm1hbCIsImlhdCI6MTY5NTEzMzMxNywiZXhwIjoxNjk1MTM1MTE3fQ.6s4-ClaPmUMuvYhZ7MaVrSwu-Axzkv1vCkKGtIqnnGo';
const accessTokenExp = 1695135117000;
const refreshToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjB4MWEiLCJldm1BZGRyZXNzIjoiMHhhNTY1M2U4OEQ5YzM1MjM4N2RlRGRDNzliY2Y5OWYwYWRhNjJlOWM2Iiwicm9sZSI6InJlZnJlc2giLCJpYXQiOjE2OTUxMzMzMTcsImV4cCI6MTY5NTczODExN30.wgdJ_bJs50CL1lGs_sjaBYrYEvsh-h8Qj0Yv1CLpQR4';
const refreshTokenExp = 1695738117000;

describe(`Given the ${Credentials.name} class`, () => {
  afterAll(() => {
    jest.useRealTimers();
  });

  describe(`when ${Credentials.prototype.getProfileId.name} is invoked`, () => {
    it(`should return a profile id`, async () => {
      const credentials = new Credentials(undefined, refreshToken);

      expect(credentials.getProfileId()).toBe('0x1a');
    });
  });

  describe(`when ${Credentials.prototype.canRefresh.name} is invoked`, () => {
    it(`should return true if refresh token is not yet expired`, async () => {
      const credentials = new Credentials(undefined, refreshToken);
      jest.useFakeTimers().setSystemTime(refreshTokenExp - DateUtils.minutesToMs(1));

      expect(credentials.canRefresh()).toBeTruthy();
    });

    it(`should return false if refresh token is 30 seconds before expiring`, async () => {
      const credentials = new Credentials(undefined, refreshToken);
      jest.useFakeTimers().setSystemTime(refreshTokenExp - DateUtils.secondsToMs(30));

      expect(credentials.canRefresh()).toBeFalsy();
    });

    it(`should return false if refresh token already expired`, async () => {
      const credentials = new Credentials(undefined, refreshToken);
      jest.useFakeTimers().setSystemTime(refreshTokenExp + DateUtils.secondsToMs(1));

      expect(credentials.canRefresh()).toBeFalsy();
    });
  });

  describe(`when ${Credentials.prototype.shouldRefresh.name} is invoked`, () => {
    it(`should return true if there is no access token`, async () => {
      const credentials = new Credentials(undefined, refreshToken);

      expect(credentials.shouldRefresh()).toBeTruthy();
    });

    it(`should return true if access token is 30 seconds before expiring`, async () => {
      const credentials = new Credentials(accessToken, refreshToken);
      jest.useFakeTimers().setSystemTime(accessTokenExp - DateUtils.secondsToMs(30));

      expect(credentials.shouldRefresh()).toBeTruthy();
    });

    it(`should return true if access token already expired`, async () => {
      const credentials = new Credentials(accessToken, refreshToken);
      jest.useFakeTimers().setSystemTime(accessTokenExp + DateUtils.secondsToMs(1));

      expect(credentials.shouldRefresh()).toBeTruthy();
    });

    it(`should return false if access token is not yet expired`, async () => {
      const credentials = new Credentials(accessToken, refreshToken);
      jest.useFakeTimers().setSystemTime(accessTokenExp - DateUtils.minutesToMs(1));

      expect(credentials.shouldRefresh()).toBeFalsy();
    });
  });
});
