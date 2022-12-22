import { PostFragment } from '@lens-protocol/api';
import {
  createMockApolloClientWithMultipleResponses,
  mockPost,
  mockPublicationsQuery,
} from '@lens-protocol/api/mocks';
import { waitFor } from '@testing-library/react';

import { renderHookWithMocks } from '../../__helpers__/testing-library';
import { usePublications } from '../usePublications';

describe(`Given the ${usePublications.name} hook`, () => {
  const mockPublication: PostFragment = mockPost();

  describe('when the query returns data successfully', () => {
    it('should return publications', async () => {
      const { result } = renderHookWithMocks(
        () =>
          usePublications({
            profileId: mockPublication.profile.id,
          }),
        {
          mocks: {
            apolloClient: createMockApolloClientWithMultipleResponses([
              mockPublicationsQuery({
                variables: {
                  profileId: mockPublication.profile.id,
                  limit: 10,
                },
                publications: [mockPublication],
              }),
            ]),
          },
        },
      );

      await waitFor(() => expect(result.current.loading).toBeFalsy());

      expect(result.current.data).toEqual([mockPublication]);
    });
  });
});
