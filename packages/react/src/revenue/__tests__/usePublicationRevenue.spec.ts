import {
  createMockApolloClientWithMultipleResponses,
  createPublicationRevenueQueryMockedResponse,
  mockRevenueFragment,
} from '@lens-protocol/api-bindings/mocks';
import { waitFor } from '@testing-library/react';

import { renderHookWithMocks } from '../../__helpers__/testing-library';
import { usePublicationRevenue } from '../usePublicationRevenue';

describe(`Given the ${usePublicationRevenue.name} hook`, () => {
  const mockRevenue = mockRevenueFragment();
  const publicationId = '0x00_0x00';

  describe('when supplied with a publication id', () => {
    describe('and the query returns data successfully', () => {
      it('should return a post publication and revenue', async () => {
        const { result } = renderHookWithMocks(
          () =>
            usePublicationRevenue({
              publicationId,
            }),
          {
            mocks: {
              apolloClient: createMockApolloClientWithMultipleResponses([
                createPublicationRevenueQueryMockedResponse({
                  variables: { request: { publicationId: publicationId } },
                  revenue: mockRevenue,
                }),
              ]),
            },
          },
        );

        await waitFor(() => expect(result.current.loading).toBeFalsy());

        expect(result.current.data).toEqual(mockRevenue.revenue);
      });
    });
  });
});
