import { mockFeedItemFragment, mockFeedResponse } from '@lens-protocol/api-bindings/mocks';
import { mockProfileId } from '@lens-protocol/domain/mocks';
import { waitFor } from '@testing-library/react';

import { setupHookTestScenarioWithSession } from '../../__helpers__/setupHookTestScenarioWithSession';
import { UseFeedArgs, useFeed } from '../useFeed';

describe(`Given the ${useFeed.name} hook`, () => {
  const profileId = mockProfileId();
  const items = [mockFeedItemFragment(), mockFeedItemFragment(), mockFeedItemFragment()];
  const expectations = items.map(({ id }) => ({ id }));

  describe('when the query returns data successfully', () => {
    const args: UseFeedArgs = {
      where: { for: profileId },
    };

    it('should return the feed', async () => {
      const { renderHook } = await setupHookTestScenarioWithSession([
        mockFeedResponse({
          variables: args,
          items,
        }),
      ]);

      const { result } = renderHook(() => useFeed(args));

      await waitFor(() => expect(result.current.loading).toBeFalsy());

      // TODO: reintroduce assertion to check for object match
      expect(result.current.data?.length).toEqual(expectations.length);
    });
  });
});
