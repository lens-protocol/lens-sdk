import { faker } from '@faker-js/faker';
import { Profile, FragmentProfile } from '@lens-protocol/api-bindings';
import {
  mockLensApolloClient,
  mockGetProfileResponse,
  mockMediaFragment,
  mockProfileFragment,
  mockSources,
  mockProfilePictureMediaFragment,
} from '@lens-protocol/api-bindings/mocks';
import {
  mockTransactionData,
  mockUpdateOffChainProfileImageRequest,
} from '@lens-protocol/domain/mocks';

import {
  defaultMediaTransformsConfig,
  mediaTransformConfigToQueryVariables,
} from '../../../../mediaTransforms';
import { ProfileCacheManager } from '../../../infrastructure/ProfileCacheManager';
import { UpdateProfileImageResponder } from '../UpdateProfileImageResponder';

type SetupTestScenarioArgs = {
  cacheProfile: Profile;
  responseProfile: Profile;
};

function setupTestScenario({ cacheProfile, responseProfile }: SetupTestScenarioArgs) {
  const sources = mockSources();
  const mediaTransforms = defaultMediaTransformsConfig;
  const apolloClient = mockLensApolloClient([
    mockGetProfileResponse({
      profile: responseProfile,
      variables: {
        request: {
          profileId: responseProfile.id,
        },
        observerId: null,
        sources,
        ...mediaTransformConfigToQueryVariables(mediaTransforms),
      },
    }),
  ]);

  apolloClient.cache.writeFragment({
    id: apolloClient.cache.identify(cacheProfile),
    fragment: FragmentProfile,
    fragmentName: 'Profile',
    data: cacheProfile,
  });

  const profileCacheManager = new ProfileCacheManager(apolloClient, sources, mediaTransforms);
  const responder = new UpdateProfileImageResponder(profileCacheManager);

  return {
    responder,

    get profileFromCache() {
      return apolloClient.cache.readFragment({
        id: apolloClient.cache.identify(cacheProfile),
        fragment: FragmentProfile,
        fragmentName: 'Profile',
      });
    },
  };
}

describe(`Given an instance of the ${UpdateProfileImageResponder.name}`, () => {
  const profile = mockProfileFragment();
  const newImageUrl = faker.image.imageUrl(600, 600, 'cat', true);

  const transactionData = mockTransactionData({
    request: mockUpdateOffChainProfileImageRequest({
      profileId: profile.id,
      url: newImageUrl,
    }),
  });

  const profileWithNewImage: Profile = {
    ...profile,
    picture: mockProfilePictureMediaFragment({
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
