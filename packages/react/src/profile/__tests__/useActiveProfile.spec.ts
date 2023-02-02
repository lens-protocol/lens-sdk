import {
  createMockApolloClientWithMultipleResponses,
  mockGetProfileQueryMockedResponse,
  mockProfileFragment,
} from '@lens-protocol/api-bindings/mocks';
import { ProfileIdentifier } from '@lens-protocol/domain/use-cases/profile';
import { waitFor } from '@testing-library/react';

import { renderHookWithMocks } from '../../__helpers__/testing-library';
import { ApplicationsState, useAppState } from '../../lifecycle/adapters/ApplicationPresenter';
import { activeProfileVar } from '../adapters/ActiveProfilePresenter';
import { useActiveProfile } from '../useActiveProfile';
import { ProfileFragment } from '../useProfilesToFollow';

// eslint-disable-next-line @typescript-eslint/no-unsafe-return
jest.mock('../../lifecycle/adapters/ApplicationPresenter');

function setupUseActiveProfile(args: {
  profile: ProfileFragment;
  activeProfile: ProfileIdentifier | null;
}) {
  activeProfileVar(args.activeProfile);

  return renderHookWithMocks(() => useActiveProfile(), {
    mocks: {
      apolloClient: createMockApolloClientWithMultipleResponses([
        mockGetProfileQueryMockedResponse({
          profile: args.profile,
          request: {
            profileId: args.profile.id,
          },
        }),
      ]),
    },
  });
}

describe(`Given the ${useActiveProfile.name} hook`, () => {
  const profileId = '0x2000';
  const handle = 'aave.lens';
  const mockProfile: ProfileFragment = mockProfileFragment({ id: profileId, handle });

  describe(`when the application state is ${ApplicationsState.LOADING}`, () => {
    it('should return the expected loading state', async () => {
      jest.mocked(useAppState).mockReturnValue(ApplicationsState.LOADING);
      const { result } = setupUseActiveProfile({
        profile: mockProfile,
        activeProfile: { handle, id: profileId },
      });

      expect(result.current.loading).toBeTruthy();
      expect(result.current.data).toBeUndefined();
    });
  });

  describe(`and the application state is ${ApplicationsState.READY}`, () => {
    beforeAll(() => {
      jest.mocked(useAppState).mockReturnValue(ApplicationsState.READY);
    });

    describe('when the fetch active profile query is loading', () => {
      it('should return the expected loading state', async () => {
        const { result } = setupUseActiveProfile({
          profile: mockProfile,
          activeProfile: { handle, id: profileId },
        });

        expect(result.current.loading).toBeTruthy();
        expect(result.current.data).toBeUndefined();
      });
    });

    describe('when the active profile is defined', () => {
      it('should return the expected profile data', async () => {
        const { result } = setupUseActiveProfile({
          profile: mockProfile,
          activeProfile: { handle, id: profileId },
        });

        await waitFor(() => expect(result.current.loading).toBeFalsy());

        expect(result.current.data).toEqual(mockProfile);
      });
    });

    describe('when the active profile is not defined', () => {
      it('should return null', async () => {
        const { result } = setupUseActiveProfile({
          profile: mockProfile,
          activeProfile: null,
        });

        await waitFor(() => expect(result.current.loading).toBeFalsy());

        expect(result.current.data).toBeNull();
      });
    });
  });
});
