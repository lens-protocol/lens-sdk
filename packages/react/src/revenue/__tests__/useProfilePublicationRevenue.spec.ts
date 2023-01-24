import {
  createMockApolloClientWithMultipleResponses,
  createProfilePublicationRevenueQueryMockedResponse,
  mockProfileFragment,
  mockPublicationRevenueFragment,
} from '@lens-protocol/api-bindings/mocks';
import { waitFor } from '@testing-library/react';

import { renderHookWithMocks } from '../../__helpers__/testing-library';
import { useProfilePublicationRevenue } from '../useProfilePublicationRevenue';

describe(`Given the ${useProfilePublicationRevenue.name} hook`, () => {
  const mockPedublicationRevenueFragments = [mockPublicationRevenueFragment()];
  const mockedProfile = mockProfileFragment();

  describe('when supplied with a profile id', () => {
    describe('and the query returns data successfully', () => {
      it('should return all publications with revenue', async () => {
        const { result } = renderHookWithMocks(
          () =>
            useProfilePublicationRevenue({
              profileId: mockedProfile.id,
            }),
          {
            mocks: {
              apolloClient: createMockApolloClientWithMultipleResponses([
                createProfilePublicationRevenueQueryMockedResponse({
                  variables: { profileId: mockedProfile.id, limit: 10 },
                  items: mockPedublicationRevenueFragments,
                }),
              ]),
            },
          },
        );

        await waitFor(() => expect(result.current.loading).toBeFalsy());

        expect(result.current.data).toEqual(mockPedublicationRevenueFragments);
      });
    });
  });
});
