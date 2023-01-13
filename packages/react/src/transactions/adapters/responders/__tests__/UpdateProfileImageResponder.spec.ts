import { faker } from '@faker-js/faker';
import { ProfileFieldsFragment, ProfileFieldsFragmentDoc } from '@lens-protocol/api-bindings';
import {
  createMockApolloClientWithMultipleResponses,
  mockGetProfileQueryMockedResponse,
  mockProfileFieldsFragment,
} from '@lens-protocol/api-bindings/mocks';
import {
  mockBroadcastedTransactionData,
  mockUpdateOffChainProfileImageRequest,
} from '@lens-protocol/domain/mocks';

import { UpdateProfileImageResponder } from '../UpdateProfileImageResponder';

function setupTestScenario({ profile }: { profile: ProfileFieldsFragment }) {
  const apolloClient = createMockApolloClientWithMultipleResponses([
    mockGetProfileQueryMockedResponse({
      profile,
      request: {
        profileId: profile.id,
      },
    }),
  ]);

  apolloClient.cache.writeFragment({
    id: apolloClient.cache.identify(profile),
    fragment: ProfileFieldsFragmentDoc,
    fragmentName: 'ProfileFields',
    data: profile,
  });

  const responder = new UpdateProfileImageResponder(apolloClient);

  return {
    responder,

    get profileFromCache() {
      return apolloClient.cache.readFragment({
        id: apolloClient.cache.identify(profile),
        fragment: ProfileFieldsFragmentDoc,
        fragmentName: 'ProfileFields',
      });
    },
  };
}

describe(`Given an instance of the ${UpdateProfileImageResponder.name}`, () => {
  const profile = mockProfileFieldsFragment();
  const newImageUrl = faker.image.imageUrl(600, 600, 'cat', true);

  const transactionData = mockBroadcastedTransactionData({
    request: mockUpdateOffChainProfileImageRequest({
      profileId: profile.id,
      url: newImageUrl,
    }),
  });

  describe(`when "${UpdateProfileImageResponder.prototype.prepare.name}" method is invoked`, () => {
    it(`should update profile picture to the latest one`, async () => {
      const scenario = setupTestScenario({ profile });

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

  describe(`when "${UpdateProfileImageResponder.prototype.rollback.name}" method is invoked`, () => {
    it(`should restore the original profile picture from the server`, async () => {
      const scenario = setupTestScenario({ profile });

      await scenario.responder.prepare(transactionData);
      await scenario.responder.rollback(transactionData);

      expect(scenario.profileFromCache).toMatchObject(profile);
    });
  });
});
