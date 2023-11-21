import { Profile } from '@lens-protocol/api-bindings';
import { mockProfileFragment } from '@lens-protocol/api-bindings/mocks';
import {
  mockTransactionData,
  mockChargeFollowConfig,
  mockUpdateFollowPolicyRequest,
} from '@lens-protocol/domain/mocks';
import { FollowPolicyType } from '@lens-protocol/domain/use-cases/profile';

import { mockIProfileCacheManager } from '../../__helpers__/mocks';
import { UpdateFollowPolicyResponder } from '../UpdateFollowPolicyResponder';

function setupUpdateFollowPolicyResponder({ profile }: { profile: Profile }) {
  const profileCacheManager = mockIProfileCacheManager(profile);
  const responder = new UpdateFollowPolicyResponder(profileCacheManager);

  return {
    profileCacheManager,

    responder,
  };
}

describe(`Given the ${UpdateFollowPolicyResponder.name}`, () => {
  const profile = mockProfileFragment({
    followPolicy: {
      type: FollowPolicyType.ANYONE,
    },
  });
  const txData = mockTransactionData({
    request: mockUpdateFollowPolicyRequest({
      profileId: profile.id,
      policy: mockChargeFollowConfig(),
    }),
  });

  describe(`when "${UpdateFollowPolicyResponder.prototype.prepare.name}" method is invoked`, () => {
    it(`should update the profile's follow policy`, async () => {
      const { responder, profileCacheManager } = setupUpdateFollowPolicyResponder({ profile });

      await responder.prepare(txData);

      expect(profileCacheManager.latestProfile).toMatchObject({
        followPolicy: txData.request.policy,
      });
    });
  });

  describe(`when "${UpdateFollowPolicyResponder.prototype.commit.name}" method is invoked`, () => {
    it(`should update the correct Profile in the Apollo Cache`, async () => {
      const { responder, profileCacheManager } = setupUpdateFollowPolicyResponder({ profile });

      const txData = mockTransactionData({
        request: mockUpdateFollowPolicyRequest({ profileId: profile.id }),
      });
      await responder.commit(txData);

      expect(profileCacheManager.refreshProfile).toHaveBeenCalledWith(profile.id);
    });
  });

  describe(`when "${UpdateFollowPolicyResponder.prototype.rollback.name}" method is invoked`, () => {
    it(`should rollback the correct Profile in the Apollo Cache`, async () => {
      const { responder, profileCacheManager } = setupUpdateFollowPolicyResponder({ profile });

      await responder.rollback(txData);

      expect(profileCacheManager.refreshProfile).toHaveBeenCalledWith(profile.id);
    });
  });
});
