import {
  createMockApolloClientWithMultipleResponses,
  createSearchProfilesQueryMockedResponse,
  mockProfileFieldsFragment,
} from '@lens-protocol/api-bindings/mocks';
import { waitFor } from '@testing-library/react';

import { renderHookWithMocks } from '../../__helpers__/testing-library';
import { ProfileFieldsFragment } from '../useProfilesToFollow';
import { useSearchProfiles } from '../useSearchProfiles';

describe(`Given the ${useSearchProfiles.name} hook`, () => {
  const observer = mockProfileFieldsFragment();
  const query = 'query_test';

  const mockProfiles: ProfileFieldsFragment[] = [mockProfileFieldsFragment()];

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
