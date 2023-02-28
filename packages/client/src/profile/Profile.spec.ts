import { mumbaiSandbox } from '../consts/environments';
import { Profile } from './Profile';

const testConfig = {
  environment: mumbaiSandbox,
};

describe(`Given the ${Profile.name} configured to work with sandbox`, () => {
  describe(`and is not authenticated`, () => {
    const profile = new Profile(testConfig);

    describe(`when the method ${Profile.prototype.fetch.name} is called`, () => {
      it(`should run successfully`, async () => {
        await expect(profile.fetch({ profileId: '0x0185' })).resolves.not.toThrow();
      });
    });

    describe(`when the method ${Profile.prototype.stats.name} is called`, () => {
      it(`should run successfully`, async () => {
        await expect(profile.stats({ profileId: '0x05' }, ['lenster'])).resolves.not.toThrow();
      });
    });

    describe(`when the method ${Profile.prototype.fetchAll.name} is called`, () => {
      it(`should run successfully`, async () => {
        const result = await profile.fetchAll({ profileIds: ['0x0185', '0x0186'] });

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
          profile.mutualFollowers({ viewingProfileId: '0x0185', yourProfileId: '0x0186' }),
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
                profileId: '0x0185',
              },
              {
                followerAddress: '0x088C3152A5Ad1892236b312f18405Df3586Aca87',
                profileId: '0x0186',
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
            profileId: '0x0185',
          }),
        ).resolves.not.toThrow();
      });
    });

    describe(`when the method ${Profile.prototype.followerNftOwnedTokenIds.name} is called`, () => {
      it(`should run successfully`, async () => {
        await expect(
          profile.followerNftOwnedTokenIds({
            address: '0x088C3152A5Ad1892236b312f18405Df3586Aca87',
            profileId: '0x0185',
          }),
        ).resolves.not.toThrow();
      });
    });
  });
});
