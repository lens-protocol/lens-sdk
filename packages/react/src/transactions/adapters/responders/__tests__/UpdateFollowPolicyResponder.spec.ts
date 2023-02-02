import { ProfileFragment, ProfileFragmentDoc } from '@lens-protocol/api-bindings';
import {
  createMockApolloClientWithMultipleResponses,
  mockGetProfileQueryMockedResponse,
  mockProfileFragment,
} from '@lens-protocol/api-bindings/mocks';
import {
  mockBroadcastedTransactionData,
  mockChargeFollowPolicy,
  mockUpdateFollowPolicyRequest,
} from '@lens-protocol/domain/mocks';
import { FollowPolicyType } from '@lens-protocol/domain/use-cases/profile';
import { mockEthereumAddress } from '@lens-protocol/shared-kernel/mocks';

import { UpdateFollowPolicyResponder } from '../UpdateFollowPolicyResponder';

function setupUpdateFollowPolicyResponder({
  existingProfile = mockProfileFragment(),
  updatedProfile = mockProfileFragment(),
}: {
  existingProfile?: ProfileFragment;
  updatedProfile?: ProfileFragment;
}) {
  const apolloClient = createMockApolloClientWithMultipleResponses([
    mockGetProfileQueryMockedResponse({
      request: { profileId: updatedProfile.id },
      profile: updatedProfile,
    }),
  ]);

  apolloClient.cache.writeFragment({
    id: apolloClient.cache.identify({
      __typename: 'Profile',
      id: existingProfile.id,
    }),
    fragment: ProfileFragmentDoc,
    fragmentName: 'Profile',
    data: existingProfile,
  });

  const responder = new UpdateFollowPolicyResponder(apolloClient);

  return {
    responder,

    profileFromCache(profileId: string) {
      return apolloClient.cache.readFragment({
        id: apolloClient.cache.identify({
          __typename: 'Profile',
          id: profileId,
        }),
        fragment: ProfileFragmentDoc,
        fragmentName: 'Profile',
      });
    },
  };
}

describe(`Given the ${UpdateFollowPolicyResponder.name}`, () => {
  describe(`when "${UpdateFollowPolicyResponder.prototype.prepare.name}" method is invoked with TransactionData<UpdateFollowPolicyRequest>`, () => {
    it(`should update the profile's follow policy`, async () => {
      const existingProfile = mockProfileFragment({
        followPolicy: {
          type: FollowPolicyType.ANYONE,
        },
      });
      const updatedFollowPolicy = mockChargeFollowPolicy();

      const scenario = setupUpdateFollowPolicyResponder({ existingProfile });

      const txData = mockBroadcastedTransactionData({
        request: mockUpdateFollowPolicyRequest({
          profileId: existingProfile.id,
          policy: updatedFollowPolicy,
        }),
      });

      await scenario.responder.prepare(txData);

      expect(scenario.profileFromCache(existingProfile.id)).toEqual(
        expect.objectContaining({ followPolicy: updatedFollowPolicy }),
      );
    });
  });

  describe(`when "${UpdateFollowPolicyResponder.prototype.commit.name}" method is invoked with BroadcastedTransactionData<UpdateFollowPolicyRequest>`, () => {
    it(`should update the correct Profile in the Apollo Cache`, async () => {
      const updatedProfile = mockProfileFragment({
        followPolicy: {
          type: FollowPolicyType.ONLY_PROFILE_OWNERS,
          contractAddress: mockEthereumAddress(),
        },
      });
      const scenario = setupUpdateFollowPolicyResponder({ updatedProfile });

      const txData = mockBroadcastedTransactionData({
        request: mockUpdateFollowPolicyRequest({ profileId: updatedProfile.id }),
      });
      await scenario.responder.commit(txData);

      expect(scenario.profileFromCache(updatedProfile.id)).toEqual(updatedProfile);
    });
  });

  describe(`when "${UpdateFollowPolicyResponder.prototype.rollback.name}" method is invoked with BroadcastedTransactionData<UpdateFollowPolicyRequest>`, () => {
    it(`should rollback the correct Profile in the Apollo Cache`, async () => {
      const updatedProfile = mockProfileFragment({
        followPolicy: {
          type: FollowPolicyType.ONLY_PROFILE_OWNERS,
          contractAddress: mockEthereumAddress(),
        },
      });
      const scenario = setupUpdateFollowPolicyResponder({ updatedProfile });

      const txData = mockBroadcastedTransactionData({
        request: mockUpdateFollowPolicyRequest({ profileId: updatedProfile.id }),
      });
      await scenario.responder.rollback(txData);

      expect(scenario.profileFromCache(updatedProfile.id)).toEqual(updatedProfile);
    });
  });
});
