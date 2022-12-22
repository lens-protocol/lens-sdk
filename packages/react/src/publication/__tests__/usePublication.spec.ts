import { PostFragment } from '@lens-protocol/api-bindings';
import {
  createMockApolloClientWithMultipleResponses,
  mockPost,
  mockPublicationQueryMockedResponse,
} from '@lens-protocol/api-bindings/mocks';
import { waitFor } from '@testing-library/react';

import { renderHookWithMocks } from '../../__helpers__/testing-library';
import { usePublication } from '../usePublication';

describe(`Given the ${usePublication.name} hook`, () => {
  const mockPublication: PostFragment = mockPost();

  describe('when supplied with a publication id', () => {
    describe('and the query returns data successfully', () => {
      it('should return a post publication', async () => {
        const { result } = renderHookWithMocks(
          () =>
            usePublication({
              publicationId: mockPublication.id,
            }),
          {
            mocks: {
              apolloClient: createMockApolloClientWithMultipleResponses([
                mockPublicationQueryMockedResponse(mockPublication),
              ]),
            },
          },
        );

        await waitFor(() => expect(result.current.loading).toBeFalsy());

        expect(result.current.data).toEqual(mockPublication);
      });
    });
  });
});
