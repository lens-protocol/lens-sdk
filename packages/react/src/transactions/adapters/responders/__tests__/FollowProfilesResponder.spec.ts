import { Profile, FragmentProfile } from '@lens-protocol/api-bindings';
import {
  createMockApolloCache,
  mockProfileFragment,
  mockProfileStatsFragment,
} from '@lens-protocol/api-bindings/mocks';
import { mockTransactionData, mockUnconstrainedFollowRequest } from '@lens-protocol/domain/mocks';

import { FollowProfilesResponder } from '../FollowProfilesResponder';

function setupTestScenario({ existingProfile }: { existingProfile: Profile }) {
  const apolloCache = createMockApolloCache();

  apolloCache.writeFragment({
    id: apolloCache.identify({
      __typename: 'Profile',
      id: existingProfile.id,
    }),
    fragment: FragmentProfile,
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
        fragment: FragmentProfile,
        fragmentName: 'Profile',
      });
    },
  };
}

describe(`Given the ${FollowProfilesResponder.name}`, () => {
  describe(`when "${FollowProfilesResponder.prototype.prepare.name}" method is invoked`, () => {
    it(`should update apollo cache with follow information`, async () => {
      const request = mockUnconstrainedFollowRequest();
      const transactionData = mockTransactionData({ request });
      const existingProfile = mockProfileFragment({
        id: transactionData.request.profileId,
        stats: mockProfileStatsFragment({
          totalFollowers: 2,
        }),
      });
      const scenario = setupTestScenario({ existingProfile });

      await scenario.responder.prepare(transactionData);

      expect(scenario.updatedProfile).toMatchObject({
        id: existingProfile.id,

        stats: {
          totalFollowers: 3,
        },
      });
    });
  });

  describe(`when "${FollowProfilesResponder.prototype.commit.name}" method is invoked`, () => {
    it(`should update apollo cache with follow information`, async () => {
      const request = mockUnconstrainedFollowRequest();
      const transactionData = mockTransactionData({ request });
      const existingProfile = mockProfileFragment({
        id: transactionData.request.profileId,
        isFollowedByMe: false,
        stats: mockProfileStatsFragment({
          totalFollowers: 2,
        }),
      });
      const scenario = setupTestScenario({ existingProfile });

      await scenario.responder.commit(transactionData);

      expect(scenario.updatedProfile).toMatchObject({
        id: existingProfile.id,
        isFollowedByMe: true,
        stats: {
          totalFollowers: 3,
        },
      });
    });
  });

  describe(`when "${FollowProfilesResponder.prototype.rollback.name}" method is invoked`, () => {
    it(`should update apollo cache with follow information`, async () => {
      const request = mockUnconstrainedFollowRequest();
      const transactionData = mockTransactionData({ request });
      const existingProfile = mockProfileFragment({
        id: transactionData.request.profileId,
        stats: mockProfileStatsFragment({
          totalFollowers: 2,
        }),
      });
      const scenario = setupTestScenario({ existingProfile });

      await scenario.responder.rollback(transactionData);

      expect(scenario.updatedProfile).toMatchObject({
        id: existingProfile.id,
        stats: {
          totalFollowers: 1,
        },
      });
    });
  });
});
