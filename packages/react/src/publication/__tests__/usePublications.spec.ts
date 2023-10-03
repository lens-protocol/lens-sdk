import { MockedResponse } from '@apollo/client/testing';
import { LimitType, PublicationsOrderByType } from '@lens-protocol/api-bindings';
import {
  mockCursor,
  mockGetPublicationsResponse,
  mockLensApolloClient,
  mockPaginatedResultInfo,
  mockPostFragment,
  mockSources,
  simulateNotAuthenticated,
} from '@lens-protocol/api-bindings/mocks';
import { mockProfileId } from '@lens-protocol/domain/mocks';
import { RenderHookResult, waitFor } from '@testing-library/react';

import { renderHookWithMocks } from '../../__helpers__/testing-library';
import {
  defaultMediaTransformsConfig,
  mediaTransformConfigToQueryVariables,
} from '../../mediaTransforms';
import { UsePublicationsArgs, usePublications } from '../usePublications';

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
    it('should settle with the publications', async () => {
      const { renderHook } = setupTestScenario([
        mockGetPublicationsResponse({
          variables: {
            where: {
              actedBy: profileId,
            },
            orderBy: PublicationsOrderByType.Latest,
            limit: LimitType.Ten,
            ...mediaTransformConfigToQueryVariables(defaultMediaTransformsConfig),
          },
          publications,
        }),
      ]);

      const args: UsePublicationsArgs = {
        where: { actedBy: profileId },
      };

      const { result } = renderHook(() => usePublications(args));

      await waitFor(() => expect(result.current.loading).toBeFalsy());
      expect(result.current.data).toMatchObject(expectations);
    });

    describe('when limit is provided', () => {
      it('should override the default limit', async () => {
        const { renderHook } = setupTestScenario([
          mockGetPublicationsResponse({
            variables: {
              where: {
                actedBy: profileId,
              },
              orderBy: PublicationsOrderByType.Latest,
              limit: LimitType.Fifty,
              ...mediaTransformConfigToQueryVariables(defaultMediaTransformsConfig),
            },
            publications,
          }),
        ]);

        const { result } = renderHook(() =>
          usePublications({
            where: { actedBy: profileId },
            limit: LimitType.Fifty,
          }),
        );

        await waitFor(() => expect(result.current.loading).toBeFalsy());
        expect(result.current.data).toMatchObject(expectations);
      });
    });

    describe(`when re-rendered`, () => {
      const initialPageInfo = mockPaginatedResultInfo({ prev: mockCursor() });

      const { renderHook } = setupTestScenario([
        mockGetPublicationsResponse({
          variables: {
            where: {
              from: [profileId],
            },
            orderBy: PublicationsOrderByType.Latest,
            limit: LimitType.Ten,
            ...mediaTransformConfigToQueryVariables(defaultMediaTransformsConfig),
          },
          publications,
          info: initialPageInfo,
        }),

        mockGetPublicationsResponse({
          variables: {
            where: {
              from: [profileId],
            },
            orderBy: PublicationsOrderByType.Latest,
            limit: LimitType.Ten,
            cursor: initialPageInfo.prev,
            ...mediaTransformConfigToQueryVariables(defaultMediaTransformsConfig),
          },
          publications: [mockPostFragment()],
        }),
      ]);

      it(`should return cached data and then update the 'beforeCount' if new results are available`, async () => {
        const first = renderHook(() => usePublications({ where: { from: [profileId] } }));
        await waitFor(() => expect(first.result.current.loading).toBeFalsy());

        const second = renderHook(() => usePublications({ where: { from: [profileId] } }));

        expect(second.result.current).toMatchObject({
          data: expectations,
          loading: false,
        });

        await waitFor(() => expect(second.result.current.beforeCount).toEqual(1));
      });
    });
  });
});
