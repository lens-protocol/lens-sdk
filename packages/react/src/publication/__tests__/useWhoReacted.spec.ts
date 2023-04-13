import { activeProfileIdentifierVar, WhoReactedResult } from '@lens-protocol/api-bindings';
import {
  createMockApolloClientWithMultipleResponses,
  createWhoReactedPublicationMockedResponse,
  mockSources,
  mockWhoReactedResultFragment,
} from '@lens-protocol/api-bindings/mocks';
import { ProfileId } from '@lens-protocol/domain/entities';
import { mockProfile, mockProfileId, mockPublicationId } from '@lens-protocol/domain/mocks';
import { waitFor } from '@testing-library/react';

import { renderHookWithMocks } from '../../__helpers__/testing-library';
import { simulateAppReady } from '../../lifecycle/adapters/__helpers__/simulate';
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
      apolloClient: createMockApolloClientWithMultipleResponses([
        createWhoReactedPublicationMockedResponse({
          variables: {
            ...args,
            observerId: expectedObserverId ?? null,
            limit: 10,
            sources,
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

  beforeAll(() => {
    simulateAppReady();
  });

  describe('when the query returns data successfully', () => {
    it('should return who reacted results', async () => {
      const { result } = setupTestScenario({ publicationId, result: reactions });

      await waitFor(() => expect(result.current.loading).toBeFalsy());
      expect(result.current.data).toEqual(reactions);
    });
  });

  describe('when there is an Active Profile defined', () => {
    const activeProfile = mockProfile();

    beforeAll(() => {
      activeProfileIdentifierVar(activeProfile);
    });

    it('should use the Active Profile Id as the "observerId"', async () => {
      const { result } = setupTestScenario({
        publicationId,
        result: reactions,
        expectedObserverId: activeProfile.id,
      });

      await waitFor(() => expect(result.current.loading).toBeFalsy());
      expect(result.current.data).toEqual(reactions);
    });

    it('should always allow to specify the "observerId" on a per-call basis', async () => {
      const observerId = mockProfileId();

      const { result } = setupTestScenario({
        publicationId,
        result: reactions,
        observerId,
        expectedObserverId: observerId,
      });

      await waitFor(() => expect(result.current.loading).toBeFalsy());
      expect(result.current.data).toEqual(reactions);
    });
  });
});
