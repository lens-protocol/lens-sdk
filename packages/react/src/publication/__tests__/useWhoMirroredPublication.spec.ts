import { activeProfileIdentifierVar, Profile } from '@lens-protocol/api-bindings';
import {
  createGetAllProfilesMockedResponse,
  mockLensApolloClient,
  mockProfileFragment,
  mockSources,
} from '@lens-protocol/api-bindings/mocks';
import { ProfileId } from '@lens-protocol/domain/entities';
import { mockProfile, mockProfileId, mockPublicationId } from '@lens-protocol/domain/mocks';
import { waitFor } from '@testing-library/react';

import { renderHookWithMocks } from '../../__helpers__/testing-library';
import { simulateAppReady } from '../../lifecycle/adapters/__helpers__/simulate';
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
      apolloClient: mockLensApolloClient([
        createGetAllProfilesMockedResponse({
          variables: {
            ...others,
            byWhoMirroredPublicationId: publicationId,
            observerId: expectedObserverId ?? null,
            limit: 10,
            sources,
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

  beforeAll(() => {
    simulateAppReady();
  });

  describe('when the query returns data successfully', () => {
    it('should return profiles that mirrored the queried publication', async () => {
      const { result } = setupTestScenario({ publicationId, result: profiles });

      await waitFor(() => expect(result.current.loading).toBeFalsy());

      expect(result.current.data).toEqual(profiles);
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
        result: profiles,
        expectedObserverId: activeProfile.id,
      });

      await waitFor(() => expect(result.current.loading).toBeFalsy());
      expect(result.current.data).toEqual(profiles);
    });

    it('should always allow to specify the "observerId" on a per-call basis', async () => {
      const observerId = mockProfileId();

      const { result } = setupTestScenario({
        publicationId,
        result: profiles,
        observerId,
        expectedObserverId: observerId,
      });

      await waitFor(() => expect(result.current.loading).toBeFalsy());
      expect(result.current.data).toEqual(profiles);
    });
  });
});
