import { activeProfileIdentifierVar, AnyPublication } from '@lens-protocol/api-bindings';
import {
  mockLensApolloClient,
  mockPostFragment,
  createGetPublicationsMockedResponse,
  mockSources,
} from '@lens-protocol/api-bindings/mocks';
import { ProfileId } from '@lens-protocol/domain/entities';
import { mockProfile, mockProfileId } from '@lens-protocol/domain/mocks';
import { waitFor } from '@testing-library/react';

import { renderHookWithMocks } from '../../__helpers__/testing-library';
import { simulateAppReady } from '../../lifecycle/adapters/__helpers__/simulate';
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
      apolloClient: mockLensApolloClient([
        createGetPublicationsMockedResponse({
          variables: {
            ...args,
            observerId: expectedObserverId ?? null,
            limit: 10,
            sources,
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
        result: publications,
        observerId,
        expectedObserverId: observerId,
      });

      await waitFor(() => expect(result.current.loading).toBeFalsy());
      expect(result.current.data).toEqual(publications);
    });
  });
});
