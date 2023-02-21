import { PostFragment } from '@lens-protocol/api-bindings';
import {
  createMockApolloClientWithMultipleResponses,
  mockPostFragment,
  createPublicationsQueryMockedResponse,
  mockSources,
} from '@lens-protocol/api-bindings/mocks';
import { waitFor } from '@testing-library/react';

import { renderHookWithMocks } from '../../__helpers__/testing-library';
import { usePublications } from '../usePublications';

const sources = mockSources();

describe(`Given the ${usePublications.name} hook`, () => {
  const mockPublication: PostFragment = mockPostFragment();

  describe('when the query returns data successfully', () => {
    it('should return publications', async () => {
      const { result } = renderHookWithMocks(
        () =>
          usePublications({
            profileId: mockPublication.profile.id,
          }),
        {
          mocks: {
            sources,
            apolloClient: createMockApolloClientWithMultipleResponses([
              createPublicationsQueryMockedResponse({
                variables: {
                  profileId: mockPublication.profile.id,
                  limit: 10,
                  sources,
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
