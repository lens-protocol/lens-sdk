import { AnyPublication, activeProfileIdentifierVar } from '@lens-protocol/api-bindings';
import {
  mockLensApolloClient,
  mockPostFragment,
  mockSources,
  createGetPublicationMockedResponse,
} from '@lens-protocol/api-bindings/mocks';
import { ProfileId } from '@lens-protocol/domain/entities';
import { mockProfile, mockProfileId } from '@lens-protocol/domain/mocks';
import { waitFor } from '@testing-library/react';

import { NotFoundError } from '../../NotFoundError';
import { renderHookWithMocks } from '../../__helpers__/testing-library';
import { simulateAppReady } from '../../lifecycle/adapters/__helpers__/simulate';
import { usePublication, UsePublicationArgs } from '../usePublication';

function setupTestScenario({
  expectedObserverId,
  publication,
  publicationId,
  observerId,
}: UsePublicationArgs & {
  expectedObserverId?: ProfileId;
  publication: AnyPublication | null;
}) {
  const sources = mockSources();

  return renderHookWithMocks(() => usePublication({ publicationId, observerId }), {
    mocks: {
      sources,
      apolloClient: mockLensApolloClient([
        createGetPublicationMockedResponse({
          variables: {
            request: { publicationId },
            sources,
            observerId: expectedObserverId ?? null,
          },
          publication,
        }),
      ]),
    },
  });
}

describe(`Given the ${usePublication.name} hook`, () => {
  const publication = mockPostFragment();

  beforeAll(() => {
    simulateAppReady();
  });

  describe.each([
    {
      precondition: 'and NO Active Profile set',
      activeProfileValue: null,
    },
    {
      precondition: 'and an Active Profile set',
      activeProfileValue: mockProfile(),
    },
  ])('$precondition', ({ activeProfileValue }) => {
    beforeAll(() => {
      activeProfileIdentifierVar(activeProfileValue);
    });

    describe('when the query returns data successfully', () => {
      it('should settle with the publication data', async () => {
        const { result } = setupTestScenario({
          publicationId: publication.id,
          expectedObserverId: activeProfileValue?.id,
          publication,
        });

        await waitFor(() => expect(result.current.loading).toBeFalsy());
        expect(result.current.data).toMatchObject(publication);
      });

      it('should allow to specify the "observerId" on a per-call basis', async () => {
        const observerId = mockProfileId();
        const { result } = setupTestScenario({
          publicationId: publication.id,
          observerId,
          expectedObserverId: observerId,
          publication,
        });

        await waitFor(() => expect(result.current.loading).toBeFalsy());
        expect(result.current.data).toMatchObject(publication);
      });
    });

    describe('when the query returns null', () => {
      it(`should settle with a ${NotFoundError.name} state`, async () => {
        const { result } = setupTestScenario({
          publicationId: publication.id,
          expectedObserverId: activeProfileValue?.id,
          publication: null,
        });

        await waitFor(() => expect(result.current.loading).toBeFalsy());
        expect(result.current.error).toBeInstanceOf(NotFoundError);
      });
    });
  });
});
