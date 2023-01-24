import { mumbai } from '../consts/environments';
import { Profile } from './Profile';

describe(`Given the ${Profile.name} configured to work with testnet`, () => {
  const profile = new Profile(mumbai.url);

  describe(`when a method ${Profile.prototype.fetch.name} is called`, () => {
    it(`returns the requested profile`, async () => {
      const result = await profile.fetch({ profileId: '0x53a8' });

      expect(result).toMatchObject({
        id: '0x53a8',
        handle: 'kristestnet.test',
      });
    });
  });
});
