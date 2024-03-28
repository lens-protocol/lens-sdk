import { DateUtils } from '@lens-protocol/shared-kernel';

import { Credentials } from './Credentials';

const profileSession = {
  accessToken:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjB4NTYiLCJldm1BZGRyZXNzIjoiMHgzZkM0N2NkRGNGZDU5ZGNlMjA2OTRiNTc1QUZjMUQ5NDE4Njc3NWIwIiwicm9sZSI6InByb2ZpbGUiLCJhdXRob3JpemF0aW9uSWQiOiIwNDVjNjdiNi1iMzUxLTQ1YzktYTVhNS1jNGFkOTg4OWQ2MmMiLCJpYXQiOjE3MDEzNTMwOTYsImV4cCI6MTcwMTM1NDg5Nn0.O_pQ386uVIU_Pi1aex8K4E9rWxkqXcTELE1HTaD4gwI',
  accessTokenExp: 1701354896000,
  refreshToken:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjB4NTYiLCJldm1BZGRyZXNzIjoiMHgzZkM0N2NkRGNGZDU5ZGNlMjA2OTRiNTc1QUZjMUQ5NDE4Njc3NWIwIiwicm9sZSI6InByb2ZpbGVfcmVmcmVzaCIsImF1dGhvcml6YXRpb25JZCI6IjA0NWM2N2I2LWIzNTEtNDVjOS1hNWE1LWM0YWQ5ODg5ZDYyYyIsImlhdCI6MTcwMTM1MzA5NiwiZXhwIjoxNzAxOTU3ODk2fQ.i2kzT4I6VBTuZvjly0TEdGN_YsuBaTDopMQU4_398kA',
  refreshTokenExp: 1701957896000,
  identityToken: '',
};

const walletSession = {
  accessToken:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjB4YTU2NTNlODhEOWMzNTIzODdkZURkQzc5YmNmOTlmMGFkYTYyZTljNiIsInJvbGUiOiJ3YWxsZXQiLCJhdXRob3JpemF0aW9uSWQiOiIzMTFlZDczZC02Y2IzLTQ0ZmYtOTc3Zi0yYzJjNTIyOGFiYjQiLCJpYXQiOjE3MDEzNTUwNzcsImV4cCI6MTcwMTM1Njg3N30.isTaNT8dqqlAwm1J048HY6PDPnO4uNM3KzExYlFSRzk',
  accessTokenExp: 1701356877000,
  refreshToken:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjB4YTU2NTNlODhEOWMzNTIzODdkZURkQzc5YmNmOTlmMGFkYTYyZTljNiIsInJvbGUiOiJ3YWxsZXRfcmVmcmVzaCIsImF1dGhvcml6YXRpb25JZCI6IjMxMWVkNzNkLTZjYjMtNDRmZi05NzdmLTJjMmM1MjI4YWJiNCIsImlhdCI6MTcwMTM1NTA3NywiZXhwIjoxNzAxOTU5ODc3fQ.WTUpWsH-Fvv8U4WIwL_Sk6cpHvRSGY_vdBsy1IQrCmM',
  refreshTokenExp: 1701959877000,
  identityToken: '',
};

const buildProfileCredentials = () => {
  return new Credentials(
    profileSession.accessToken,
    profileSession.identityToken,
    profileSession.refreshToken,
  );
};

const buildWalletCredentials = () => {
  return new Credentials(
    walletSession.accessToken,
    walletSession.identityToken,
    walletSession.refreshToken,
  );
};

describe(`Given the ${Credentials.name} class`, () => {
  afterAll(() => {
    jest.useRealTimers();
  });

  describe(`when refresh token for session with profile is present`, () => {
    describe(`and ${Credentials.prototype.getProfileId.name} is invoked`, () => {
      it(`should return a profile id`, async () => {
        const credentials = buildProfileCredentials();
        expect(credentials.getProfileId()).toBe('0x56');
      });
    });
    describe(`and ${Credentials.prototype.getWalletAddress.name} is invoked`, () => {
      it(`should return wallet address`, async () => {
        const credentials = buildProfileCredentials();
        expect(credentials.getWalletAddress()).toBe('0x3fC47cdDcFd59dce20694b575AFc1D94186775b0');
      });
    });
    describe(`and ${Credentials.prototype.getAuthorizationId.name} is invoked`, () => {
      it(`should return wallet address`, async () => {
        const credentials = buildProfileCredentials();
        expect(credentials.getAuthorizationId()).toBe('045c67b6-b351-45c9-a5a5-c4ad9889d62c');
      });
    });
  });

  describe(`when refresh token for session with wallet only is present`, () => {
    describe(`and ${Credentials.prototype.getProfileId.name} is invoked`, () => {
      it(`should return null`, async () => {
        const credentials = buildWalletCredentials();
        expect(credentials.getProfileId()).toBeNull();
      });
    });
    describe(`and ${Credentials.prototype.getWalletAddress.name} is invoked`, () => {
      it(`should return wallet address`, async () => {
        const credentials = buildWalletCredentials();
        expect(credentials.getWalletAddress()).toBe('0xa5653e88D9c352387deDdC79bcf99f0ada62e9c6');
      });
    });
    describe(`and ${Credentials.prototype.getAuthorizationId.name} is invoked`, () => {
      it(`should return wallet address`, async () => {
        const credentials = buildWalletCredentials();
        expect(credentials.getAuthorizationId()).toBe('311ed73d-6cb3-44ff-977f-2c2c5228abb4');
      });
    });
  });

  describe(`when ${Credentials.prototype.canRefresh.name} is invoked`, () => {
    it(`should return true if refresh token is not yet expired`, async () => {
      const credentials = buildProfileCredentials();
      jest.useFakeTimers().setSystemTime(profileSession.refreshTokenExp - DateUtils.minutesToMs(1));

      expect(credentials.canRefresh()).toBeTruthy();
    });

    it(`should return false if refresh token is 30 seconds before expiring`, async () => {
      const credentials = buildProfileCredentials();
      jest
        .useFakeTimers()
        .setSystemTime(profileSession.refreshTokenExp - DateUtils.secondsToMs(30));

      expect(credentials.canRefresh()).toBeFalsy();
    });

    it(`should return false if refresh token already expired`, async () => {
      const credentials = buildProfileCredentials();
      jest.useFakeTimers().setSystemTime(profileSession.refreshTokenExp + DateUtils.secondsToMs(1));

      expect(credentials.canRefresh()).toBeFalsy();
    });
  });

  describe(`when ${Credentials.prototype.shouldRefresh.name} is invoked`, () => {
    it(`should return true if there is no access token`, async () => {
      const credentials = buildProfileCredentials();

      expect(credentials.shouldRefresh()).toBeTruthy();
    });

    it(`should return true if access token is 30 seconds before expiring`, async () => {
      const credentials = buildProfileCredentials();
      jest.useFakeTimers().setSystemTime(profileSession.accessTokenExp - DateUtils.secondsToMs(30));

      expect(credentials.shouldRefresh()).toBeTruthy();
    });

    it(`should return true if access token already expired`, async () => {
      const credentials = buildProfileCredentials();
      jest.useFakeTimers().setSystemTime(profileSession.accessTokenExp + DateUtils.secondsToMs(1));

      expect(credentials.shouldRefresh()).toBeTruthy();
    });

    it(`should return false if access token is not yet expired`, async () => {
      const credentials = buildProfileCredentials();
      jest.useFakeTimers().setSystemTime(profileSession.accessTokenExp - DateUtils.minutesToMs(1));

      expect(credentials.shouldRefresh()).toBeFalsy();
    });
  });
});
