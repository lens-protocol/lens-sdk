import { mockPostFragment, mockProfileBookmarksResponse } from '@lens-protocol/api-bindings/mocks';
import { waitFor } from '@testing-library/react';

import { setupHookTestScenario } from '../../__helpers__/setupHookTestScenario';
import { useBookmarks } from '../useBookmarks';

describe(`Given the ${useBookmarks.name} hook`, () => {
  const publications = [mockPostFragment()];
  const expectations = publications.map(({ __typename, id }) => ({ __typename, id }));

  describe('when a profile is provided', () => {
    it('should settle with the bookmarked publications', async () => {
      const { renderHook } = setupHookTestScenario([
        mockProfileBookmarksResponse({
          variables: {
            request: {},
          },
          items: publications,
        }),
      ]);

      const { result } = renderHook(() => useBookmarks());

      await waitFor(() => expect(result.current.loading).toBeFalsy());
      expect(result.current.data).toMatchObject(expectations);
    });
  });
});
