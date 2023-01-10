import {
  createMockApolloClientWithMultipleResponses,
  createProfileFollowRevenueQueryMockedResponse,
  mockErc20AmountFragment,
} from '@lens-protocol/api-bindings/mocks';
import { waitFor } from '@testing-library/react';

import { renderHookWithMocks } from '../../__helpers__/testing-library';
import { useProfileFollowRevenue } from '../useProfileFollowRevenue';

describe(`Given the ${useProfileFollowRevenue.name} hook`, () => {
  describe('when the query returns data successfully', () => {
    const profileId = '0x2001';
    const mockRevenues = [{ total: mockErc20AmountFragment() }];

    it('should return profiles to follow', async () => {
      const { result } = renderHookWithMocks(() => useProfileFollowRevenue({ profileId }), {
        mocks: {
          apolloClient: createMockApolloClientWithMultipleResponses([
            createProfileFollowRevenueQueryMockedResponse({
              variables: { profileId },
              revenues: mockRevenues,
            }),
          ]),
        },
      });

      await waitFor(() => expect(result.current.loading).toBeFalsy());
      expect(result.current.data).toEqual({
        __typename: 'FollowRevenueResult',
        revenues: mockRevenues,
      });
    });
  });
});
