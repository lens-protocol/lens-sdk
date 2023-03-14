import { ProfileFragment } from '@lens-protocol/api-bindings';
import {
  createGetAllProfilesByOwnerAddressQueryMockedResponse,
  createMockApolloClientWithMultipleResponses,
  mockProfileFragment,
  mockSources,
} from '@lens-protocol/api-bindings/mocks';
import { ProfileId } from '@lens-protocol/domain/entities';
import { mockProfile, mockProfileId, mockWallet } from '@lens-protocol/domain/mocks';
import { EthereumAddress } from '@lens-protocol/shared-kernel';
import { waitFor } from '@testing-library/react';

import { renderHookWithMocks } from '../../__helpers__/testing-library';
import { simulateAppReady } from '../../lifecycle/adapters/__helpers__/simulate';
import { activeWalletVar } from '../../wallet/adapters/ActiveWalletPresenter';
import { activeProfileIdentifierVar } from '../adapters/ActiveProfilePresenter';
import { useProfilesOwnedByMe, UseProfilesOwnedByMeArgs } from '../useProfilesOwnedByMe';

function setupTestScenario({
  address,
  result,
  expectedObserverId,
  ...args
}: UseProfilesOwnedByMeArgs & {
  address: EthereumAddress;
  expectedObserverId?: ProfileId;
  result: ProfileFragment[];
}) {
  const sources = mockSources();

  return renderHookWithMocks(() => useProfilesOwnedByMe(args), {
    mocks: {
      sources,
      apolloClient: createMockApolloClientWithMultipleResponses([
        createGetAllProfilesByOwnerAddressQueryMockedResponse({
          variables: {
            ...args,
            address,
            observerId: expectedObserverId ?? null,
            limit: 10,
            sources,
          },
          profiles: result,
        }),
      ]),
    },
  });
}

describe(`Given the ${useProfilesOwnedByMe.name} hook`, () => {
  const wallet = mockWallet();
  const profiles = [
    mockProfileFragment({ ownedBy: wallet.address }),
    mockProfileFragment({ ownedBy: wallet.address }),
  ];

  beforeAll(() => {
    simulateAppReady();
  });

  describe('and there is an Active Wallet defined', () => {
    beforeAll(() => {
      activeWalletVar(wallet);
    });

    describe('when invoked', () => {
      it('should return the profiles owned by the Active Wallet address', async () => {
        const { result } = setupTestScenario({ address: wallet.address, result: profiles });

        await waitFor(() => expect(result.current.loading).toBeFalsy());
        expect(result.current.data).toEqual(profiles);
      });
    });

    describe('when there is an Active Profile defined', () => {
      const activeProfile = mockProfile();

      beforeAll(() => {
        activeProfileIdentifierVar(activeProfile);
      });

      it('should use the Active Profile Id as the "observerId"', async () => {
        const { result } = setupTestScenario({
          address: wallet.address,
          result: profiles,
          expectedObserverId: activeProfile.id,
        });

        await waitFor(() => expect(result.current.loading).toBeFalsy());
        expect(result.current.data).toEqual(profiles);
      });

      it('should always allow to specify the "observerId" on a per-call basis', async () => {
        const observerId = mockProfileId();

        const { result } = setupTestScenario({
          address: wallet.address,
          observerId,
          result: profiles,
          expectedObserverId: observerId,
        });

        await waitFor(() => expect(result.current.loading).toBeFalsy());
        expect(result.current.data).toEqual(profiles);
      });
    });
  });
});
