import { FeedEventItemType as LensFeedEventItemType, FeedItem } from '@lens-protocol/api-bindings';
import {
  mockLensApolloClient,
  mockFeedItemFragment,
  createFeedMockedResponse,
  mockSources,
  simulateAuthenticatedProfile,
  simulateAuthenticatedWallet,
} from '@lens-protocol/api-bindings/mocks';
import { ProfileId } from '@lens-protocol/domain/entities';
import { mockProfileId, mockProfileIdentifier } from '@lens-protocol/domain/mocks';
import { waitFor } from '@testing-library/react';

import { renderHookWithMocks } from '../../__helpers__/testing-library';
import { FeedEventItemType } from '../FeedEventItemType';
import { useFeed } from '../useFeed';

function setupTestScenario({
  profileId,
  observerId,
  expectedObserverId,
  items,
}: {
  profileId: ProfileId;
  observerId?: ProfileId;
  expectedObserverId: ProfileId | null;
  items: FeedItem[];
}) {
  const sources = mockSources();

  return renderHookWithMocks(
    () =>
      useFeed({
        profileId,
        observerId,
        restrictEventTypesTo: [FeedEventItemType.Post],
      }),
    {
      mocks: {
        sources,

        apolloClient: mockLensApolloClient([
          createFeedMockedResponse({
            variables: {
              profileId,
              observerId: expectedObserverId,
              restrictEventTypesTo: [LensFeedEventItemType.Post],
              limit: 50,
              sources,
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
  const items = [mockFeedItemFragment(), mockFeedItemFragment()];
  const expectations = items.map(({ __typename }) => ({ __typename }));

  describe('when the query returns data successfully', () => {
    beforeAll(() => {
      simulateAuthenticatedWallet();
    });

    it('should return the feed', async () => {
      const { result } = setupTestScenario({ profileId, items, expectedObserverId: null });

      await waitFor(() => expect(result.current.loading).toBeFalsy());

      expect(result.current.data).toMatchObject(expectations);
    });
  });

  describe('when there is an Active Profile defined', () => {
    const activeProfile = mockProfileIdentifier();

    beforeAll(() => {
      simulateAuthenticatedProfile(activeProfile);
    });

    it('should use the Active Profile Id as the "observerId"', async () => {
      const { result } = setupTestScenario({
        profileId,
        items,
        expectedObserverId: activeProfile.id,
      });

      await waitFor(() => expect(result.current.loading).toBeFalsy());
      expect(result.current.data).toMatchObject(expectations);
    });

    it('should always allow to specify the "observerId" on a per-call basis', async () => {
      const observerId = mockProfileId();

      const { result } = setupTestScenario({
        profileId,
        items,
        observerId,
        expectedObserverId: observerId,
      });

      await waitFor(() => expect(result.current.loading).toBeFalsy());
      expect(result.current.data).toMatchObject(expectations);
    });
  });
});
