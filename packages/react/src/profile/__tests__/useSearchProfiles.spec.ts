import {
  createMockApolloClientWithMultipleResponses,
  createSearchProfilesQueryMockedResponse,
  mockProfileFragment,
  mockSources,
} from '@lens-protocol/api-bindings/mocks';
import { waitFor } from '@testing-library/react';

import { renderHookWithMocks } from '../../__helpers__/testing-library';
import { useSearchProfiles } from '../useSearchProfiles';

const sources = mockSources();

describe(`Given the ${useSearchProfiles.name} hook`, () => {
  const observer = mockProfileFragment();
  const query = 'query_test';

  const mockProfiles = [mockProfileFragment()];

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
            sources,
            apolloClient: createMockApolloClientWithMultipleResponses([
              createSearchProfilesQueryMockedResponse({
                variables: {
                  observerId: observer.id,
                  limit: 10,
                  query,
                  sources,
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
