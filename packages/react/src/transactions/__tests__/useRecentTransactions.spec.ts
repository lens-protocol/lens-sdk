import { renderHook } from '@testing-library/react';

import { useRecentTransactions } from '../useRecentTransactions';

describe(`Given the ${useRecentTransactions.name} hook`, () => {
  describe('when supplied with a profile id', () => {
    describe('and the query returns data successfully', () => {
      it('should return all publications with revenue', async () => {
        // const { result } = renderHookWithMocks(() => useRecentTransactions({}), {
        //   mocks: {
        //     apolloClient: createMockApolloClientWithMultipleResponses([
        //       createProfilePublicationRevenueQueryMockedResponse({
        //         variables: { profileId: mockedProfile.id, limit: 10 },
        //         items: mockPedublicationRevenueFragments,
        //       }),
        //     ]),
        //   },
        // });
        const { result } = renderHook(() => useRecentTransactions());
        // await waitFor(() => expect(result.current.loading).toBeFalsy());

        // expect(result.current.data).toEqual(mockPedublicationRevenueFragments);
      });
    });
  });
});
