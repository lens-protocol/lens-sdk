import { mumbaiSandbox } from '../consts/environments';
import { Profile } from './Profile';

const testConfig = {
  environment: mumbaiSandbox,
};

describe(`Given the ${Profile.name} configured to work with sandbox`, () => {
  const profile = new Profile(testConfig);

  describe(`when a method ${Profile.prototype.fetch.name} is called`, () => {
    it(`should return the requested profile`, async () => {
      const result = await profile.fetch({ profileId: '0x0185' });

      expect(result).toMatchObject({
        id: '0x0185',
        handle: 'redditcompromised.test',
      });
    });
  });

  describe(`when a method ${Profile.prototype.fetchAll.name} is called`, () => {
    it(`should return requested profiles`, async () => {
      const result = await profile.fetchAll({ profileIds: ['0x0185', '0x0186'] });

      expect(result.items.length).toBe(2);
    });
  });

  describe(`when a method ${Profile.prototype.allRecommended.name} is called`, () => {
    it(`should run successfully`, async () => {
      await expect(profile.allRecommended()).resolves.not.toThrow();
    });
  });

  describe(`when a method ${Profile.prototype.mutualFollowers.name} is called`, () => {
    it(`should run successfully`, async () => {
      await expect(
        profile.mutualFollowers({ viewingProfileId: '0x0185', yourProfileId: '0x0186' }),
      ).resolves.not.toThrow();
    });
  });

  describe(`when a method ${Profile.prototype.doesFollow.name} is called`, () => {
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

  describe(`when a method ${Profile.prototype.allFollowing.name} is called`, () => {
    it(`should run successfully`, async () => {
      await expect(
        profile.allFollowing({
          address: '0x088C3152A5Ad1892236b312f18405Df3586Aca87',
        }),
      ).resolves.not.toThrow();
    });
  });

  describe(`when a method ${Profile.prototype.allFollowers.name} is called`, () => {
    it(`should run successfully`, async () => {
      await expect(
        profile.allFollowers({
          profileId: '0x0185',
        }),
      ).resolves.not.toThrow();
    });
  });

  describe(`when a method ${Profile.prototype.followerNftOwnedTokenIds.name} is called`, () => {
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
