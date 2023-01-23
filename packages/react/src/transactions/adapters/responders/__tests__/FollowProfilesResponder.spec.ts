import { ProfileFragment, ProfileFragmentDoc } from '@lens-protocol/api-bindings';
import { createMockApolloCache, mockProfileFragment } from '@lens-protocol/api-bindings/mocks';
import {
  mockBroadcastedTransactionData,
  mockUnconstrainedFollowRequest,
} from '@lens-protocol/domain/mocks';

import { FollowProfilesResponder } from '../FollowProfilesResponder';

function setupTestScenario({ existingProfile }: { existingProfile: ProfileFragment }) {
  const apolloCache = createMockApolloCache();

  apolloCache.writeFragment({
    id: apolloCache.identify({
      __typename: 'Profile',
      id: existingProfile.id,
    }),
    fragment: ProfileFragmentDoc,
    fragmentName: 'Profile',
    data: existingProfile,
  });

  const responder = new FollowProfilesResponder(apolloCache);

  return {
    responder,

    get updatedProfile() {
      return apolloCache.readFragment({
        id: apolloCache.identify({
          __typename: 'Profile',
          id: existingProfile.id,
        }),
        fragment: ProfileFragmentDoc,
        fragmentName: 'Profile',
      });
    },
  };
}

describe(`Given the ${FollowProfilesResponder.name}`, () => {
  describe(`when "${FollowProfilesResponder.prototype.prepare.name}" method is invoked`, () => {
    it(`should update apollo cache with follow information`, async () => {
      const request = mockUnconstrainedFollowRequest();
      const transactionData = mockBroadcastedTransactionData({ request });
      const existingProfile = mockProfileFragment({
        id: transactionData.request.profileId,
        stats: {
          __typename: 'ProfileStats',
          totalFollowers: 2,
          totalFollowing: 0,
          totalPosts: 0,
        },
      });
      const scenario = setupTestScenario({ existingProfile });

      await scenario.responder.prepare(transactionData);

      expect(scenario.updatedProfile).toEqual(
        expect.objectContaining({
          id: existingProfile.id,
          isFollowedByMe: false,
          isOptimisticFollowedByMe: true,
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          stats: expect.objectContaining({
            totalFollowers: 3,
          }),
        }),
      );
    });
  });

  describe(`when "${FollowProfilesResponder.prototype.commit.name}" method is invoked`, () => {
    it(`should update apollo cache with follow information`, async () => {
      const request = mockUnconstrainedFollowRequest();
      const transactionData = mockBroadcastedTransactionData({ request });
      const existingProfile = mockProfileFragment({
        id: transactionData.request.profileId,
        isFollowedByMe: false,
        isOptimisticFollowedByMe: true,
      });
      const scenario = setupTestScenario({ existingProfile });

      await scenario.responder.commit(transactionData);

      expect(scenario.updatedProfile).toEqual(
        expect.objectContaining({
          id: existingProfile.id,
          isFollowedByMe: true,
          isOptimisticFollowedByMe: false,
        }),
      );
    });
  });

  describe(`when "${FollowProfilesResponder.prototype.rollback.name}" method is invoked`, () => {
    it(`should update apollo cache with follow information`, async () => {
      const request = mockUnconstrainedFollowRequest();
      const transactionData = mockBroadcastedTransactionData({ request });
      const existingProfile = mockProfileFragment({
        id: transactionData.request.profileId,
        isFollowedByMe: false,
        isOptimisticFollowedByMe: true,
        stats: {
          __typename: 'ProfileStats',
          totalFollowers: 2,
          totalFollowing: 0,
          totalPosts: 0,
        },
      });
      const scenario = setupTestScenario({ existingProfile });

      await scenario.responder.rollback(transactionData);

      expect(scenario.updatedProfile).toEqual(
        expect.objectContaining({
          id: existingProfile.id,
          isFollowedByMe: false,
          isOptimisticFollowedByMe: false,
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          stats: expect.objectContaining({
            totalFollowers: 1,
          }),
        }),
      );
    });
  });
});
