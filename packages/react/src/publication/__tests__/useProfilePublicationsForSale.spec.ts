import { PostFragment } from '@lens-protocol/api-bindings';
import {
  createMockApolloClientWithMultipleResponses,
  mockPostFragment,
  mockProfileFragment,
  createProfilePublicationsForSaleQueryMockedResponse,
  mockSources,
} from '@lens-protocol/api-bindings/mocks';
import { waitFor } from '@testing-library/react';

import { renderHookWithMocks } from '../../__helpers__/testing-library';
import { useProfilePublicationsForSale } from '../useProfilePublicationsForSale';

const sources = mockSources();

describe(`Given the ${useProfilePublicationsForSale.name} hook`, () => {
  const profile = mockProfileFragment();
  const observer = mockProfileFragment();
  const mockPublication: PostFragment = mockPostFragment();

  describe('when the query returns data successfully', () => {
    it('should return publications', async () => {
      const { result } = renderHookWithMocks(
        () =>
          useProfilePublicationsForSale({
            profileId: profile.id,
            observerId: observer.id,
          }),
        {
          mocks: {
            sources,
            apolloClient: createMockApolloClientWithMultipleResponses([
              createProfilePublicationsForSaleQueryMockedResponse({
                variables: {
                  profileId: profile.id,
                  observerId: observer.id,
                  limit: 10,
                  sources,
                },
                items: [mockPublication],
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
