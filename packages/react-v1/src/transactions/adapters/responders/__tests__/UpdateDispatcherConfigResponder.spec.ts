import { Profile } from '@lens-protocol/api-bindings';
import { mockProfileFragment } from '@lens-protocol/api-bindings/mocks';
import {
  mockTransactionData,
  mockUpdateDispatcherConfigRequest,
} from '@lens-protocol/domain/mocks';
import { mockEthereumAddress } from '@lens-protocol/shared-kernel/mocks';

import { mockIProfileCacheManager } from '../../__helpers__/mocks';
import { UpdateDispatcherConfigResponder } from '../UpdateDispatcherConfigResponder';

function setupTestScenario({ profile }: { profile: Profile }) {
  const profileCacheManager = mockIProfileCacheManager(profile);
  const responder = new UpdateDispatcherConfigResponder(profileCacheManager);

  return {
    responder,

    profileCacheManager,
  };
}

describe(`Given the ${UpdateDispatcherConfigResponder.name}`, () => {
  describe(`when "${UpdateDispatcherConfigResponder.prototype.commit.name}" method is invoked`, () => {
    it(`should update apollo cache with the new dispatcher configuration`, async () => {
      const profile = mockProfileFragment({ dispatcher: null });
      const updated = mockProfileFragment({
        ...profile,
        dispatcher: { address: mockEthereumAddress(), canUseRelay: true },
      });
      const request = mockUpdateDispatcherConfigRequest({
        enabled: true,
        profileId: profile.id,
      });
      const transactionData = mockTransactionData({ request });

      const { responder, profileCacheManager } = setupTestScenario({
        profile: updated,
      });

      await responder.commit(transactionData);

      expect(profileCacheManager.refreshProfile).toBeCalledWith(profile.id);
    });
  });
});
