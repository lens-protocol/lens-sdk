import { FeedItem, FeedWhere } from '@lens-protocol/api-bindings';
import {
  mockFeedItemFragment,
  mockFeedResponse,
  mockLensApolloClient,
} from '@lens-protocol/api-bindings/mocks';
import { mockProfileId } from '@lens-protocol/domain/mocks';
import { waitFor } from '@testing-library/react';

import { renderHookWithMocks } from '../../__helpers__/testing-library';
import {
  defaultMediaTransformsConfig,
  mediaTransformConfigToQueryVariables,
} from '../../mediaTransforms';
import { useFeed } from '../useFeed';

function setupTestScenario({ items, where }: { where: FeedWhere; items: FeedItem[] }) {
  return renderHookWithMocks(
    () =>
      useFeed({
        where,
      }),
    {
      mocks: {
        mediaTransforms: defaultMediaTransformsConfig,
        apolloClient: mockLensApolloClient([
          mockFeedResponse({
            variables: {
              request: {
                where,
              },
              ...mediaTransformConfigToQueryVariables(defaultMediaTransformsConfig),
            },
            items,
          }),
        ]),
      },
    },
  );
}

describe(`Given the ${useFeed.name} hook`, () => {
  const profileId = mockProfileId();
  const items = [mockFeedItemFragment(), mockFeedItemFragment(), mockFeedItemFragment()];
  const expectations = items.map(({ id }) => ({ id }));

  describe('when the query returns data successfully', () => {
    it('should return the feed', async () => {
      const { result } = setupTestScenario({
        where: { for: profileId },
        items,
      });

      await waitFor(() => expect(result.current.loading).toBeFalsy());

      // TODO: reintroduce assertion to check for object match
      expect(result.current.data?.length).toEqual(expectations.length);
    });
  });
});
