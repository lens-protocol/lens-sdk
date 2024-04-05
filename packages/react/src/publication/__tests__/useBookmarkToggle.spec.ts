import { isPrimaryPublication } from '@lens-protocol/api-bindings';
import {
  mockAddToMyBookmarksResponse,
  mockPostFragment,
  mockPublicationResponse,
  mockRemoveFromMyBookmarksResponse,
} from '@lens-protocol/api-bindings/mocks';
import { invariant } from '@lens-protocol/shared-kernel';
import { act, waitFor } from '@testing-library/react';

import { setupHookTestScenarioWithSession } from '../../__helpers__/setupHookTestScenarioWithSession';
import { useBookmarkToggle } from '../useBookmarkToggle';
import { usePublication } from '../usePublication';

describe(`Given the ${useBookmarkToggle.name} hook`, () => {
  const publication = mockPostFragment();

  describe('when calling the execute method', () => {
    it('should call correct mutation', async () => {
      const { renderHook } = await setupHookTestScenarioWithSession([
        mockPublicationResponse({
          variables: {
            request: { forId: publication.id },
          },
          result: publication,
        }),
        mockAddToMyBookmarksResponse({
          request: { on: publication.id },
        }),
        mockRemoveFromMyBookmarksResponse({
          request: { on: publication.id },
        }),
      ]);

      const { result: publicationResult } = renderHook(() =>
        usePublication({ forId: publication.id }),
      );
      const { result } = renderHook(() => useBookmarkToggle());

      // put publication in cache
      await waitFor(() => expect(publicationResult.current.loading).toBeFalsy());

      invariant(publicationResult.current.data, 'publication not found');
      invariant(isPrimaryPublication(publicationResult.current.data), 'not a primary publication');

      expect(publicationResult.current.data.operations.hasBookmarked).toBe(false);

      // add bookmark
      await act(async () => {
        invariant(publicationResult.current.data, 'publication not found');
        await result.current.execute({ publication: publicationResult.current.data });
      });
      expect(result.current.loading).toBe(false);

      // check publication operations
      expect(publicationResult.current.data.operations.hasBookmarked).toBe(true);

      // remove bookmark
      await act(async () => {
        invariant(publicationResult.current.data, 'publication not found');
        await result.current.execute({ publication: publicationResult.current.data });
      });
      expect(result.current.loading).toBe(false);

      // check publication operations
      expect(publicationResult.current.data.operations.hasBookmarked).toBe(false);
    });
  });
});
