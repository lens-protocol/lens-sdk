import { FeedEventItemType as LensFeedEventItemType } from '@lens-protocol/api-bindings';
import {
  createMockApolloClientWithMultipleResponses,
  mockFeedItemFragment,
  createFeedQueryMockedResponse,
} from '@lens-protocol/api-bindings/mocks';
import { waitFor } from '@testing-library/react';

import { renderHookWithMocks } from '../../__helpers__/testing-library';
import { FeedEventItemType } from '../FeedEventItemType';
import { useFeed } from '../useFeed';

describe(`Given the ${useFeed.name} hook`, () => {
  const profileId = '0x2001';
  const mockFeed = [mockFeedItemFragment(), mockFeedItemFragment()];

  describe('when the query returns data successfully', () => {
    it('should return the feed', async () => {
      const { result } = renderHookWithMocks(
        () =>
          useFeed({
            profileId,
            restrictEventTypesTo: [FeedEventItemType.Post],
          }),
        {
          mocks: {
            apolloClient: createMockApolloClientWithMultipleResponses([
              createFeedQueryMockedResponse({
                variables: {
                  profileId,
                  restrictEventTypesTo: [LensFeedEventItemType.Post],
                  limit: 10,
                },
                items: mockFeed,
              }),
            ]),
          },
        },
      );

      await waitFor(() => expect(result.current.loading).toBeFalsy());

      expect(result.current.data).toEqual(mockFeed);
    });
  });
});
