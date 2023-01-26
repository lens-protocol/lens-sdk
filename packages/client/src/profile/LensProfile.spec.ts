import { LensClient } from '../LensClient';
import { staging } from '../consts/environments';
import { LensProfile } from './LensProfile';

describe(`Given the ${LensProfile.name} configured to work with staging environment`, () => {
  const client = new LensClient({
    environment: staging,
  });

  const profile = new LensProfile(client);

  describe(`when a method ${LensProfile.prototype.getProfileById.name} is called`, () => {
    it(`returns the requested profile`, async () => {
      const result = await profile.getProfileById({ profileId: '0x53a8' });

      expect(result).toMatchObject({
        id: '0x53a8',
        handle: 'kristestnet.test',
      });
    });
  });

  describe(`when a method ${LensProfile.prototype.getProfileByHandle.name} is called`, () => {
    it(`returns the requested profile`, async () => {
      const result = await profile.getProfileByHandle({ handle: 'kristestnet.test' });

      expect(result).toMatchObject({
        id: '0x53a8',
        handle: 'kristestnet.test',
      });
    });
  });

  describe(`when a method ${LensProfile.prototype.getDefaultProfile.name} is called`, () => {
    it(`returns the requested profile`, async () => {
      const result = await profile.getDefaultProfile({
        address: '0x3fC47cdDcFd59dce20694b575AFc1D94186775b0',
      });

      expect(result).toMatchObject({
        id: '0x53a8',
        handle: 'kristestnet.test',
      });
    });
  });

  describe(`when a method ${LensProfile.prototype.getAllProfilesByOwnerAddress.name} is called`, () => {
    it(`returns the requested profile`, async () => {
      const result = await profile.getAllProfilesByOwnerAddress({
        address: '0x3fC47cdDcFd59dce20694b575AFc1D94186775b0',
        limit: 10,
      });

      expect(result.items.length).toBeGreaterThan(2);
    });
  });
});
