import { Profile, FragmentProfile } from '@lens-protocol/api-bindings';
import {
  createGetProfileMockedResponse,
  mockProfileFragment,
  createMockApolloClientWithMultipleResponses,
  mockSources,
} from '@lens-protocol/api-bindings/mocks';
import {
  mockTransactionData,
  mockUpdateDispatcherConfigRequest,
} from '@lens-protocol/domain/mocks';
import { nonNullable } from '@lens-protocol/shared-kernel';
import { mockEthereumAddress } from '@lens-protocol/shared-kernel/mocks';

import { ProfileCacheManager } from '../../../infrastructure/ProfileCacheManager';
import { UpdateDispatcherConfigResponder } from '../UpdateDispatcherConfigResponder';

function setupTestScenario({ profile }: { profile: Profile }) {
  const sources = mockSources();
  const apolloClient = createMockApolloClientWithMultipleResponses([
    createGetProfileMockedResponse({
      profile,
      variables: {
        request: {
          profileId: profile.id,
        },
        sources,
      },
    }),
  ]);

  const profileCacheManager = new ProfileCacheManager(apolloClient, sources);
  const responder = new UpdateDispatcherConfigResponder(profileCacheManager);

  return {
    responder,

    get profileFromCache() {
      return nonNullable(
        apolloClient.cache.readFragment({
          id: apolloClient.cache.identify({
            __typename: 'Profile',
            id: profile.id,
          }),
          fragment: FragmentProfile,
          fragmentName: 'Profile',
        }),
        'Profile not found in cache',
      );
    },
  };
}

describe(`Given the ${UpdateDispatcherConfigResponder.name}`, () => {
  describe(`when "${UpdateDispatcherConfigResponder.prototype.commit.name}" method is invoked`, () => {
    it(`should update apollo cache with the new dispatcher configuration`, async () => {
      const profileWithoutDispatcherConfig = mockProfileFragment({ dispatcher: null });
      const profileWithDispatcherConfig = mockProfileFragment({
        ...profileWithoutDispatcherConfig,
        dispatcher: { address: mockEthereumAddress(), canUseRelay: true },
      });
      const request = mockUpdateDispatcherConfigRequest({
        enabled: true,
        profileId: profileWithoutDispatcherConfig.id,
      });
      const transactionData = mockTransactionData({ request });

      const scenario = setupTestScenario({ profile: profileWithDispatcherConfig });

      await scenario.responder.commit(transactionData);

      expect(scenario.profileFromCache).toEqual(profileWithDispatcherConfig);
    });
  });
});
