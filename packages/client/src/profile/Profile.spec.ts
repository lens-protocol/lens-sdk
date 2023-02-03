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
});
