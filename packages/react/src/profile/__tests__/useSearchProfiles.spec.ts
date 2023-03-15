import { ProfileFragment } from '@lens-protocol/api-bindings';
import {
  createMockApolloClientWithMultipleResponses,
  createSearchProfilesQueryMockedResponse,
  mockProfileFragment,
  mockSources,
} from '@lens-protocol/api-bindings/mocks';
import { ProfileId } from '@lens-protocol/domain/entities';
import { mockProfile, mockProfileId } from '@lens-protocol/domain/mocks';
import { waitFor } from '@testing-library/react';

import { renderHookWithMocks } from '../../__helpers__/testing-library';
import { simulateAppReady } from '../../lifecycle/adapters/__helpers__/simulate';
import { activeProfileIdentifierVar } from '../adapters/ActiveProfilePresenter';
import { useSearchProfiles, UseSearchProfilesArgs } from '../useSearchProfiles';

function setupTestScenario({
  expectedObserverId,
  result,
  ...args
}: UseSearchProfilesArgs & { result: ProfileFragment[]; expectedObserverId?: ProfileId }) {
  const sources = mockSources();

  return renderHookWithMocks(() => useSearchProfiles(args), {
    mocks: {
      sources,
      apolloClient: createMockApolloClientWithMultipleResponses([
        createSearchProfilesQueryMockedResponse({
          variables: {
            ...args,
            limit: 10,
            observerId: expectedObserverId ?? null,
            sources,
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

  beforeAll(() => {
    simulateAppReady();
  });

  describe('when the query returns data successfully', () => {
    it('should return profiles that match the search criteria', async () => {
      const { result } = setupTestScenario({ query, result: profiles });

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
        query,
        result: profiles,
        expectedObserverId: activeProfile.id,
      });

      await waitFor(() => expect(result.current.loading).toBeFalsy());
      expect(result.current.data).toEqual(profiles);
    });

    it('should always allow to specify the "observerId" on a per-call basis', async () => {
      const observerId = mockProfileId();

      const { result } = setupTestScenario({
        query,
        observerId,
        result: profiles,
        expectedObserverId: observerId,
      });

      await waitFor(() => expect(result.current.loading).toBeFalsy());
      expect(result.current.data).toEqual(profiles);
    });
  });
});
