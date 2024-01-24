import { LimitType } from '@lens-protocol/api-bindings';
import {
  mockCursor,
  mockPublicationsResponse,
  mockPaginatedResultInfo,
  mockPostFragment,
} from '@lens-protocol/api-bindings/mocks';
import { mockProfileId } from '@lens-protocol/domain/mocks';
import { waitFor } from '@testing-library/react';

import { setupHookTestScenario } from '../../__helpers__/setupHookTestScenario';
import { UsePublicationsArgs, usePublications } from '../usePublications';

describe(`Given the ${usePublications.name} hook`, () => {
  const profileId = mockProfileId();
  const publications = [mockPostFragment()];
  const expectations = publications.map(({ __typename, id }) => ({ __typename, id }));

  describe('when the query returns data successfully', () => {
    it('should settle with the publications', async () => {
      const { renderHook } = setupHookTestScenario([
        mockPublicationsResponse({
          variables: {
            where: {
              actedBy: profileId,
            },
          },
          items: publications,
        }),
      ]);

      const args: UsePublicationsArgs = {
        where: { actedBy: profileId },
      };

      const { result } = renderHook(() => usePublications(args));

      await waitFor(() => expect(result.current.loading).toBeFalsy());
      expect(result.current.data).toMatchObject(expectations);
    });
  });

  describe('when limit is provided', () => {
    it('should override the default limit', async () => {
      const { renderHook } = setupHookTestScenario([
        mockPublicationsResponse({
          variables: {
            where: {
              actedBy: profileId,
            },
            limit: LimitType.Fifty,
          },
          items: publications,
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

    const { renderHook } = setupHookTestScenario([
      mockPublicationsResponse({
        variables: {
          where: {
            from: [profileId],
          },
        },
        items: publications,
        info: initialPageInfo,
      }),

      mockPublicationsResponse({
        variables: {
          where: {
            from: [profileId],
          },
          cursor: initialPageInfo.prev,
        },
        items: [mockPostFragment()],
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
