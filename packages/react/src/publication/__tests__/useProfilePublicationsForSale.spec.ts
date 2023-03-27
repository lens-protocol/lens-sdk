import { ContentPublication } from '@lens-protocol/api-bindings';
import {
  createMockApolloClientWithMultipleResponses,
  mockPostFragment,
  createProfilePublicationsForSaleMockedResponse,
  mockSources,
} from '@lens-protocol/api-bindings/mocks';
import { ProfileId } from '@lens-protocol/domain/entities';
import { mockProfile, mockProfileId } from '@lens-protocol/domain/mocks';
import { waitFor } from '@testing-library/react';

import { renderHookWithMocks } from '../../__helpers__/testing-library';
import { simulateAppReady } from '../../lifecycle/adapters/__helpers__/simulate';
import { activeProfileIdentifierVar } from '../../profile/adapters/ActiveProfilePresenter';
import {
  useProfilePublicationsForSale,
  UseProfilePublicationsForSaleArgs,
} from '../useProfilePublicationsForSale';

function setupTestScenario({
  expectedObserverId,
  result,
  ...args
}: UseProfilePublicationsForSaleArgs & {
  expectedObserverId?: ProfileId;
  result: ContentPublication[];
}) {
  const sources = mockSources();

  return renderHookWithMocks(() => useProfilePublicationsForSale(args), {
    mocks: {
      sources,
      apolloClient: createMockApolloClientWithMultipleResponses([
        createProfilePublicationsForSaleMockedResponse({
          variables: {
            ...args,
            limit: 10,
            sources,
            observerId: expectedObserverId ?? null,
          },
          items: result,
        }),
      ]),
    },
  });
}

describe(`Given the ${useProfilePublicationsForSale.name} hook`, () => {
  const profileId = mockProfileId();
  const publications = [mockPostFragment()];

  beforeAll(() => {
    simulateAppReady();
  });

  describe('when the query returns data successfully', () => {
    it('should return publications', async () => {
      const { result } = setupTestScenario({ profileId, result: publications });

      await waitFor(() => expect(result.current.loading).toBeFalsy());
      expect(result.current.data).toEqual(publications);
    });
  });

  describe('when there is an Active Profile defined', () => {
    const activeProfile = mockProfile();

    beforeAll(() => {
      activeProfileIdentifierVar(activeProfile);
    });

    it('should use the Active Profile Id as the "observerId"', async () => {
      const { result } = setupTestScenario({
        profileId,
        result: publications,
        expectedObserverId: activeProfile.id,
      });

      await waitFor(() => expect(result.current.loading).toBeFalsy());
      expect(result.current.data).toEqual(publications);
    });

    it('should always allow to specify the "observerId" on a per-call basis', async () => {
      const observerId = mockProfileId();

      const { result } = setupTestScenario({
        profileId,
        observerId,
        result: publications,
        expectedObserverId: observerId,
      });

      await waitFor(() => expect(result.current.loading).toBeFalsy());
      expect(result.current.data).toEqual(publications);
    });
  });
});
