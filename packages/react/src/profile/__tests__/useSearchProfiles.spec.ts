import {
  createMockApolloClientWithMultipleResponses,
  createSearchProfilesQueryMockedResponse,
  mockProfileFragment,
} from '@lens-protocol/api-bindings/mocks';
import { waitFor } from '@testing-library/react';

import { renderHookWithMocks } from '../../__helpers__/testing-library';
import { ProfileFragment } from '../useProfilesToFollow';
import { useSearchProfiles } from '../useSearchProfiles';

describe(`Given the ${useSearchProfiles.name} hook`, () => {
  const observer = mockProfileFragment();
  const query = 'query_test';

  const mockProfiles: ProfileFragment[] = [mockProfileFragment()];

  describe('when the query returns data successfully', () => {
    it('should return profiles that match the search result', async () => {
      const { result } = renderHookWithMocks(
        () =>
          useSearchProfiles({
            query,
            observerId: observer.id,
          }),
        {
          mocks: {
            apolloClient: createMockApolloClientWithMultipleResponses([
              createSearchProfilesQueryMockedResponse({
                variables: {
                  observerId: observer.id,
                  limit: 10,
                  query,
                },
                items: mockProfiles,
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
