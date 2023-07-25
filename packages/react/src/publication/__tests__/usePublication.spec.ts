import { AnyPublication } from '@lens-protocol/api-bindings';
import {
  mockLensApolloClient,
  mockPostFragment,
  mockSources,
  mockGetPublicationResponse,
  simulateAuthenticatedProfile,
  simulateNotAuthenticated,
} from '@lens-protocol/api-bindings/mocks';
import { ProfileId } from '@lens-protocol/domain/entities';
import { mockProfile, mockProfileId } from '@lens-protocol/domain/mocks';
import { waitFor } from '@testing-library/react';

import { NotFoundError } from '../../NotFoundError';
import { renderHookWithMocks } from '../../__helpers__/testing-library';
import {
  defaultMediaTransformsConfig,
  mediaTransformConfigToQueryVariables,
} from '../../mediaTransforms';
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
      mediaTransforms: defaultMediaTransformsConfig,
      apolloClient: mockLensApolloClient([
        mockGetPublicationResponse({
          variables: {
            request: { publicationId },
            sources,
            observerId: expectedObserverId ?? null,
            ...mediaTransformConfigToQueryVariables(defaultMediaTransformsConfig),
          },
          publication,
        }),
      ]),
    },
  });
}

describe(`Given the ${usePublication.name} hook`, () => {
  const publication = mockPostFragment();
  const expectations = { __typename: 'Post', id: publication.id };

  beforeAll(() => {
    simulateNotAuthenticated();
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
      if (activeProfileValue) {
        simulateAuthenticatedProfile(activeProfileValue);
      }
    });

    describe('when the query returns data successfully', () => {
      it('should settle with the publication data', async () => {
        const { result } = setupTestScenario({
          publicationId: publication.id,
          expectedObserverId: activeProfileValue?.id,
          publication,
        });

        await waitFor(() => expect(result.current.loading).toBeFalsy());
        expect(result.current.data).toMatchObject(expectations);
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
        expect(result.current.data).toMatchObject(expectations);
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
