import {
  mockCursor,
  mockPaginatedResultInfo,
  mockProfileFragment,
  mockProfilesResponse,
} from '@lens-protocol/api-bindings/mocks';
import { mockEvmAddress } from '@lens-protocol/shared-kernel/mocks';
import { waitFor } from '@testing-library/react';

import { setupHookTestScenario } from '../../__helpers__/setupHookTestScenario';
import { UseProfilesArgs, useProfiles } from '../useProfiles';

describe(`Given the ${useProfiles.name} hook`, () => {
  const evmAddress = mockEvmAddress();
  const profiles = [mockProfileFragment()];
  const expectations = profiles.map(({ __typename, id }) => ({ __typename, id }));

  describe('when the query returns data successfully', () => {
    it('should settle with the profiles', async () => {
      const { renderHook } = setupHookTestScenario([
        mockProfilesResponse({
          variables: {
            where: {
              ownedBy: [evmAddress],
            },
          },
          items: profiles,
        }),
      ]);

      const args: UseProfilesArgs = {
        where: { ownedBy: [evmAddress] },
      };

      const { result } = renderHook(() => useProfiles(args));

      await waitFor(() => expect(result.current.loading).toBeFalsy());
      expect(result.current.data).toMatchObject(expectations);
    });
  });

  describe(`when re-rendered`, () => {
    const initialPageInfo = mockPaginatedResultInfo({ prev: mockCursor() });

    const { renderHook } = setupHookTestScenario([
      mockProfilesResponse({
        variables: {
          where: {
            ownedBy: [evmAddress],
          },
        },
        items: profiles,
        info: initialPageInfo,
      }),

      mockProfilesResponse({
        variables: {
          where: {
            ownedBy: [evmAddress],
          },
          cursor: initialPageInfo.prev,
        },
        items: [mockProfileFragment()],
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
