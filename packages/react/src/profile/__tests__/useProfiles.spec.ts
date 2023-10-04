import { MockedResponse } from '@apollo/client/testing';
import { LimitType } from '@lens-protocol/api-bindings';
import {
  mockCursor,
  mockLensApolloClient,
  mockPaginatedResultInfo,
  mockProfileFragment,
  mockProfilesResponse,
  simulateNotAuthenticated,
} from '@lens-protocol/api-bindings/mocks';
import { mockEvmAddress } from '@lens-protocol/shared-kernel/mocks';
import { RenderHookResult, waitFor } from '@testing-library/react';

import { renderHookWithMocks } from '../../__helpers__/testing-library';
import {
  defaultMediaTransformsConfig,
  mediaTransformConfigToQueryVariables,
} from '../../mediaTransforms';
import { UseProfilesArgs, useProfiles } from '../useProfiles';

function setupTestScenario(mocks: MockedResponse[]) {
  const client = mockLensApolloClient(mocks);

  return {
    renderHook<TProps, TResult>(
      callback: (props: TProps) => TResult,
    ): RenderHookResult<TResult, TProps> {
      return renderHookWithMocks(callback, {
        mocks: {
          mediaTransforms: defaultMediaTransformsConfig,
          apolloClient: client,
        },
      });
    },
  };
}

describe(`Given the ${useProfiles.name} hook`, () => {
  const evmAddress = mockEvmAddress();
  const profiles = [mockProfileFragment()];
  const expectations = profiles.map(({ __typename, id }) => ({ __typename, id }));

  beforeAll(() => {
    simulateNotAuthenticated();
  });

  describe('when the query returns data successfully', () => {
    it('should settle with the profiles', async () => {
      const { renderHook } = setupTestScenario([
        mockProfilesResponse({
          variables: {
            where: {
              ownedBy: [evmAddress],
            },
            limit: LimitType.Ten,
            ...mediaTransformConfigToQueryVariables(defaultMediaTransformsConfig),
          },
          profiles,
        }),
      ]);

      const args: UseProfilesArgs = {
        where: { ownedBy: [evmAddress] },
      };

      const { result } = renderHook(() => useProfiles(args));

      await waitFor(() => expect(result.current.loading).toBeFalsy());
      expect(result.current.data).toMatchObject(expectations);
    });

    describe(`when re-rendered`, () => {
      const initialPageInfo = mockPaginatedResultInfo({ prev: mockCursor() });

      const { renderHook } = setupTestScenario([
        mockProfilesResponse({
          variables: {
            where: {
              ownedBy: [evmAddress],
            },
            limit: LimitType.Ten,
            ...mediaTransformConfigToQueryVariables(defaultMediaTransformsConfig),
          },
          profiles,
          info: initialPageInfo,
        }),

        mockProfilesResponse({
          variables: {
            where: {
              ownedBy: [evmAddress],
            },
            limit: LimitType.Ten,
            cursor: initialPageInfo.prev,
            ...mediaTransformConfigToQueryVariables(defaultMediaTransformsConfig),
          },
          profiles: [mockProfileFragment()],
        }),
      ]);

      it(`should return cached data and then update the 'beforeCount' if new results are available`, async () => {
        const first = renderHook(() => useProfiles({ where: { ownedBy: [evmAddress] } }));
        await waitFor(() => expect(first.result.current.loading).toBeFalsy());

        const second = renderHook(() => useProfiles({ where: { ownedBy: [evmAddress] } }));

        expect(second.result.current).toMatchObject({
          data: expectations,
          loading: false,
        });

        await waitFor(() => expect(second.result.current.beforeCount).toEqual(1));
      });
    });
  });
});
