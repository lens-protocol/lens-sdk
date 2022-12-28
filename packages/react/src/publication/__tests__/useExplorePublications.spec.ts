import {
  CustomFiltersTypes,
  PublicationSortCriteria,
  PublicationTypes,
} from '@lens-protocol/api-bindings';
import {
  createMockApolloClientWithMultipleResponses,
  mockPost,
  createExplorePublicationsQueryMockedResponse,
} from '@lens-protocol/api-bindings/mocks';
import { waitFor } from '@testing-library/react';

import { renderHookWithMocks } from '../../__helpers__/testing-library';
import { DEFAULT_PAGINATED_QUERY_LIMIT } from '../../utils';
import { Publication } from '../types';
import { useExplorePublications } from '../useExplorePublications';

describe(`Given the ${useExplorePublications.name} hook`, () => {
  const mockPublications: Publication[] = [mockPost()];

  describe('when the query returns data successfully', () => {
    it('should return publications that match the explore with default parameters', async () => {
      const { result } = renderHookWithMocks(() => useExplorePublications(), {
        mocks: {
          apolloClient: createMockApolloClientWithMultipleResponses([
            createExplorePublicationsQueryMockedResponse({
              variables: {
                request: {
                  limit: DEFAULT_PAGINATED_QUERY_LIMIT,
                  sortCriteria: PublicationSortCriteria.Latest,
                },
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
        customFilters: [CustomFiltersTypes.Gardeners],
        sortCriteria: PublicationSortCriteria.TopCollected,
        limit: 20,
        publicationTypes: [PublicationTypes.Comment, PublicationTypes.Post],
      };
      const { result } = renderHookWithMocks(() => useExplorePublications(customParams), {
        mocks: {
          apolloClient: createMockApolloClientWithMultipleResponses([
            createExplorePublicationsQueryMockedResponse({
              variables: {
                request: customParams,
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
