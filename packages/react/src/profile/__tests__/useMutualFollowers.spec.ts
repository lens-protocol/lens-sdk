import {
  mockLensApolloClient,
  mockMutualFollowersResponse,
  mockProfileFragment,
  mockSources,
} from '@lens-protocol/api-bindings/mocks';
import { waitFor } from '@testing-library/react';

import { renderHookWithMocks } from '../../__helpers__/testing-library';
import { useMutualFollowers } from '../useMutualFollowers';

const sources = mockSources();

describe('Given the useMutualFollowers hook', () => {
  const observer = mockProfileFragment();
  const viewingProfile = mockProfileFragment();

  const mockProfiles = [mockProfileFragment()];

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
            sources,
            apolloClient: mockLensApolloClient([
              mockMutualFollowersResponse({
                variables: {
                  observerId: observer.id,
                  viewingProfileId: viewingProfile.id,
                  limit: 10,
                  sources,
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
