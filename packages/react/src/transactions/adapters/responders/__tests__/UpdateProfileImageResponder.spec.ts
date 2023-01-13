import { faker } from '@faker-js/faker';
import { ProfileFieldsFragment, ProfileFieldsFragmentDoc } from '@lens-protocol/api-bindings';
import {
  createMockApolloCache,
  mockProfileFieldsFragment,
} from '@lens-protocol/api-bindings/mocks';
import {
  mockBroadcastedTransactionData,
  mockUpdateOffChainProfileImageRequest,
} from '@lens-protocol/domain/mocks';

import { UpdateProfileImageResponder } from '../UpdateProfileImageResponder';

function setupTestScenario({ profile }: { profile: ProfileFieldsFragment }) {
  const apolloCache = createMockApolloCache();

  apolloCache.writeFragment({
    id: apolloCache.identify(profile),
    fragment: ProfileFieldsFragmentDoc,
    fragmentName: 'ProfileFields',
    data: profile,
  });

  const responder = new UpdateProfileImageResponder(apolloCache);

  return {
    responder,

    get profileFromCache() {
      return apolloCache.readFragment({
        id: apolloCache.identify(profile),
        fragment: ProfileFieldsFragmentDoc,
        fragmentName: 'ProfileFields',
      });
    },
  };
}

describe(`Given an instance of the ${UpdateProfileImageResponder.name}`, () => {
  const profile = mockProfileFieldsFragment();

  describe(`when "${UpdateProfileImageResponder.prototype.commit.name}" method is invoked`, () => {
    const newImageUrl = faker.image.imageUrl(600, 600, 'cat', true);

    const transactionData = mockBroadcastedTransactionData({
      request: mockUpdateOffChainProfileImageRequest({
        profileId: profile.id,
        url: newImageUrl,
      }),
    });

    it(`should update profile picture to the latest one`, async () => {
      const scenario = setupTestScenario({ profile });

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
});
