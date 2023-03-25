import { Profile } from '@lens-protocol/api-bindings';
import {
  createMockApolloClientWithMultipleResponses,
  mockProfileFragment,
  createProfilesToFollowMockedResponse,
  mockSources,
} from '@lens-protocol/api-bindings/mocks';
import { ProfileId } from '@lens-protocol/domain/entities';
import { mockProfile, mockProfileId } from '@lens-protocol/domain/mocks';
import { waitFor } from '@testing-library/react';

import { renderHookWithMocks } from '../../__helpers__/testing-library';
import { simulateAppReady } from '../../lifecycle/adapters/__helpers__/simulate';
import { activeProfileIdentifierVar } from '../adapters/ActiveProfilePresenter';
import { useProfilesToFollow, UseProfilesToFollowArgs } from '../useProfilesToFollow';

function setupTestScenario({
  expectedObserverId,
  profiles,
  ...args
}: UseProfilesToFollowArgs & {
  expectedObserverId?: ProfileId;
  profiles: Profile[];
}) {
  const sources = mockSources();

  return renderHookWithMocks(() => useProfilesToFollow(args), {
    mocks: {
      sources,
      apolloClient: createMockApolloClientWithMultipleResponses([
        createProfilesToFollowMockedResponse({
          variables: {
            observerId: expectedObserverId ?? null,
            sources,
          },
          profiles,
        }),
      ]),
    },
  });
}

describe(`Given the ${useProfilesToFollow.name} hook`, () => {
  const profiles = [mockProfileFragment()];

  beforeAll(() => {
    simulateAppReady();
  });

  describe('when the query returns data successfully', () => {
    it('should return profiles to follow', async () => {
      const { result } = setupTestScenario({ profiles });

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
      const { result } = setupTestScenario({ profiles, expectedObserverId: activeProfile.id });

      await waitFor(() => expect(result.current.loading).toBeFalsy());
      expect(result.current.data).toEqual(profiles);
    });

    it('should always allow to specify the "observerId" on a per-call basis', async () => {
      const observerId = mockProfileId();

      const { result } = setupTestScenario({
        observerId,
        profiles,
        expectedObserverId: observerId,
      });

      await waitFor(() => expect(result.current.loading).toBeFalsy());
      expect(result.current.data).toEqual(profiles);
    });
  });
});
