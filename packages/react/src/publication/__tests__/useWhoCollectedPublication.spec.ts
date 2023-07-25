import { Wallet } from '@lens-protocol/api-bindings';
import {
  mockLensApolloClient,
  mockWalletFragment,
  mockWhoCollectedPublicationResponse,
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
  useWhoCollectedPublication,
  UseWhoCollectedPublicationArgs,
} from '../useWhoCollectedPublication';

function setupTestScenario({
  expectedObserverId,
  result,
  ...args
}: UseWhoCollectedPublicationArgs & { expectedObserverId?: ProfileId; result: Wallet[] }) {
  const sources = mockSources();

  return renderHookWithMocks(() => useWhoCollectedPublication(args), {
    mocks: {
      sources,
      mediaTransforms: defaultMediaTransformsConfig,
      apolloClient: mockLensApolloClient([
        mockWhoCollectedPublicationResponse({
          variables: {
            ...args,
            observerId: expectedObserverId ?? null,
            limit: 10,
            sources,
            ...mediaTransformConfigToQueryVariables(defaultMediaTransformsConfig),
          },
          wallets: result,
        }),
      ]),
    },
  });
}

describe(`Given the ${useWhoCollectedPublication.name} hook`, () => {
  const publicationId = mockPublicationId();
  const collectors = [mockWalletFragment()];
  const expectations = collectors.map(({ __typename, address }) => ({ __typename, address }));

  beforeAll(() => {
    simulateNotAuthenticated();
  });

  describe('when the query returns data successfully', () => {
    it('should return wallets who collected the publication', async () => {
      const { result } = setupTestScenario({ publicationId, result: collectors });

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
        result: collectors,
        expectedObserverId: activeProfile.id,
      });

      await waitFor(() => expect(result.current.loading).toBeFalsy());
      expect(result.current.data).toMatchObject(expectations);
    });

    it('should allow to override the "observerId" on a per-call basis', async () => {
      const observerId = mockProfileId();

      const { result } = setupTestScenario({
        publicationId,
        result: collectors,
        observerId,
        expectedObserverId: observerId,
      });

      await waitFor(() => expect(result.current.loading).toBeFalsy());
      expect(result.current.data).toMatchObject(expectations);
    });
  });
});
