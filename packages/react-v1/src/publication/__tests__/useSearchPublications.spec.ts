import { ContentPublication } from '@lens-protocol/api-bindings';
import {
  mockLensApolloClient,
  mockSearchPublicationsResponse,
  mockCommentFragment,
  mockPostFragment,
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
import { useSearchPublications, UseSearchPublicationsArgs } from '../useSearchPublications';

function setupTestScenario({
  result,
  expectedObserverId,
  ...args
}: UseSearchPublicationsArgs & {
  expectedObserverId?: ProfileId;
  result: ContentPublication[];
}) {
  const sources = mockSources();

  return renderHookWithMocks(() => useSearchPublications(args), {
    mocks: {
      sources,
      mediaTransforms: defaultMediaTransformsConfig,
      apolloClient: mockLensApolloClient([
        mockSearchPublicationsResponse({
          variables: {
            ...args,
            observerId: expectedObserverId ?? null,
            limit: 10,
            sources,
            ...mediaTransformConfigToQueryVariables(defaultMediaTransformsConfig),
          },
          items: result,
        }),
      ]),
    },
  });
}

describe(`Given the ${useSearchPublications.name} hook`, () => {
  const query = 'query_test';
  const publications = [mockPostFragment(), mockCommentFragment()];
  const expectations = publications.map(({ __typename, id }) => ({ __typename, id }));

  beforeAll(() => {
    simulateNotAuthenticated();
  });

  describe('when the query returns data successfully', () => {
    it('should return publications that match the search result', async () => {
      const { result } = setupTestScenario({ query, result: publications });

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
        result: publications,
        expectedObserverId: activeProfile.id,
      });

      await waitFor(() => expect(result.current.loading).toBeFalsy());
      expect(result.current.data).toMatchObject(expectations);
    });

    it('should allow to override the "observerId" on a per-call basis', async () => {
      const observerId = mockProfileId();

      const { result } = setupTestScenario({
        query,
        result: publications,
        observerId,
        expectedObserverId: observerId,
      });

      await waitFor(() => expect(result.current.loading).toBeFalsy());
      expect(result.current.data).toMatchObject(expectations);
    });
  });
});
