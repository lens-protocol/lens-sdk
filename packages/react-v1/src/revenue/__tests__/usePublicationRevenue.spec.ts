import { PublicationRevenue } from '@lens-protocol/api-bindings';
import {
  mockLensApolloClient,
  mockGetPublicationRevenueResponse,
  mockPublicationRevenueFragment,
  mockSources,
  simulateAuthenticatedProfile,
  simulateNotAuthenticated,
} from '@lens-protocol/api-bindings/mocks';
import { ProfileId } from '@lens-protocol/domain/entities';
import { mockProfile, mockProfileId, mockPublicationId } from '@lens-protocol/domain/mocks';
import { waitFor } from '@testing-library/react';

import { NotFoundError } from '../../NotFoundError';
import { renderHookWithMocks } from '../../__helpers__/testing-library';
import {
  defaultMediaTransformsConfig,
  mediaTransformConfigToQueryVariables,
} from '../../mediaTransforms';
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
      mediaTransforms: defaultMediaTransformsConfig,
      apolloClient: mockLensApolloClient([
        mockGetPublicationRevenueResponse({
          variables: {
            ...args,
            observerId: expectedObserverId ?? null,
            sources,
            ...mediaTransformConfigToQueryVariables(defaultMediaTransformsConfig),
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
  const expectations = { __typename: revenue.__typename };

  beforeAll(() => {
    simulateNotAuthenticated();
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
      if (activeProfileValue) {
        simulateAuthenticatedProfile(activeProfileValue);
      }
    });

    it('should settle with the publication revenue details', async () => {
      const { result } = setupTestScenario({
        observerId: activeProfileValue?.id,
        expectedObserverId: activeProfileValue?.id,
        publicationId,
        result: revenue,
      });

      await waitFor(() => expect(result.current.loading).toBeFalsy());
      expect(result.current.data).toMatchObject(expectations);
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
      expect(result.current.data).toMatchObject(expectations);
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
