import {
  AnyPublication,
  PublicationSortCriteria,
  PublicationTypes,
} from '@lens-protocol/api-bindings';
import {
  mockLensApolloClient,
  mockPostFragment,
  mockExplorePublicationsResponse,
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
import { DEFAULT_PAGINATED_QUERY_LIMIT } from '../../utils';
import { useExplorePublications, UseExplorePublicationsArgs } from '../useExplorePublications';

function setupTestScenario({
  expectedObserverId,
  result,
  ...args
}: UseExplorePublicationsArgs & {
  expectedObserverId?: ProfileId;
  result: AnyPublication[];
}) {
  const sources = mockSources();

  return renderHookWithMocks(() => useExplorePublications(args), {
    mocks: {
      sources,
      mediaTransforms: defaultMediaTransformsConfig,

      apolloClient: mockLensApolloClient([
        mockExplorePublicationsResponse({
          variables: {
            limit: DEFAULT_PAGINATED_QUERY_LIMIT,
            sortCriteria: PublicationSortCriteria.Latest,
            ...args,
            sources,
            observerId: expectedObserverId ?? null,
            ...mediaTransformConfigToQueryVariables(defaultMediaTransformsConfig),
          },
          items: result,
        }),
      ]),
    },
  });
}

describe(`Given the ${useExplorePublications.name} hook`, () => {
  const publications = [mockPostFragment()];
  const expectations = publications.map(({ __typename, id }) => ({ __typename, id }));

  beforeAll(() => {
    simulateNotAuthenticated();
  });

  describe('when invoked', () => {
    it('should return publications that match the explore with default parameters', async () => {
      const { result } = setupTestScenario({ result: publications });

      await waitFor(() => expect(result.current.loading).toBeFalsy());
      expect(result.current.data).toMatchObject(publications);
    });

    it('should return publications that match the explore with custom parameters', async () => {
      const customParams = {
        sortCriteria: PublicationSortCriteria.TopCollected,
        limit: 20,
        publicationTypes: [PublicationTypes.Comment, PublicationTypes.Post],
      };
      const { result } = setupTestScenario({ ...customParams, result: publications });

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
        result: publications,
        expectedObserverId: activeProfile.id,
      });

      await waitFor(() => expect(result.current.loading).toBeFalsy());
      expect(result.current.data).toMatchObject(expectations);
    });

    it('should allow to override the "observerId" on a per-call basis', async () => {
      const observerId = mockProfileId();

      const { result } = setupTestScenario({
        observerId,
        result: publications,
        expectedObserverId: observerId,
      });

      await waitFor(() => expect(result.current.loading).toBeFalsy());
      expect(result.current.data).toMatchObject(expectations);
    });
  });
});
