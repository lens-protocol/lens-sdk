import { SafeApolloClient } from '@lens-protocol/api-bindings';
import {
  mockLensApolloClient,
  mockPostFragment,
  mockGetPublicationsResponse,
  mockSources,
  simulateAuthenticatedProfile,
  simulateNotAuthenticated,
  mockPaginatedResultInfo,
} from '@lens-protocol/api-bindings/mocks';
import { mockProfile, mockProfileId } from '@lens-protocol/domain/mocks';
import { waitFor } from '@testing-library/react';

import { renderHookWithMocks } from '../../__helpers__/testing-library';
import {
  defaultMediaTransformsConfig,
  mediaTransformConfigToQueryVariables,
} from '../../mediaTransforms';
import { usePublications, UsePublicationsArgs } from '../usePublications';

const sources = mockSources();

function renderUsePublications({
  args,
  client,
}: {
  args: UsePublicationsArgs;
  client: SafeApolloClient;
}) {
  return renderHookWithMocks(() => usePublications(args), {
    mocks: {
      sources,
      mediaTransforms: defaultMediaTransformsConfig,
      apolloClient: client,
    },
  });
}

describe(`Given the ${usePublications.name} hook`, () => {
  const profileId = mockProfileId();
  const publications = [mockPostFragment()];
  const expectations = publications.map(({ __typename, id }) => ({ __typename, id }));

  beforeAll(() => {
    simulateNotAuthenticated();
  });

  describe('when the query returns data successfully', () => {
    const client = mockLensApolloClient([
      mockGetPublicationsResponse({
        variables: {
          profileId,
          observerId: null,
          limit: 10,
          sources,
          ...mediaTransformConfigToQueryVariables(defaultMediaTransformsConfig),
        },
        publications,
      }),
    ]);

    it('should settle with the publications', async () => {
      const { result } = renderUsePublications({ args: { profileId }, client });

      await waitFor(() => expect(result.current.loading).toBeFalsy());
      expect(result.current.data).toMatchObject(expectations);
    });
  });

  describe('when a session with an Active Profile is set', () => {
    const activeProfile = mockProfile();
    const client = mockLensApolloClient([
      mockGetPublicationsResponse({
        variables: {
          profileId,
          observerId: activeProfile.id,
          limit: 10,
          sources,
          ...mediaTransformConfigToQueryVariables(defaultMediaTransformsConfig),
        },
        publications,
      }),
    ]);

    beforeAll(() => {
      simulateAuthenticatedProfile(activeProfile);
    });

    afterAll(() => {
      simulateNotAuthenticated();
    });

    it('should use the Active Profile as the queried publication observer', async () => {
      const { result } = renderUsePublications({ args: { profileId }, client });

      await waitFor(() => expect(result.current.loading).toBeFalsy());
      expect(result.current.data).toMatchObject(expectations);
    });
  });

  describe('when an "observerId" is provided', () => {
    const observerId = mockProfileId();
    const client = mockLensApolloClient([
      mockGetPublicationsResponse({
        variables: {
          profileId,
          observerId,
          limit: 10,
          sources,
          ...mediaTransformConfigToQueryVariables(defaultMediaTransformsConfig),
        },
        publications,
      }),
    ]);

    it('should allow to override the "observerId" on a per-call basis', async () => {
      const { result } = renderUsePublications({ args: { profileId, observerId }, client });

      await waitFor(() => expect(result.current.loading).toBeFalsy());
      expect(result.current.data).toMatchObject(expectations);
    });
  });

  describe(`when re-rendered`, () => {
    const initialPageInfo = mockPaginatedResultInfo({ beforeCount: 0 });

    const client = mockLensApolloClient([
      mockGetPublicationsResponse({
        variables: {
          profileId,
          observerId: null,
          limit: 10,
          sources,
          ...mediaTransformConfigToQueryVariables(defaultMediaTransformsConfig),
        },
        publications,
        info: initialPageInfo,
      }),

      mockGetPublicationsResponse({
        variables: {
          profileId,
          cursor: initialPageInfo.prev,
          limit: 10,
          sources,
        },
        publications: [mockPostFragment()],
      }),
    ]);

    it.only(`should return cached data and then update it with fresh data from the API`, async () => {
      const first = renderUsePublications({ args: { profileId }, client });
      await waitFor(() => expect(first.result.current.loading).toBeFalsy());

      const second = renderUsePublications({ args: { profileId }, client });

      expect(second.result.current).toMatchObject({
        data: expectations,
        loading: false,
      });

      await waitFor(() => expect(second.result.current.beforeCount).toEqual(1));
    });
  });
});
