import { ApolloClient } from '@apollo/client';
import { mockSingleLink } from '@apollo/client/testing';
import { ProfileFieldsFragment, ProfileFieldsFragmentDoc } from '@lens-protocol/api-bindings';
import {
  createMockApolloCache,
  mockGetProfileQueryMockedResponse,
  mockProfileFieldsFragment,
} from '@lens-protocol/api-bindings/mocks';
import {
  mockBroadcastedTransactionData,
  mockUpdateFollowPolicyRequest,
  mockUpdateNftProfileImageRequest,
  mockUpdateOffChainProfileImageRequest,
} from '@lens-protocol/domain/mocks';

import { UpdateProfileResponder } from '../UpdateProfileResponder';

function setupUpdateProfileResponder({
  updatedProfile = mockProfileFieldsFragment(),
}: {
  updatedProfile?: ProfileFieldsFragment;
}) {
  const cache = createMockApolloCache();

  const apolloClient = new ApolloClient({
    link: mockSingleLink(
      mockGetProfileQueryMockedResponse({
        request: { profileId: updatedProfile.id },
        profile: updatedProfile,
      }),
    ).setOnError((error) => {
      throw error;
    }),
    cache,
  });

  const responder = new UpdateProfileResponder(apolloClient);

  return {
    responder,

    get profileFromCache() {
      return apolloClient.cache.readFragment({
        id: cache.identify(updatedProfile),
        fragmentName: 'ProfileFields',
        fragment: ProfileFieldsFragmentDoc,
      });
    },
  };
}

describe(`Given the ${UpdateProfileResponder.name}`, () => {
  describe.each([
    {
      requestName: 'UpdateOffChainProfileImageRequest',
      request: mockUpdateOffChainProfileImageRequest(),
    },
    {
      requestName: 'UpdateNftProfileImageRequest',
      request: mockUpdateNftProfileImageRequest(),
    },
    {
      requestName: 'UpdateFollowPolicyRequest',
      request: mockUpdateFollowPolicyRequest(),
    },
  ])(
    `when "${UpdateProfileResponder.prototype.commit.name}" method is invoked with BroadcastedTransactionData<$requestName>`,
    ({ request }) => {
      it(`should update the correct Profile in the Apollo Cache`, async () => {
        const updatedProfile = mockProfileFieldsFragment({ id: request.profileId });
        const scenario = setupUpdateProfileResponder({ updatedProfile });

        const txData = mockBroadcastedTransactionData({ request });
        await scenario.responder.commit(txData);

        expect(scenario.profileFromCache).toEqual(updatedProfile);
      });
    },
  );
});
