import {
  mockFollowRevenuesResponse,
  mockRevenueAggregateFragment,
} from '@lens-protocol/api-bindings/mocks';
import { mockProfileId } from '@lens-protocol/domain/mocks';
import { waitFor } from '@testing-library/react';

import { setupHookTestScenario } from '../../__helpers__/setupHookTestScenario';
import { UseRevenueFromFollowArgs, useRevenueFromFollow } from '../useRevenueFromFollow';

describe(`Given the ${useRevenueFromFollow.name} hook`, () => {
  describe('when the query returns data successfully', () => {
    const profileId = mockProfileId();
    const revenue = [mockRevenueAggregateFragment()];

    const expectations = revenue.map(({ __typename, total }) => ({
      __typename,
      total,
    }));

    it('should settle with the revenue data', async () => {
      const args: UseRevenueFromFollowArgs = {
        for: profileId,
      };

      const { renderHook } = setupHookTestScenario([
        mockFollowRevenuesResponse({
          variables: {
            request: args,
          },
          result: revenue,
        }),
      ]);

      const { result } = renderHook(() => useRevenueFromFollow(args));

      await waitFor(() => expect(result.current.loading).toBeFalsy());
      expect(result.current.data).toMatchObject(expectations);
    });
  });
});
