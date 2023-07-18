import {
  altProfileId,
  buildTestEnvironment,
  describeAuthenticatedScenario,
  existingProfileId,
} from '../__helpers__';
import { Profile } from './Profile';

const testConfig = {
  environment: buildTestEnvironment(),
};

describe(`Given the ${Profile.name} configured to work with the test environment`, () => {
  describe(`and is not authenticated`, () => {
    const profile = new Profile(testConfig);

    describe(`when the method ${Profile.prototype.fetch.name} is called`, () => {
      it(`should run successfully`, async () => {
        await expect(profile.fetch({ profileId: existingProfileId })).resolves.not.toThrow();
      });
    });

    describe(`when the method ${Profile.prototype.stats.name} is called`, () => {
      it(`should run successfully`, async () => {
        await expect(
          profile.stats({ profileId: existingProfileId }, ['lenster']),
        ).resolves.not.toThrow();
      });
    });

    describe(`when the method ${Profile.prototype.fetchAll.name} is called`, () => {
      it(`should run successfully`, async () => {
        const result = await profile.fetchAll({ profileIds: [existingProfileId, altProfileId] });

        expect(result.items.length).toBe(2);
      });
    });

    describe(`when the method ${Profile.prototype.allRecommended.name} is called`, () => {
      it(`should run successfully`, async () => {
        await expect(profile.allRecommended()).resolves.not.toThrow();
      });
    });

    describe(`when the method ${Profile.prototype.mutualFollowers.name} is called`, () => {
      it(`should run successfully`, async () => {
        await expect(
          profile.mutualFollowers({
            viewingProfileId: existingProfileId,
            yourProfileId: altProfileId,
          }),
        ).resolves.not.toThrow();
      });
    });

    describe(`when the method ${Profile.prototype.doesFollow.name} is called`, () => {
      it(`should run successfully`, async () => {
        await expect(
          profile.doesFollow({
            followInfos: [
              {
                followerAddress: '0x088C3152A5Ad1892236b312f18405Df3586Aca87',
                profileId: existingProfileId,
              },
              {
                followerAddress: '0x088C3152A5Ad1892236b312f18405Df3586Aca87',
                profileId: altProfileId,
              },
            ],
          }),
        ).resolves.not.toThrow();
      });
    });

    describe(`when the method ${Profile.prototype.allFollowing.name} is called`, () => {
      it(`should run successfully`, async () => {
        await expect(
          profile.allFollowing({
            address: '0x088C3152A5Ad1892236b312f18405Df3586Aca87',
          }),
        ).resolves.not.toThrow();
      });
    });

    describe(`when the method ${Profile.prototype.allFollowers.name} is called`, () => {
      it(`should run successfully`, async () => {
        await expect(
          profile.allFollowers({
            profileId: existingProfileId,
          }),
        ).resolves.not.toThrow();
      });
    });

    describe(`when the method ${Profile.prototype.followerNftOwnedTokenIds.name} is called`, () => {
      it(`should run successfully`, async () => {
        await expect(
          profile.followerNftOwnedTokenIds({
            address: '0x088C3152A5Ad1892236b312f18405Df3586Aca87',
            profileId: existingProfileId,
          }),
        ).resolves.not.toThrow();
      });
    });
  });

  describeAuthenticatedScenario({ withNewProfile: true })((getTestSetup) => {
    describe(`when the method ${Profile.prototype.guardian.name} is called`, () => {
      it(`should run successfully`, async () => {
        const { authentication, profileId } = getTestSetup();
        const profile = new Profile(testConfig, authentication);

        const result = await profile.guardian({ profileId });

        expect(result.unwrap()).toEqual({
          protected: true,
          disablingProtectionTimestamp: null,
        });
      });
    });
  });
});
