import { Profile } from '@lens-protocol/api-bindings';
import {
  mockLensApolloClient,
  mockSearchProfilesResponse,
  mockProfileFragment,
  mockSources,
  simulateAuthenticatedProfile,
  simulateNotAuthenticated,
} from '@lens-protocol/api-bindings/mocks';
import { ProfileId } from '@lens-protocol/domain/entities';
import { mockProfile, mockProfileId } from '@lens-protocol/domain/mocks';
import { waitFor } from '@testing-library/react';

import { renderHookWithMocks } from '../../__helpers__/testing-library';
import {
  defaultMediaTransformsConfig,
  mediaTransformConfigToQueryVariables,
} from '../../mediaTransforms';
import { useSearchProfiles, UseSearchProfilesArgs } from '../useSearchProfiles';

function setupTestScenario({
  expectedObserverId,
  result,
  ...args
}: UseSearchProfilesArgs & { result: Profile[]; expectedObserverId?: ProfileId }) {
  const sources = mockSources();

  return renderHookWithMocks(() => useSearchProfiles(args), {
    mocks: {
      sources,
      mediaTransforms: defaultMediaTransformsConfig,
      apolloClient: mockLensApolloClient([
        mockSearchProfilesResponse({
          variables: {
            ...args,
            limit: 10,
            observerId: expectedObserverId ?? null,
            sources,
            ...mediaTransformConfigToQueryVariables(defaultMediaTransformsConfig),
          },
          items: result,
        }),
      ]),
    },
  });
}

describe(`Given the ${useSearchProfiles.name} hook`, () => {
  const query = 'query_test';
  const profiles = [mockProfileFragment()];
  const expectations = profiles.map(({ id }) => ({ __typename: 'Profile', id }));

  beforeAll(() => {
    simulateNotAuthenticated();
  });

  describe('when the query returns data successfully', () => {
    it('should return profiles that match the search criteria', async () => {
      const { result } = setupTestScenario({ query, result: profiles });

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
        query,
        result: profiles,
        expectedObserverId: activeProfile.id,
      });

      await waitFor(() => expect(result.current.loading).toBeFalsy());
      expect(result.current.data).toMatchObject(expectations);
    });

    it('should allow to override the "observerId" on a per-call basis', async () => {
      const observerId = mockProfileId();

      const { result } = setupTestScenario({
        query,
        observerId,
        result: profiles,
        expectedObserverId: observerId,
      });

      await waitFor(() => expect(result.current.loading).toBeFalsy());
      expect(result.current.data).toMatchObject(expectations);
    });
  });
});
