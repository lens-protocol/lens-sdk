import { Profile } from '@lens-protocol/api-bindings';
import {
  mockGetAllProfilesResponse,
  mockLensApolloClient,
  mockProfileFragment,
  mockSources,
  simulateAuthenticatedProfile,
  simulateAuthenticatedWallet,
} from '@lens-protocol/api-bindings/mocks';
import { ProfileId } from '@lens-protocol/domain/entities';
import { mockProfile, mockProfileId, mockWalletData } from '@lens-protocol/domain/mocks';
import { EthereumAddress } from '@lens-protocol/shared-kernel';
import { waitFor } from '@testing-library/react';

import { renderHookWithMocks } from '../../__helpers__/testing-library';
import {
  defaultMediaTransformsConfig,
  mediaTransformConfigToQueryVariables,
} from '../../mediaTransforms';
import { useProfilesOwnedByMe, UseProfilesOwnedByMeArgs } from '../useProfilesOwnedByMe';

function setupTestScenario({
  address,
  result,
  expectedObserverId,
  ...args
}: UseProfilesOwnedByMeArgs & {
  address: EthereumAddress;
  expectedObserverId?: ProfileId;
  result: Profile[];
}) {
  const sources = mockSources();

  return renderHookWithMocks(() => useProfilesOwnedByMe(args), {
    mocks: {
      sources,
      mediaTransforms: defaultMediaTransformsConfig,
      apolloClient: mockLensApolloClient([
        mockGetAllProfilesResponse({
          variables: {
            ...args,
            byOwnerAddresses: [address],
            observerId: expectedObserverId ?? null,
            limit: 10,
            sources,
            ...mediaTransformConfigToQueryVariables(defaultMediaTransformsConfig),
          },
          profiles: result,
        }),
      ]),
    },
  });
}

describe(`Given the ${useProfilesOwnedByMe.name} hook`, () => {
  const wallet = mockWalletData();
  const profiles = [
    mockProfileFragment({ ownedBy: wallet.address, ownedByMe: true }),
    mockProfileFragment({ ownedBy: wallet.address, ownedByMe: true }),
  ];
  const expectedProfiles = profiles.map(({ id }) => ({ id }));

  describe('and there is an Active Wallet defined', () => {
    beforeAll(() => {
      simulateAuthenticatedWallet(wallet);
    });

    describe('when invoked', () => {
      it('should return the profiles owned by the Active Wallet address', async () => {
        const { result } = setupTestScenario({ address: wallet.address, result: profiles });

        await waitFor(() => expect(result.current.loading).toBeFalsy());
        expect(result.current.data).toMatchObject(expectedProfiles);
      });
    });

    describe('when there is an Active Profile defined', () => {
      const activeProfile = mockProfile();

      beforeAll(() => {
        simulateAuthenticatedProfile(activeProfile, wallet);
      });

      it('should use the Active Profile Id as the "observerId"', async () => {
        const { result } = setupTestScenario({
          address: wallet.address,
          result: profiles,
          expectedObserverId: activeProfile.id,
        });

        await waitFor(() => expect(result.current.loading).toBeFalsy());
        expect(result.current.data).toMatchObject(expectedProfiles);
      });

      it('should allow to override the "observerId" on a per-call basis', async () => {
        const observerId = mockProfileId();

        const { result } = setupTestScenario({
          address: wallet.address,
          observerId,
          result: profiles,
          expectedObserverId: observerId,
        });

        await waitFor(() => expect(result.current.loading).toBeFalsy());
        expect(result.current.data).toMatchObject(expectedProfiles);
      });
    });
  });
});
