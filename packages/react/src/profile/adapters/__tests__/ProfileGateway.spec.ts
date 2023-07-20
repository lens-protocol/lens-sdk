import { faker } from '@faker-js/faker';
import { SafeApolloClient } from '@lens-protocol/api-bindings';
import {
  mockLensApolloClient,
  mockGetProfileResponse,
  mockProfileFragment,
  mockGetAllProfilesResponse,
} from '@lens-protocol/api-bindings/mocks';
import { Profile } from '@lens-protocol/domain/entities';
import { mockProfileId } from '@lens-protocol/domain/mocks';
import { mockEthereumAddress } from '@lens-protocol/shared-kernel/mocks';

import { ProfileGateway } from '../ProfileGateway';

function setupProfileGateway({ apolloClient }: { apolloClient: SafeApolloClient }) {
  return new ProfileGateway(apolloClient);
}

describe(`Given an instance of the ${ProfileGateway.name}`, () => {
  describe(`when "${ProfileGateway.prototype.getAllProfilesByOwnerAddress.name}" method is invoked`, () => {
    it('should return all Profile entities owned by the given address', async () => {
      const address = mockEthereumAddress();
      const profileDataFragment = mockProfileFragment();
      const apolloClient = mockLensApolloClient([
        mockGetAllProfilesResponse({
          variables: {
            byOwnerAddresses: [address],
            limit: 10,
            sources: [],
          },
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
      const profileDataFragment = mockProfileFragment();
      const apolloClient = mockLensApolloClient([
        mockGetProfileResponse({
          variables: {
            request: { handle: profileDataFragment.handle },
            sources: [],
          },
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
      const apolloClient = mockLensApolloClient([
        mockGetProfileResponse({
          variables: { request: { handle }, sources: [] },
          profile: null,
        }),
      ]);
      const gateway = setupProfileGateway({ apolloClient });

      const profile = await gateway.getProfileByHandle(handle);

      expect(profile).toBeNull();
    });
  });

  describe(`when "${ProfileGateway.prototype.getProfileById.name}" method is invoked`, () => {
    it('should return the corresponding Profile entity', async () => {
      const profileDataFragment = mockProfileFragment();
      const apolloClient = mockLensApolloClient([
        mockGetProfileResponse({
          variables: {
            request: { profileId: profileDataFragment.id },
            sources: [],
          },
          profile: profileDataFragment,
        }),
      ]);
      const gateway = setupProfileGateway({ apolloClient });

      const profile = await gateway.getProfileById(profileDataFragment.id);

      expect(profile).toBeInstanceOf(Profile);
      expect(profile).toEqual({
        id: profileDataFragment.id,
        handle: profileDataFragment.handle,
      });
    });

    it('should return null if the Profile does not exist', async () => {
      const profileId = mockProfileId();
      const apolloClient = mockLensApolloClient([
        mockGetProfileResponse({
          variables: {
            request: { profileId },
            sources: [],
          },
          profile: null,
        }),
      ]);
      const gateway = setupProfileGateway({ apolloClient });

      const profile = await gateway.getProfileById(profileId);

      expect(profile).toBeNull();
    });
  });
});
