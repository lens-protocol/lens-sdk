import { ProfileFragment } from '@lens-protocol/api-bindings';
import {
  createMockApolloClientWithMultipleResponses,
  mockGetProfileQueryMockedResponse,
  mockProfileFragment,
} from '@lens-protocol/api-bindings/mocks';
import { mockProfileIdentifier, mockWalletData } from '@lens-protocol/domain/mocks';
import { ProfileIdentifier } from '@lens-protocol/domain/use-cases/profile';
import { waitFor } from '@testing-library/react';

import { renderHookWithMocks } from '../../__helpers__/testing-library';
import { ApplicationsState, useAppState } from '../../lifecycle/adapters/ApplicationPresenter';
import { activeWalletVar } from '../../wallet/adapters/ActiveWalletPresenter';
import { activeProfileVar } from '../adapters/ActiveProfilePresenter';
import { useActiveProfile } from '../useActiveProfile';

// eslint-disable-next-line @typescript-eslint/no-unsafe-return
jest.mock('../../lifecycle/adapters/ApplicationPresenter');

function setupUseActiveProfile(args: {
  profile: ProfileFragment;
  activeProfile: ProfileIdentifier | null;
}) {
  activeProfileVar(args.activeProfile);
  activeWalletVar(mockWalletData({ address: args.profile.ownedBy }));

  return renderHookWithMocks(() => useActiveProfile(), {
    mocks: {
      apolloClient: createMockApolloClientWithMultipleResponses(
        [
          mockGetProfileQueryMockedResponse({
            profile: args.profile,
            request: {
              profileId: args.profile.id,
            },
          }),
        ],
        { activeWalletVar },
      ),
    },
  });
}

describe(`Given the ${useActiveProfile.name} hook`, () => {
  const profileId = '0x2000';
  const handle = 'aave.lens';
  const profile = mockProfileFragment({ id: profileId, handle });

  describe(`when the application state is ${ApplicationsState.LOADING}`, () => {
    it('should return the expected loading state', async () => {
      jest.mocked(useAppState).mockReturnValue(ApplicationsState.LOADING);
      const { result } = setupUseActiveProfile({
        profile,
        activeProfile: mockProfileIdentifier({ handle, id: profileId }),
      });

      expect(result.current.loading).toBeTruthy();
      expect(result.current.data).toBeUndefined();
    });
  });

  describe(`and the application state is ${ApplicationsState.READY}`, () => {
    beforeAll(() => {
      jest.mocked(useAppState).mockReturnValue(ApplicationsState.READY);
    });

    describe('when the active profile is defined', () => {
      it('should return the expected loading state while fetching profile data', async () => {
        const { result } = setupUseActiveProfile({
          profile,
          activeProfile: { handle, id: profileId },
        });

        expect(result.current.loading).toBe(true);
        expect(result.current.data).toBeUndefined();
      });

      it('should return the expected profile data', async () => {
        const { result } = setupUseActiveProfile({
          profile,
          activeProfile: mockProfileIdentifier({ handle, id: profileId }),
        });

        await waitFor(() => expect(result.current.loading).toBe(false));

        expect(result.current.data).toMatchObject({
          id: profileId,
        });
      });
    });

    describe('when the active profile is not defined', () => {
      it('should return null', async () => {
        const { result } = setupUseActiveProfile({
          profile,
          activeProfile: null,
        });

        await waitFor(() => expect(result.current.loading).toBe(false));

        expect(result.current.data).toBeNull();
      });
    });
  });
});
