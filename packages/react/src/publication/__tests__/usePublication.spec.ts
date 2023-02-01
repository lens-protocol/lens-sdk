import { PostFragment } from '@lens-protocol/api-bindings';
import {
  createMockApolloClientWithMultipleResponses,
  mockPostFragment,
  createPublicationQueryMockedResponse,
} from '@lens-protocol/api-bindings/mocks';
import { waitFor } from '@testing-library/react';

import { NotFoundError } from '../../NotFoundError';
import { renderHookWithMocks } from '../../__helpers__/testing-library';
import { usePublication } from '../usePublication';

describe(`Given the ${usePublication.name} hook`, () => {
  const mockPublication: PostFragment = mockPostFragment();

  describe('when the query returns data successfully', () => {
    it('should settle with the publication data', async () => {
      const { result } = renderHookWithMocks(
        () =>
          usePublication({
            publicationId: mockPublication.id,
          }),
        {
          mocks: {
            apolloClient: createMockApolloClientWithMultipleResponses([
              createPublicationQueryMockedResponse({
                publicationId: mockPublication.id,
                result: mockPublication,
              }),
            ]),
          },
        },
      );

      await waitFor(() => expect(result.current.loading).toBeFalsy());

      expect(result.current.data).toEqual(mockPublication);
    });
  });

  describe('when the query returns null', () => {
    it(`should settle with a ${NotFoundError.name} state`, async () => {
      const { result } = renderHookWithMocks(
        () =>
          usePublication({
            publicationId: mockPublication.id,
          }),
        {
          mocks: {
            apolloClient: createMockApolloClientWithMultipleResponses([
              createPublicationQueryMockedResponse({
                publicationId: mockPublication.id,
                result: null,
              }),
            ]),
          },
        },
      );

      await waitFor(() => expect(result.current.loading).toBeFalsy());

      expect(result.current.error).toBeInstanceOf(NotFoundError);
    });
  });
});
