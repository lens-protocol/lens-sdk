import { Profile } from '@lens-protocol/api-bindings';
import {
  mockGetAllProfilesResponse,
  mockLensApolloClient,
  mockProfileFragment,
  mockSources,
  simulateAuthenticatedProfile,
  simulateNotAuthenticated,
} from '@lens-protocol/api-bindings/mocks';
import { ProfileId } from '@lens-protocol/domain/entities';
import { mockProfile, mockProfileId, mockPublicationId } from '@lens-protocol/domain/mocks';
import { waitFor } from '@testing-library/react';

import { renderHookWithMocks } from '../../__helpers__/testing-library';
import {
  defaultMediaTransformsConfig,
  mediaTransformConfigToQueryVariables,
} from '../../mediaTransforms';
import {
  useWhoMirroredPublication,
  UseWhoMirroredPublicationArgs,
} from '../useWhoMirroredPublication';

function setupTestScenario({
  expectedObserverId,
  result,
  publicationId,
  ...others
}: UseWhoMirroredPublicationArgs & { expectedObserverId?: ProfileId; result: Profile[] }) {
  const sources = mockSources();

  return renderHookWithMocks(() => useWhoMirroredPublication({ publicationId, ...others }), {
    mocks: {
      sources,
      mediaTransforms: defaultMediaTransformsConfig,
      apolloClient: mockLensApolloClient([
        mockGetAllProfilesResponse({
          variables: {
            ...others,
            byWhoMirroredPublicationId: publicationId,
            observerId: expectedObserverId ?? null,
            limit: 10,
            sources,
            ...mediaTransformConfigToQueryVariables(defaultMediaTransformsConfig),
          },
          profiles: result,
        }),
      ]),
    },
  });
}

describe(`Given the ${useWhoMirroredPublication.name} hook`, () => {
  const publicationId = mockPublicationId();
  const profiles = [mockProfileFragment()];
  const expectations = profiles.map(({ __typename, id }) => ({ __typename, id }));

  beforeAll(() => {
    simulateNotAuthenticated();
  });

  describe('when the query returns data successfully', () => {
    it('should return profiles that mirrored the queried publication', async () => {
      const { result } = setupTestScenario({ publicationId, result: profiles });

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
        publicationId,
        result: profiles,
        expectedObserverId: activeProfile.id,
      });

      await waitFor(() => expect(result.current.loading).toBeFalsy());
      expect(result.current.data).toMatchObject(expectations);
    });

    it('should allow to override the "observerId" on a per-call basis', async () => {
      const observerId = mockProfileId();

      const { result } = setupTestScenario({
        publicationId,
        result: profiles,
        observerId,
        expectedObserverId: observerId,
      });

      await waitFor(() => expect(result.current.loading).toBeFalsy());
      expect(result.current.data).toMatchObject(expectations);
    });
  });
});
