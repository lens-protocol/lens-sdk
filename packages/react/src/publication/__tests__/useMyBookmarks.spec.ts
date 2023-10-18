import { SafeApolloClient } from '@lens-protocol/api-bindings';
import {
  mockLensApolloClient,
  mockPostFragment,
  mockProfileBookmarksResponse,
} from '@lens-protocol/api-bindings/mocks';
import { RenderHookResult, waitFor } from '@testing-library/react';

import { renderHookWithMocks } from '../../__helpers__/testing-library';
import { useMyBookmarks } from '../useMyBookmarks';

function setupTestScenario({ client }: { client: SafeApolloClient }) {
  return {
    renderHook<TProps, TResult>(
      callback: (props: TProps) => TResult,
    ): RenderHookResult<TResult, TProps> {
      return renderHookWithMocks(callback, {
        mocks: {
          apolloClient: client,
        },
      });
    },
  };
}

describe(`Given the ${useMyBookmarks.name} hook`, () => {
  const publications = [mockPostFragment()];
  const expectations = publications.map(({ __typename, id }) => ({ __typename, id }));

  describe('when a profile is provided', () => {
    const client = mockLensApolloClient([
      mockProfileBookmarksResponse({
        variables: {
          request: {},
        },
        items: publications,
      }),
    ]);

    it('should settle with the bookmarked publications', async () => {
      const { renderHook } = setupTestScenario({ client });

      const { result } = renderHook(() => useMyBookmarks());

      await waitFor(() => expect(result.current.loading).toBeFalsy());
      expect(result.current.data).toMatchObject(expectations);
    });
  });
});
