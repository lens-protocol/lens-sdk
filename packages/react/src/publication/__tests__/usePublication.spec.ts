import { AnyPublicationFragment } from '@lens-protocol/api-bindings';
import {
  createMockApolloClientWithMultipleResponses,
  mockPostFragment,
  createPublicationQueryMockedResponse,
  mockSources,
} from '@lens-protocol/api-bindings/mocks';
import { Profile, ProfileId, PublicationId } from '@lens-protocol/domain/entities';
import { mockProfile, mockProfileId } from '@lens-protocol/domain/mocks';
import { waitFor } from '@testing-library/react';

import { NotFoundError } from '../../NotFoundError';
import { renderHookWithMocks } from '../../__helpers__/testing-library';
import { simulateAppReady } from '../../lifecycle/adapters/__helpers__/simulate';
import { activeProfileIdentifierVar } from '../../profile/adapters/ActiveProfilePresenter';
import { usePublication, UsePublicationArgs } from '../usePublication';

function setupTestScenario({
  expectedObserverId,
  result,
  ...args
}: UsePublicationArgs & {
  publicationId: PublicationId;
  observerId?: ProfileId;
  expectedObserverId?: ProfileId;
  result: AnyPublicationFragment | null;
}) {
  const sources = mockSources();

  return renderHookWithMocks(() => usePublication(args), {
    mocks: {
      sources,
      apolloClient: createMockApolloClientWithMultipleResponses([
        createPublicationQueryMockedResponse({
          variables: {
            ...args,
            sources,
            observerId: expectedObserverId ?? null,
          },
          result,
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

  describe.each<{
    activeProfileValue: Profile | null;
    precondition: string;
  }>([
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
          result: publication,
        });

        await waitFor(() => expect(result.current.loading).toBeFalsy());
        expect(result.current.data).toEqual(publication);
      });

      it('should allow to specify the "observerId" on a per-call basis', async () => {
        const observerId = mockProfileId();
        const { result } = setupTestScenario({
          publicationId: publication.id,
          observerId,
          expectedObserverId: observerId,
          result: publication,
        });

        await waitFor(() => expect(result.current.loading).toBeFalsy());
        expect(result.current.data).toEqual(publication);
      });
    });

    describe('when the query returns null', () => {
      it(`should settle with a ${NotFoundError.name} state`, async () => {
        const { result } = setupTestScenario({
          publicationId: publication.id,
          expectedObserverId: activeProfileValue?.id,
          result: null,
        });

        await waitFor(() => expect(result.current.loading).toBeFalsy());
        expect(result.current.error).toBeInstanceOf(NotFoundError);
      });
    });
  });
});
