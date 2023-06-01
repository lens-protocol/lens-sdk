import { PublicationRevenue, activeProfileIdentifierVar } from '@lens-protocol/api-bindings';
import {
  createMockApolloClientWithMultipleResponses,
  createGetPublicationRevenueMockedResponse,
  mockPublicationRevenueFragment,
  mockSources,
} from '@lens-protocol/api-bindings/mocks';
import { ProfileId } from '@lens-protocol/domain/entities';
import { mockProfile, mockProfileId, mockPublicationId } from '@lens-protocol/domain/mocks';
import { waitFor } from '@testing-library/react';

import { renderHookWithMocks } from '../../__helpers__/testing-library';
import { NotFoundError } from '../../NotFoundError';
import { simulateAppReady } from '../../lifecycle/adapters/__helpers__/simulate';
import { usePublicationRevenue, UsePublicationRevenueArgs } from '../usePublicationRevenue';

function setupTestScenario({
  expectedObserverId,
  result,
  ...args
}: UsePublicationRevenueArgs & {
  expectedObserverId?: ProfileId;
  result: PublicationRevenue | null;
}) {
  const sources = mockSources();

  return renderHookWithMocks(() => usePublicationRevenue(args), {
    mocks: {
      sources,
      apolloClient: createMockApolloClientWithMultipleResponses([
        createGetPublicationRevenueMockedResponse({
          variables: {
            ...args,
            observerId: expectedObserverId ?? null,
            sources,
          },
          revenue: result,
        }),
      ]),
    },
  });
}

describe(`Given the ${usePublicationRevenue.name} hook`, () => {
  const revenue = mockPublicationRevenueFragment();
  const publicationId = mockPublicationId();

  beforeAll(() => {
    simulateAppReady();
  });

  describe.each([
    {
      description: 'when NO Active Profile is set',
      activeProfileValue: null,
    },
    {
      description: 'when an Active Profile is set',
      activeProfileValue: mockProfile(),
    },
  ])('$description', ({ activeProfileValue }) => {
    beforeAll(() => {
      activeProfileIdentifierVar(activeProfileValue);
    });

    it('should settle with the publication revenue details', async () => {
      const { result } = setupTestScenario({
        observerId: activeProfileValue?.id,
        expectedObserverId: activeProfileValue?.id,
        publicationId,
        result: revenue,
      });

      await waitFor(() => expect(result.current.loading).toBeFalsy());
      expect(result.current.data).toEqual(revenue);
    });

    it('should allow to specify the "observerId" on a per-call basis', async () => {
      const observerId = mockProfileId();

      const { result } = setupTestScenario({
        observerId: observerId,
        expectedObserverId: observerId,
        publicationId,
        result: revenue,
      });

      await waitFor(() => expect(result.current.loading).toBeFalsy());
      expect(result.current.data).toEqual(revenue);
    });

    it(`should settle with a ${NotFoundError.name} if not found`, async () => {
      const { result } = setupTestScenario({
        publicationId,
        expectedObserverId: activeProfileValue?.id,
        result: null,
      });

      await waitFor(() => expect(result.current.loading).toBeFalsy());
      expect(result.current.error).toBeInstanceOf(NotFoundError);
    });
  });
});
