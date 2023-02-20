import { CommentFragment, PostFragment } from '@lens-protocol/api-bindings';
import {
  createMockApolloClientWithMultipleResponses,
  createSearchPublicationsQueryMockedResponse,
  mockCommentFragment,
  mockPostFragment,
  mockProfileFragment,
} from '@lens-protocol/api-bindings/mocks';
import { waitFor } from '@testing-library/react';

import { renderHookWithMocks } from '../../__helpers__/testing-library';
import { useSearchPublications } from '../useSearchPublications';

describe(`Given the ${useSearchPublications.name} hook`, () => {
  const observer = mockProfileFragment();
  const query = 'query_test';

  const mockPublications: (PostFragment | CommentFragment)[] = [
    mockPostFragment(),
    mockCommentFragment(),
  ];

  describe('when the query returns data successfully', () => {
    it('should return publications that match the search result', async () => {
      const { result } = renderHookWithMocks(
        () =>
          useSearchPublications({
            query,
            observerId: observer.id,
          }),
        {
          mocks: {
            apolloClient: createMockApolloClientWithMultipleResponses([
              createSearchPublicationsQueryMockedResponse({
                variables: {
                  observerId: observer.id,
                  limit: 10,
                  query,
                  sources: [],
                },
                items: mockPublications,
              }),
            ]),
          },
        },
      );

      await waitFor(() => expect(result.current.loading).toBeFalsy());

      expect(result.current.data).toEqual(mockPublications);
    });
  });
});
