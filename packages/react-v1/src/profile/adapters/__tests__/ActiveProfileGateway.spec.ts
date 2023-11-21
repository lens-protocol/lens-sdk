import { mockProfile } from '@lens-protocol/domain/mocks';
import { mockStorage } from '@lens-protocol/storage/mocks';

import { ActiveProfileGateway, StoredActiveProfileData } from '../ActiveProfileGateway';

describe(`Given an instance of the ${ActiveProfileGateway.name}`, () => {
  describe(`when the "${ActiveProfileGateway.prototype.setActiveProfile.name}" method is invoked`, () => {
    it(`should persist the given profile handle so that it can be retrieved later on via ""${ActiveProfileGateway.prototype.getActiveProfile.name}"" method`, async () => {
      const profile = mockProfile();
      const activeProfileStorage = mockStorage<StoredActiveProfileData>(null);
      const gateway = new ActiveProfileGateway(activeProfileStorage);

      await gateway.setActiveProfile(profile);

      const stored = await gateway.getActiveProfile();

      expect(stored).toEqual(profile);
    });
  });
});
