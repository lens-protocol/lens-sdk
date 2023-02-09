import { mumbaiSandbox } from '../consts/environments';
import { Profile } from './Profile';

const testConfig = {
  environment: mumbaiSandbox,
};

describe(`Given the ${Profile.name} configured to work with testnet`, () => {
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

      expect(result.data.result.items.length).toBe(2);
    });
  });

  describe(`when a method ${Profile.prototype.recommendedProfiles.name} is called`, () => {
    it(`should run successfully`, async () => {
      await expect(profile.recommendedProfiles()).resolves.not.toThrow();
    });
  });

  describe(`when a method ${Profile.prototype.mutualFollowersProfiles.name} is called`, () => {
    it(`should run successfully`, async () => {
      await expect(
        profile.mutualFollowersProfiles({ viewingProfileId: '0x0185', yourProfileId: '0x0186' }),
      ).resolves.not.toThrow();
    });
  });
});
