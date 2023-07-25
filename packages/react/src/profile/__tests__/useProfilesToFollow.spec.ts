import { Profile } from '@lens-protocol/api-bindings';
import {
  mockLensApolloClient,
  mockProfileFragment,
  mockProfilesToFollowResponse,
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
      mediaTransforms: defaultMediaTransformsConfig,
      apolloClient: mockLensApolloClient([
        mockProfilesToFollowResponse({
          variables: {
            observerId: expectedObserverId ?? null,
            sources,
            ...mediaTransformConfigToQueryVariables(defaultMediaTransformsConfig),
          },
          profiles,
        }),
      ]),
    },
  });
}

describe(`Given the ${useProfilesToFollow.name} hook`, () => {
  const profiles = [mockProfileFragment()];
  const expectations = profiles.map((profile) => ({ __typename: 'Profile', id: profile.id }));

  beforeAll(() => {
    simulateAuthenticatedWallet();
  });

  describe('when the query returns data successfully', () => {
    it('should return profiles to follow', async () => {
      const { result } = setupTestScenario({ profiles });

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
      const { result } = setupTestScenario({ profiles, expectedObserverId: activeProfile.id });

      await waitFor(() => expect(result.current.loading).toBeFalsy());
      expect(result.current.data).toMatchObject(expectations);
    });

    it('should allow to override the "observerId" on a per-call basis', async () => {
      const observerId = mockProfileId();

      const { result } = setupTestScenario({
        observerId,
        profiles,
        expectedObserverId: observerId,
      });

      await waitFor(() => expect(result.current.loading).toBeFalsy());
      expect(result.current.data).toMatchObject(expectations);
    });
  });
});
