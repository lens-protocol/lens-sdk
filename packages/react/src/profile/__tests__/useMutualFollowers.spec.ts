import {
  createMockApolloClientWithMultipleResponses,
  mockMutualFollowersQuery,
  mockProfileFieldsFragment,
} from '@lens-protocol/api-bindings/mocks';
import { waitFor } from '@testing-library/react';

import { renderHookWithMocks } from '../../__helpers__/testing-library';
import { useMutualFollowers } from '../useMutualFollowers';
import { ProfileFieldsFragment } from '../useProfilesToFollow';

describe('Given the useMutualFollowers hook', () => {
  const observer = mockProfileFieldsFragment();
  const viewingProfile = mockProfileFieldsFragment();

  const mockProfiles: ProfileFieldsFragment[] = [mockProfileFieldsFragment()];

  describe('when the query returns data successfully', () => {
    it('should return mutual followers profiles', async () => {
      const { result } = renderHookWithMocks(
        () =>
          useMutualFollowers({
            observerId: observer.id,
            viewingProfileId: viewingProfile.id,
          }),
        {
          mocks: {
            apolloClient: createMockApolloClientWithMultipleResponses([
              mockMutualFollowersQuery({
                variables: {
                  observerId: observer.id,
                  viewingProfileId: viewingProfile.id,
                  limit: 10,
                },
                profiles: mockProfiles,
              }),
            ]),
          },
        },
      );

      await waitFor(() => expect(result.current.loading).toBeFalsy());

      expect(result.current.data).toEqual(mockProfiles);
    });
  });
});
