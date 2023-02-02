import {
  createMockApolloClientWithMultipleResponses,
  mockGetProfileQueryMockedResponse,
  mockProfileFragment,
} from '@lens-protocol/api-bindings/mocks';
import { ProfileIdentifier } from '@lens-protocol/domain/use-cases/profile';
import { waitFor } from '@testing-library/react';

import { renderHookWithMocks } from '../../__helpers__/testing-library';
import { activeProfileVar } from '../adapters/ActiveProfilePresenter';
import { useActiveProfile } from '../useActiveProfile';
import { ProfileFragment } from '../useProfilesToFollow';

// eslint-disable-next-line @typescript-eslint/no-unsafe-return
jest.mock('../../lifecycle/adapters/ApplicationPresenter', () => ({
  ...jest.requireActual('../../lifecycle/adapters/ApplicationPresenter'),
  useAppState: jest.fn().mockReturnValue('READY'),
}));

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

  describe('when the fetch active profile query is loading', () => {
    it('should return loading', async () => {
      const { result } = setupUseActiveProfile({
        profile: mockProfile,
        activeProfile: { handle, id: profileId },
      });

      expect(result.current.loading).toBeTruthy();
      expect(result.current.data).toBeUndefined();
    });
  });

  describe('when the active profile is defined', () => {
    it('should return a profile', async () => {
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
