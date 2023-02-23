import { PublicationSortCriteria, PublicationTypes } from '@lens-protocol/api-bindings';
import {
  createMockApolloClientWithMultipleResponses,
  mockPostFragment,
  createExplorePublicationsQueryMockedResponse,
  mockSources,
} from '@lens-protocol/api-bindings/mocks';
import { waitFor } from '@testing-library/react';

import { renderHookWithMocks } from '../../__helpers__/testing-library';
import { DEFAULT_PAGINATED_QUERY_LIMIT } from '../../utils';
import { useExplorePublications } from '../useExplorePublications';

const sources = mockSources();

describe(`Given the ${useExplorePublications.name} hook`, () => {
  const mockPublications = [mockPostFragment()];

  describe('when the query returns data successfully', () => {
    it('should return publications that match the explore with default parameters', async () => {
      const { result } = renderHookWithMocks(() => useExplorePublications(), {
        mocks: {
          sources,
          apolloClient: createMockApolloClientWithMultipleResponses([
            createExplorePublicationsQueryMockedResponse({
              variables: {
                limit: DEFAULT_PAGINATED_QUERY_LIMIT,
                sortCriteria: PublicationSortCriteria.Latest,
                sources,
              },
              items: mockPublications,
            }),
          ]),
        },
      });
      await waitFor(() => expect(result.current.loading).toBeFalsy());

      expect(result.current.data).toEqual(mockPublications);
    });

    it('should return publications that match the explore with custom parameters', async () => {
      const customParams = {
        sortCriteria: PublicationSortCriteria.TopCollected,
        limit: 20,
        publicationTypes: [PublicationTypes.Comment, PublicationTypes.Post],
      };
      const { result } = renderHookWithMocks(() => useExplorePublications(customParams), {
        mocks: {
          sources,
          apolloClient: createMockApolloClientWithMultipleResponses([
            createExplorePublicationsQueryMockedResponse({
              variables: {
                ...customParams,
                sources,
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
