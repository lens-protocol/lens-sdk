import { ProfileFragment, ProfileSortCriteria } from '@lens-protocol/api-bindings';
import {
  createExploreProfilesQueryMockedResponse,
  createMockApolloClientWithMultipleResponses,
  mockProfileFragment,
  mockSources,
} from '@lens-protocol/api-bindings/mocks';
import { ProfileId } from '@lens-protocol/domain/entities';
import { mockProfile, mockProfileId } from '@lens-protocol/domain/mocks';
import { waitFor } from '@testing-library/react';

import { renderHookWithMocks } from '../../__helpers__/testing-library';
import { simulateAppReady } from '../../lifecycle/adapters/__helpers__/simulate';
import { DEFAULT_PAGINATED_QUERY_LIMIT } from '../../utils';
import { activeProfileIdentifierVar } from '../adapters/ActiveProfilePresenter';
import { useExploreProfiles, UseExploreProfilesArgs } from '../useExploreProfiles';

function setupTestScenario({
  expectedObserverId,
  result,
  ...args
}: UseExploreProfilesArgs & { result: ProfileFragment[]; expectedObserverId?: ProfileId }) {
  const sources = mockSources();

  return renderHookWithMocks(
    () => useExploreProfiles({ sortCriteria: ProfileSortCriteria.CreatedOn, ...args }),
    {
      mocks: {
        sources,
        apolloClient: createMockApolloClientWithMultipleResponses([
          createExploreProfilesQueryMockedResponse({
            variables: {
              limit: DEFAULT_PAGINATED_QUERY_LIMIT,
              sortCriteria: ProfileSortCriteria.CreatedOn,
              ...args,
              sources,
              observerId: expectedObserverId ?? null,
            },
            items: result,
          }),
        ]),
      },
    },
  );
}

describe(`Given the ${useExploreProfiles.name} hook`, () => {
  const profiles = [mockProfileFragment()];

  beforeAll(() => {
    simulateAppReady();
  });

  describe('when the query returns data successfully', () => {
    it('should return list of profiles', async () => {
      const { result } = setupTestScenario({ result: profiles });

      await waitFor(() => expect(result.current.loading).toBeFalsy());

      expect(result.current.data).toEqual(profiles);
    });
  });

  describe('when there is an Active Profile defined', () => {
    const activeProfile = mockProfile();

    beforeAll(() => {
      activeProfileIdentifierVar(activeProfile);
    });

    it('should use the Active Profile Id as the "observerId"', async () => {
      const { result } = setupTestScenario({
        result: profiles,
        expectedObserverId: activeProfile.id,
      });

      await waitFor(() => expect(result.current.loading).toBeFalsy());
      expect(result.current.data).toEqual(profiles);
    });

    it('should always allow to specify the "observerId" on a per-call basis', async () => {
      const observerId = mockProfileId();

      const { result } = setupTestScenario({
        observerId,
        result: profiles,
        expectedObserverId: observerId,
      });

      await waitFor(() => expect(result.current.loading).toBeFalsy());
      expect(result.current.data).toEqual(profiles);
    });
  });
});
