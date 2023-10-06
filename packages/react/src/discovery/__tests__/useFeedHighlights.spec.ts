import { FeedHighlight, FeedHighlightWhere } from '@lens-protocol/api-bindings';
import {
  mockFeedHighlightsResponse,
  mockLensApolloClient,
  mockPostFragment,
} from '@lens-protocol/api-bindings/mocks';
import { mockProfileId } from '@lens-protocol/domain/mocks';
import { waitFor } from '@testing-library/react';

import { renderHookWithMocks } from '../../__helpers__/testing-library';
import {
  defaultMediaTransformsConfig,
  mediaTransformConfigToQueryVariables,
} from '../../mediaTransforms';
import { DEFAULT_PAGINATED_QUERY_LIMIT } from '../../utils';
import { useFeedHighlights } from '../useFeedHighlights';

function setupTestScenario({
  items,
  where,
}: {
  where: FeedHighlightWhere;
  items: FeedHighlight[];
}) {
  return renderHookWithMocks(
    () =>
      useFeedHighlights({
        where,
      }),
    {
      mocks: {
        mediaTransforms: defaultMediaTransformsConfig,
        apolloClient: mockLensApolloClient([
          mockFeedHighlightsResponse({
            variables: {
              where,
              limit: DEFAULT_PAGINATED_QUERY_LIMIT,
              ...mediaTransformConfigToQueryVariables(defaultMediaTransformsConfig),
            },
            items,
          }),
        ]),
      },
    },
  );
}

describe(`Given the ${useFeedHighlights.name} hook`, () => {
  const profileId = mockProfileId();
  const items = [mockPostFragment(), mockPostFragment(), mockPostFragment()];
  const expectations = items.map(({ id }) => ({ id }));

  describe('when the query returns data successfully', () => {
    it('should return the feed highlights', async () => {
      const { result } = setupTestScenario({
        where: { for: profileId },
        items,
      });

      await waitFor(() => expect(result.current.loading).toBeFalsy());

      expect(result.current.data).toMatchObject(expectations);
    });
  });
});
