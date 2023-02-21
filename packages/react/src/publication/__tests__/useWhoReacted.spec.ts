import {
  createMockApolloClientWithMultipleResponses,
  createWhoReactedPublicationQueryMockedResponse,
  mockSources,
  mockWhoReactedResultFragment,
} from '@lens-protocol/api-bindings/mocks';
import { waitFor } from '@testing-library/react';

import { renderHookWithMocks } from '../../__helpers__/testing-library';
import { useWhoReacted } from '../useWhoReacted';

const sources = mockSources();

describe(`Given the ${useWhoReacted.name} hook`, () => {
  const mockWhoReacted = [mockWhoReactedResultFragment()];
  const publicationId = 'pub-id';

  describe('when the query returns data successfully', () => {
    it('should return who reacted results', async () => {
      const { result } = renderHookWithMocks(
        () =>
          useWhoReacted({
            publicationId,
          }),
        {
          mocks: {
            sources,
            apolloClient: createMockApolloClientWithMultipleResponses([
              createWhoReactedPublicationQueryMockedResponse({
                variables: {
                  publicationId,
                  limit: 10,
                  sources,
                },
                items: mockWhoReacted,
              }),
            ]),
          },
        },
      );

      await waitFor(() => expect(result.current.loading).toBeFalsy());

      expect(result.current.data).toEqual(mockWhoReacted);
    });
  });
});
