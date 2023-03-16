import {
  FeedEventItemType as LensFeedEventItemType,
  FeedItemFragment,
} from '@lens-protocol/api-bindings';
import {
  createMockApolloClientWithMultipleResponses,
  mockFeedItemFragment,
  createFeedQueryMockedResponse,
  mockSources,
} from '@lens-protocol/api-bindings/mocks';
import { ProfileId } from '@lens-protocol/domain/entities';
import { mockProfile, mockProfileId } from '@lens-protocol/domain/mocks';
import { waitFor } from '@testing-library/react';

import { renderHookWithMocks } from '../../__helpers__/testing-library';
import { simulateAppReady } from '../../lifecycle/adapters/__helpers__/simulate';
import { activeProfileIdentifierVar } from '../../profile/adapters/ActiveProfilePresenter';
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
  items: FeedItemFragment[];
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

        apolloClient: createMockApolloClientWithMultipleResponses([
          createFeedQueryMockedResponse({
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

  beforeAll(() => {
    simulateAppReady();
  });

  describe('when the query returns data successfully', () => {
    it('should return the feed', async () => {
      const { result } = setupTestScenario({ profileId, items, expectedObserverId: null });

      await waitFor(() => expect(result.current.loading).toBeFalsy());
      expect(result.current.data).toEqual(items);
    });
  });

  describe('when there is an Active Profile defined', () => {
    const activeProfile = mockProfile();

    it('should use the Active Profile Id as the "observerId"', async () => {
      activeProfileIdentifierVar(activeProfile);

      const { result } = setupTestScenario({
        profileId,
        items,
        expectedObserverId: activeProfile.id,
      });

      await waitFor(() => expect(result.current.loading).toBeFalsy());
      expect(result.current.data).toEqual(items);
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
      expect(result.current.data).toEqual(items);
    });
  });
});
