import { faker } from '@faker-js/faker';
import { ProfileFragment, ProfileFragmentDoc } from '@lens-protocol/api-bindings';
import {
  createMockApolloClientWithMultipleResponses,
  mockGetProfileQueryMockedResponse,
  mockMediaFragment,
  mockProfileFragment,
  mockProfileMediaFragment,
} from '@lens-protocol/api-bindings/mocks';
import {
  mockBroadcastedTransactionData,
  mockUpdateOffChainProfileImageRequest,
} from '@lens-protocol/domain/mocks';

import { UpdateProfileImageResponder } from '../UpdateProfileImageResponder';

type SetupTestScenarioArgs = {
  cacheProfile: ProfileFragment;
  responseProfile: ProfileFragment;
};

function setupTestScenario({ cacheProfile, responseProfile }: SetupTestScenarioArgs) {
  const apolloClient = createMockApolloClientWithMultipleResponses([
    mockGetProfileQueryMockedResponse({
      profile: responseProfile,
      request: {
        profileId: responseProfile.id,
      },
      observerId: responseProfile.id,
    }),
  ]);

  apolloClient.cache.writeFragment({
    id: apolloClient.cache.identify(cacheProfile),
    fragment: ProfileFragmentDoc,
    fragmentName: 'Profile',
    data: cacheProfile,
  });

  const responder = new UpdateProfileImageResponder(apolloClient);

  return {
    responder,

    get profileFromCache() {
      return apolloClient.cache.readFragment({
        id: apolloClient.cache.identify(cacheProfile),
        fragment: ProfileFragmentDoc,
        fragmentName: 'Profile',
      });
    },
  };
}

describe(`Given an instance of the ${UpdateProfileImageResponder.name}`, () => {
  const profile = mockProfileFragment();
  const newImageUrl = faker.image.imageUrl(600, 600, 'cat', true);

  const transactionData = mockBroadcastedTransactionData({
    request: mockUpdateOffChainProfileImageRequest({
      profileId: profile.id,
      url: newImageUrl,
    }),
  });

  const profileWithNewImage: ProfileFragment = {
    ...profile,
    picture: mockProfileMediaFragment({
      original: mockMediaFragment({
        url: newImageUrl,
      }),
    }),
  };

  describe(`when "${UpdateProfileImageResponder.prototype.prepare.name}" method is invoked`, () => {
    it(`should update profile picture to the latest one`, async () => {
      const scenario = setupTestScenario({ cacheProfile: profile, responseProfile: profile });

      await scenario.responder.prepare(transactionData);

      expect(scenario.profileFromCache).toMatchObject({
        ...profile,
        picture: {
          original: {
            url: newImageUrl,
          },
        },
      });
    });
  });

  describe(`when "${UpdateProfileImageResponder.prototype.commit.name}" method is invoked`, () => {
    it(`should query server again for update profile details`, async () => {
      const scenario = setupTestScenario({
        cacheProfile: profile,
        responseProfile: profileWithNewImage,
      });

      await scenario.responder.prepare(transactionData);
      await scenario.responder.commit(transactionData);

      expect(scenario.profileFromCache).toMatchObject({
        ...profile,
        picture: {
          original: {
            url: newImageUrl,
          },
        },
      });
    });
  });

  describe(`when "${UpdateProfileImageResponder.prototype.rollback.name}" method is invoked`, () => {
    it(`should restore the original profile picture from the server`, async () => {
      const scenario = setupTestScenario({ cacheProfile: profile, responseProfile: profile });

      await scenario.responder.prepare(transactionData);
      await scenario.responder.rollback(transactionData);

      expect(scenario.profileFromCache).toMatchObject(profile);
    });
  });
});
