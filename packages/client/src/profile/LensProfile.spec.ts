import { LensClient } from '../LensClient';
import { staging } from '../consts/environments';
import { LensProfile } from './LensProfile';

describe(`Given the ${LensProfile.name} configured to work with staging environment`, () => {
  const client = new LensClient({
    environment: staging,
  });

  const profile = new LensProfile(client);

  describe(`when a method ${LensProfile.prototype.getProfileByHandle.name} is called`, () => {
    it(`returns the requested profile`, async () => {
      const result = await profile.getProfileByHandle('kristestnet.test');

      expect(result).toMatchObject({
        id: '0x53a8',
        handle: 'kristestnet.test',
      });
    });
  });
});
