import { DateUtils } from '@lens-protocol/shared-kernel';

import { Credentials } from '../Credentials';

const accessToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjB4YjE5QzI4OTBjZjk0N0FEM2YwYjdkN0U1QTlmZkJjZTM2ZDNmOWJkMiIsInJvbGUiOiJub3JtYWwiLCJpYXQiOjE2Mzc3NTQ2ODEsImV4cCI6MTYzNzc1NDc0MX0.Be1eGBvVuFL4fj4pHHqc0yWDledsgS2GP3Jgonmy-xw';
const accessTokenExp = 1637754741000;
const refreshToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjB4YjE5QzI4OTBjZjk0N0FEM2YwYjdkN0U1QTlmZkJjZTM2ZDNmOWJkMiIsInJvbGUiOiJyZWZyZXNoIiwiaWF0IjoxNjM3NzU0NjgxLCJleHAiOjE2Mzc3NTQ5ODF9.3SqgsVMyqFPBcem2W9Iog91SWC8cIAFixXBkDue73Rc';
const refreshTokenExp = 1637754981000;

describe('Given the Credentials class', () => {
  describe('when "Credentials" constructor is invoked', () => {
    it('should get the address from refresh token data', async () => {
      const expectedAddress = '0xb19C2890cf947AD3f0b7d7E5A9ffBce36d3f9bd2';

      const credentials = new Credentials(null, refreshToken);

      expect(credentials.address).toEqual(expectedAddress);
    });

    it('should throw an error if the refresh token is without address', async () => {
      const refreshToken =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoicmVmcmVzaCIsImlhdCI6MTYzNzE0MjY3NCwiZXhwIjoxNjM3MjI5MDc0fQ.FIH3KkV0IACt1EpCfpX4L29nCUKjmddlrDhsHhc5N0Q';

      expect(() => new Credentials(null, refreshToken)).toThrow();
    });

    it('should throw an error if the refresh token is invalid', async () => {
      const refreshToken = 'broken refresh token';

      expect(() => new Credentials(null, refreshToken)).toThrow();
    });
  });

  describe('when "canRefresh" is invoked', () => {
    it('should return true if refresh token is not yet expired', async () => {
      jest.useFakeTimers().setSystemTime(refreshTokenExp - DateUtils.minutesToMs(1));

      const credentials = new Credentials(null, refreshToken);

      expect(credentials.canRefresh()).toBeTruthy();
    });

    it('should return false if refresh token is 3 seconds before expiring', async () => {
      jest.useFakeTimers().setSystemTime(refreshTokenExp - DateUtils.secondsToMs(3));

      const credentials = new Credentials(null, refreshToken);

      expect(credentials.canRefresh()).toBeFalsy();
    });

    it('should return false if refresh token already expired', async () => {
      jest.useFakeTimers().setSystemTime(refreshTokenExp + DateUtils.secondsToMs(1));

      const credentials = new Credentials(null, refreshToken);

      expect(credentials.canRefresh()).toBeFalsy();
    });
  });

  describe('when "isExpired" is invoked', () => {
    it('should return true if there is no access token', async () => {
      const credentials = new Credentials(null, refreshToken);

      expect(credentials.isExpired()).toBeTruthy();
    });

    it('should return true if access token is 3 seconds before expiring', async () => {
      jest.useFakeTimers().setSystemTime(accessTokenExp - DateUtils.secondsToMs(3));

      const credentials = new Credentials(accessToken, refreshToken);

      expect(credentials.isExpired()).toBeTruthy();
    });

    it('should return true if access token already expired', async () => {
      jest.useFakeTimers().setSystemTime(accessTokenExp + DateUtils.secondsToMs(1));

      const credentials = new Credentials(accessToken, refreshToken);

      expect(credentials.isExpired()).toBeTruthy();
    });

    it('should return false if access token is not yet expired', async () => {
      jest.useFakeTimers().setSystemTime(accessTokenExp - DateUtils.minutesToMs(1));

      const credentials = new Credentials(accessToken, refreshToken);

      expect(credentials.isExpired()).toBeFalsy();
    });
  });
});
