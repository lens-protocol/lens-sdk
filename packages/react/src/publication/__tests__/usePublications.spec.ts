import { AnyPublication } from '@lens-protocol/api-bindings';
import {
  mockLensApolloClient,
  mockPostFragment,
  mockGetPublicationsResponse,
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
import { usePublications, UsePublicationsArgs } from '../usePublications';

function setupTestScenario({
  result,
  expectedObserverId,
  ...args
}: UsePublicationsArgs & { expectedObserverId?: ProfileId; result: AnyPublication[] }) {
  const sources = mockSources();

  return renderHookWithMocks(() => usePublications(args), {
    mocks: {
      sources,
      mediaTransforms: defaultMediaTransformsConfig,
      apolloClient: mockLensApolloClient([
        mockGetPublicationsResponse({
          variables: {
            ...args,
            observerId: expectedObserverId ?? null,
            limit: 10,
            sources,
            ...mediaTransformConfigToQueryVariables(defaultMediaTransformsConfig),
          },
          publications: result,
        }),
      ]),
    },
  });
}

describe(`Given the ${usePublications.name} hook`, () => {
  const profileId = mockProfileId();
  const publications = [mockPostFragment()];
  const expectations = publications.map(({ __typename, id }) => ({ __typename, id }));

  beforeAll(() => {
    simulateNotAuthenticated();
  });

  describe('when the query returns data successfully', () => {
    it('should return publications', async () => {
      const { result } = setupTestScenario({ profileId, result: publications });

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
        profileId,
        result: publications,
        expectedObserverId: activeProfile.id,
      });

      await waitFor(() => expect(result.current.loading).toBeFalsy());
      expect(result.current.data).toMatchObject(expectations);
    });

    it('should allow to override the "observerId" on a per-call basis', async () => {
      const observerId = mockProfileId();

      const { result } = setupTestScenario({
        profileId,
        result: publications,
        observerId,
        expectedObserverId: observerId,
      });

      await waitFor(() => expect(result.current.loading).toBeFalsy());
      expect(result.current.data).toMatchObject(expectations);
    });
  });
});
