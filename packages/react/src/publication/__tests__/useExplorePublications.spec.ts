import {
  createMockApolloClientWithMultipleResponses,
  mockPost,
  createExplorePublicationsQueryMockedResponse,
} from '@lens-protocol/api-bindings/mocks';
import { waitFor } from '@testing-library/react';

import { renderHookWithMocks } from '../../__helpers__/testing-library';
import { DEFAULT_PAGINATED_QUERY_LIMIT, DEFAULT_PUBLICATION_SORT_CRITERIA } from '../../utils';
import { Publication } from '../types';
import { useExplorePublications } from '../useExplorePublications';

describe(`Given the ${useExplorePublications.name} hook`, () => {
  const mockPublications: Publication[] = [mockPost()];

  describe('when the query returns data successfully', () => {
    it('it should return publications that match the explore default parameters', async () => {
      const { result } = renderHookWithMocks(() => useExplorePublications(), {
        mocks: {
          apolloClient: createMockApolloClientWithMultipleResponses([
            createExplorePublicationsQueryMockedResponse({
              variables: {
                limit: DEFAULT_PAGINATED_QUERY_LIMIT,
                sortCriteria: DEFAULT_PUBLICATION_SORT_CRITERIA,
              },
              items: mockPublications,
            }),
          ]),
        },
      });
      await waitFor(() => expect(result.current.loading).toBeFalsy());

      expect(result.current.data).toEqual(mockPublications);
    });
  });
});
