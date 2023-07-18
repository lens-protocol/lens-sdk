import { SafeApolloClient } from '@lens-protocol/api-bindings';
import {
  mockLensApolloClient,
  mockPostFragment,
  mockSources,
  mockGetPublicationResponse,
  simulateAuthenticatedProfile,
  simulateNotAuthenticated,
} from '@lens-protocol/api-bindings/mocks';
import { mockProfile, mockProfileId } from '@lens-protocol/domain/mocks';
import { waitFor } from '@testing-library/react';

import { NotFoundError } from '../../NotFoundError';
import { renderHookWithMocks } from '../../__helpers__/testing-library';
import {
  defaultMediaTransformsConfig,
  mediaTransformConfigToQueryVariables,
} from '../../mediaTransforms';
import { usePublication, UsePublicationArgs } from '../usePublication';

const sources = mockSources();

function renderUsePublication({
  args,
  client,
}: {
  args: UsePublicationArgs;
  client: SafeApolloClient;
}) {
  return renderHookWithMocks(() => usePublication(args), {
    mocks: {
      sources,
      mediaTransforms: defaultMediaTransformsConfig,
      apolloClient: client,
    },
  });
}

describe(`Given the ${usePublication.name} hook`, () => {
  const publication = mockPostFragment();
  const expectations = { __typename: 'Post', id: publication.id };

  beforeAll(() => {
    simulateNotAuthenticated();
  });

  describe('when the queried publication exists', () => {
    const client = mockLensApolloClient([
      mockGetPublicationResponse({
        variables: {
          request: {
            publicationId: publication.id,
          },
          sources,
          observerId: null,
          ...mediaTransformConfigToQueryVariables(defaultMediaTransformsConfig),
        },
        publication,
      }),
    ]);

    it('should settle with the publication data', async () => {
      const { result } = renderUsePublication({
        args: {
          publicationId: publication.id,
        },
        client,
      });

      await waitFor(() => expect(result.current.loading).toBeFalsy());
      expect(result.current.data).toMatchObject(expectations);
    });
  });

  describe('when a session with an Active Profile is set', () => {
    const activeProfile = mockProfile();
    const client = mockLensApolloClient([
      mockGetPublicationResponse({
        variables: {
          request: {
            publicationId: publication.id,
          },
          sources,
          observerId: activeProfile.id,
          ...mediaTransformConfigToQueryVariables(defaultMediaTransformsConfig),
        },
        publication,
      }),
    ]);

    beforeAll(() => {
      simulateAuthenticatedProfile(activeProfile);
    });

    afterAll(() => {
      simulateNotAuthenticated();
    });

    it('should use the Active Profile as the queried publication observer', async () => {
      const { result } = renderUsePublication({
        args: {
          publicationId: publication.id,
        },
        client,
      });

      await waitFor(() => expect(result.current.loading).toBeFalsy());
      expect(result.current.data).toMatchObject(expectations);
    });
  });

  describe('when an "observerId" is provided', () => {
    const observerId = mockProfileId();
    const client = mockLensApolloClient([
      mockGetPublicationResponse({
        variables: {
          request: {
            publicationId: publication.id,
          },
          sources,
          observerId,
          ...mediaTransformConfigToQueryVariables(defaultMediaTransformsConfig),
        },
        publication,
      }),
    ]);

    it('should use it as the queried publication observer', async () => {
      const { result } = renderUsePublication({
        args: {
          publicationId: publication.id,
          observerId,
        },
        client,
      });

      await waitFor(() => expect(result.current.loading).toBeFalsy());
      expect(result.current.data).toMatchObject(expectations);
    });
  });

  describe(`when re-rendered`, () => {
    const client = mockLensApolloClient([
      mockGetPublicationResponse({
        variables: {
          request: {
            publicationId: publication.id,
          },
          sources,
          observerId: null,
          ...mediaTransformConfigToQueryVariables(defaultMediaTransformsConfig),
        },
        publication: mockPostFragment({ id: publication.id }),
      }),
      mockGetPublicationResponse({
        variables: {
          request: {
            publicationId: publication.id,
          },
          sources,
          observerId: null,
        },
        publication,
      }),
    ]);

    it(`should return cached data and then update it with fresh data from the API`, async () => {
      const first = renderUsePublication({
        args: { publicationId: publication.id },
        client,
      });
      await waitFor(() => expect(first.result.current.loading).toBeFalsy());

      const second = renderUsePublication({
        args: { publicationId: publication.id },
        client,
      });

      expect(second.result.current).toMatchObject({
        data: expectations,
        loading: false,
      });
      await waitFor(() =>
        expect(first.result.current.data).toMatchObject({
          stats: publication.stats,
        }),
      );
    });
  });

  describe('when the queried publication does not exist', () => {
    const client = mockLensApolloClient([
      mockGetPublicationResponse({
        variables: {
          request: {
            publicationId: publication.id,
          },
          sources,
          observerId: null,
          ...mediaTransformConfigToQueryVariables(defaultMediaTransformsConfig),
        },
        publication: null,
      }),
    ]);

    it(`should settle with a ${NotFoundError.name} state`, async () => {
      const { result } = renderUsePublication({
        args: {
          publicationId: publication.id,
        },
        client,
      });

      await waitFor(() => expect(result.current.loading).toBeFalsy());
      expect(result.current.error).toBeInstanceOf(NotFoundError);
    });
  });
});
