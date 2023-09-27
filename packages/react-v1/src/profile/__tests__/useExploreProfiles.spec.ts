import { Profile, ProfileSortCriteria } from '@lens-protocol/api-bindings';
import {
  mockExploreProfilesResponse,
  mockLensApolloClient,
  mockProfileFragment,
  mockSources,
  simulateAuthenticatedProfile,
  simulateAuthenticatedWallet,
} from '@lens-protocol/api-bindings/mocks';
import { ProfileId } from '@lens-protocol/domain/entities';
import { mockProfile, mockProfileId } from '@lens-protocol/domain/mocks';
import { waitFor } from '@testing-library/react';

import { renderHookWithMocks } from '../../__helpers__/testing-library';
import {
  defaultMediaTransformsConfig,
  mediaTransformConfigToQueryVariables,
} from '../../mediaTransforms';
import { DEFAULT_PAGINATED_QUERY_LIMIT } from '../../utils';
import { useExploreProfiles, UseExploreProfilesArgs } from '../useExploreProfiles';

function setupTestScenario({
  expectedObserverId,
  result,
  ...args
}: UseExploreProfilesArgs & { result: Profile[]; expectedObserverId?: ProfileId }) {
  const sources = mockSources();

  return renderHookWithMocks(
    () => useExploreProfiles({ sortCriteria: ProfileSortCriteria.CreatedOn, ...args }),
    {
      mocks: {
        sources,
        mediaTransforms: defaultMediaTransformsConfig,

        apolloClient: mockLensApolloClient([
          mockExploreProfilesResponse({
            variables: {
              limit: DEFAULT_PAGINATED_QUERY_LIMIT,
              sortCriteria: ProfileSortCriteria.CreatedOn,
              ...args,
              sources,
              observerId: expectedObserverId ?? null,
              ...mediaTransformConfigToQueryVariables(defaultMediaTransformsConfig),
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
  const expectations = profiles.map(({ __typename, id }) => ({ __typename, id }));

  describe('when the query returns data successfully', () => {
    beforeAll(() => {
      simulateAuthenticatedWallet();
    });

    it('should return list of profiles', async () => {
      const { result } = setupTestScenario({ result: profiles });

      await waitFor(() => expect(result.current.loading).toBeFalsy());

      expect(result.current.data).toMatchObject(expectations);
    });
  });

  describe('when there is an Active Profile defined', () => {
    const activeProfile = mockProfile();

    beforeAll(() => {
      simulateAuthenticatedProfile(activeProfile);
    });

    it('should use the Active Profile Id as the "observerId"', async () => {
      const { result } = setupTestScenario({
        result: profiles,
        expectedObserverId: activeProfile.id,
      });

      await waitFor(() => expect(result.current.loading).toBeFalsy());
      expect(result.current.data).toMatchObject(expectations);
    });

    it('should allow to override the "observerId" on a per-call basis', async () => {
      const observerId = mockProfileId();

      const { result } = setupTestScenario({
        observerId,
        result: profiles,
        expectedObserverId: observerId,
      });

      await waitFor(() => expect(result.current.loading).toBeFalsy());
      expect(result.current.data).toMatchObject(expectations);
    });
  });
});
