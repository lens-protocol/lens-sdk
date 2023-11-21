import { MockedResponse } from '@apollo/client/testing';
import {
  mockLensApolloClient,
  mockPostFragment,
  mockGetPublicationsResponse,
  mockSources,
  simulateAuthenticatedProfile,
  simulateNotAuthenticated,
  mockPaginatedResultInfo,
  mockCursor,
} from '@lens-protocol/api-bindings/mocks';
import { mockProfile, mockProfileId } from '@lens-protocol/domain/mocks';
import { RenderHookResult, waitFor } from '@testing-library/react';

import { renderHookWithMocks } from '../../__helpers__/testing-library';
import {
  defaultMediaTransformsConfig,
  mediaTransformConfigToQueryVariables,
} from '../../mediaTransforms';
import { usePublications } from '../usePublications';

const sources = mockSources();

function setupTestScenario(mocks: MockedResponse[]) {
  const client = mockLensApolloClient(mocks);

  return {
    renderHook<TProps, TResult>(
      callback: (props: TProps) => TResult,
    ): RenderHookResult<TResult, TProps> {
      return renderHookWithMocks(callback, {
        mocks: {
          sources,
          mediaTransforms: defaultMediaTransformsConfig,
          apolloClient: client,
        },
      });
    },
  };
}

describe(`Given the ${usePublications.name} hook`, () => {
  const profileId = mockProfileId();
  const publications = [mockPostFragment()];
  const expectations = publications.map(({ __typename, id }) => ({ __typename, id }));

  beforeAll(() => {
    simulateNotAuthenticated();
  });

  describe('when the query returns data successfully', () => {
    const { renderHook } = setupTestScenario([
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
      const { result } = renderHook(() => usePublications({ profileId }));

      await waitFor(() => expect(result.current.loading).toBeFalsy());
      expect(result.current.data).toMatchObject(expectations);
    });
  });

  describe('when a session with an Active Profile is set', () => {
    const activeProfile = mockProfile();
    const { renderHook } = setupTestScenario([
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
      const { result } = renderHook(() => usePublications({ profileId }));

      await waitFor(() => expect(result.current.loading).toBeFalsy());
      expect(result.current.data).toMatchObject(expectations);
    });
  });

  describe('when an "observerId" is provided', () => {
    const observerId = mockProfileId();
    const { renderHook } = setupTestScenario([
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
      const { result } = renderHook(() => usePublications({ profileId, observerId }));

      await waitFor(() => expect(result.current.loading).toBeFalsy());
      expect(result.current.data).toMatchObject(expectations);
    });
  });

  describe(`when re-rendered`, () => {
    const initialPageInfo = mockPaginatedResultInfo({ prev: mockCursor() });

    const { renderHook } = setupTestScenario([
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
          observerId: null,
          cursor: initialPageInfo.prev,
          limit: 10,
          sources,
          ...mediaTransformConfigToQueryVariables(defaultMediaTransformsConfig),
        },
        publications: [mockPostFragment()],
      }),
    ]);

    it(`should return cached data and then update the 'beforeCount' if new results are available`, async () => {
      const first = renderHook(() => usePublications({ profileId }));
      await waitFor(() => expect(first.result.current.loading).toBeFalsy());

      const second = renderHook(() => usePublications({ profileId }));

      expect(second.result.current).toMatchObject({
        data: expectations,
        loading: false,
      });

      await waitFor(() => expect(second.result.current.beforeCount).toEqual(1));
    });
  });
});
