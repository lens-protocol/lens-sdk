import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { faker } from '@faker-js/faker';
import {
  createMockApolloClientWithMultipleResponses,
  mockGetAllProfilesByOwnerAddressQueryMockedResponse,
  mockGetProfileQueryMockedResponse,
  mockProfileFieldsFragment,
} from '@lens-protocol/api/mocks';
import { Profile } from '@lens-protocol/domain/entities';
import { mockEthereumAddress } from '@lens-protocol/shared-kernel/mocks';

import { ProfileGateway } from '../ProfileGateway';

function setupProfileGateway({
  apolloClient,
}: {
  apolloClient: ApolloClient<NormalizedCacheObject>;
}) {
  return new ProfileGateway(apolloClient);
}

describe(`Given an instance of the ${ProfileGateway.name}`, () => {
  describe(`when "${ProfileGateway.prototype.getAllProfilesByOwnerAddress.name}" method is invoked`, () => {
    it('should return all Profile entities owned by the given address', async () => {
      const address = mockEthereumAddress();
      const profileDataFragment = mockProfileFieldsFragment();
      const apolloClient = createMockApolloClientWithMultipleResponses([
        mockGetAllProfilesByOwnerAddressQueryMockedResponse({
          address,
          profiles: [profileDataFragment],
        }),
      ]);
      const gateway = setupProfileGateway({ apolloClient });

      const [profile] = await gateway.getAllProfilesByOwnerAddress(address);

      expect(profile).toBeInstanceOf(Profile);
      expect(profile).toEqual({
        id: profileDataFragment.id,
        handle: profileDataFragment.handle,
      });
    });
  });

  describe(`when "${ProfileGateway.prototype.getProfileByHandle.name}" method is invoked`, () => {
    it('should return the Profile entity associated with the given handle', async () => {
      const profileDataFragment = mockProfileFieldsFragment();
      const apolloClient = createMockApolloClientWithMultipleResponses([
        mockGetProfileQueryMockedResponse({
          request: { handle: profileDataFragment.handle },
          profile: profileDataFragment,
        }),
      ]);
      const gateway = setupProfileGateway({ apolloClient });

      const profile = await gateway.getProfileByHandle(profileDataFragment.handle);

      expect(profile).toBeInstanceOf(Profile);
      expect(profile).toEqual({
        id: profileDataFragment.id,
        handle: profileDataFragment.handle,
      });
    });

    it('should return null if the Profile does not exist', async () => {
      const handle = faker.internet.userName();
      const apolloClient = createMockApolloClientWithMultipleResponses([
        mockGetProfileQueryMockedResponse({ request: { handle }, profile: null }),
      ]);
      const gateway = setupProfileGateway({ apolloClient });

      const profile = await gateway.getProfileByHandle(handle);

      expect(profile).toBeNull();
    });
  });
});
