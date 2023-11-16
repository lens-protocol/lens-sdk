import { mockFeedHighlightsResponse, mockPostFragment } from '@lens-protocol/api-bindings/mocks';
import { mockProfileId } from '@lens-protocol/domain/mocks';
import { waitFor } from '@testing-library/react';

import { setupHookTestScenarioWithSession } from '../../__helpers__/setupHookTestScenarioWithSession';
import { UseFeedHighlightsArgs, useFeedHighlights } from '../useFeedHighlights';

describe(`Given the ${useFeedHighlights.name} hook`, () => {
  const profileId = mockProfileId();
  const items = [mockPostFragment(), mockPostFragment(), mockPostFragment()];
  const expectations = items.map(({ id }) => ({ id }));

  describe('when the query returns data successfully', () => {
    it('should return the feed highlights', async () => {
      const args: UseFeedHighlightsArgs = {
        where: { for: profileId },
      };

      const { renderHook } = await setupHookTestScenarioWithSession([
        mockFeedHighlightsResponse({
          variables: args,
          items,
        }),
      ]);

      const { result } = renderHook(() => useFeedHighlights(args));

      await waitFor(() => expect(result.current.loading).toBeFalsy());

      expect(result.current.data).toMatchObject(expectations);
    });
  });
});
