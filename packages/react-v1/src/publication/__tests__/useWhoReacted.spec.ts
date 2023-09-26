import { WhoReactedResult } from '@lens-protocol/api-bindings';
import {
  mockLensApolloClient,
  mockWhoReactedPublicationResponse,
  mockSources,
  mockWhoReactedResultFragment,
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
import { useWhoReacted, UseWhoReactedArgs } from '../useWhoReacted';

function setupTestScenario({
  expectedObserverId,
  result,
  ...args
}: UseWhoReactedArgs & {
  expectedObserverId?: ProfileId;
  result: WhoReactedResult[];
}) {
  const sources = mockSources();

  return renderHookWithMocks(() => useWhoReacted(args), {
    mocks: {
      sources,
      mediaTransforms: defaultMediaTransformsConfig,
      apolloClient: mockLensApolloClient([
        mockWhoReactedPublicationResponse({
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

describe(`Given the ${useWhoReacted.name} hook`, () => {
  const publicationId = mockPublicationId();
  const reactions = [mockWhoReactedResultFragment()];
  const expectations = reactions.map(({ __typename, reactionId }) => ({ __typename, reactionId }));

  beforeAll(() => {
    simulateNotAuthenticated();
  });

  describe('when the query returns data successfully', () => {
    it('should return who reacted results', async () => {
      const { result } = setupTestScenario({ publicationId, result: reactions });

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
        result: reactions,
        expectedObserverId: activeProfile.id,
      });

      await waitFor(() => expect(result.current.loading).toBeFalsy());
      expect(result.current.data).toMatchObject(expectations);
    });

    it('should allow to override the "observerId" on a per-call basis', async () => {
      const observerId = mockProfileId();

      const { result } = setupTestScenario({
        publicationId,
        result: reactions,
        observerId,
        expectedObserverId: observerId,
      });

      await waitFor(() => expect(result.current.loading).toBeFalsy());
      expect(result.current.data).toMatchObject(expectations);
    });
  });
});
