import { isPrimaryPublication } from '@lens-protocol/api-bindings';
import {
  mockAddPublicationNotInterestedResponse,
  mockPostFragment,
  mockPublicationOperationsFragment,
  mockPublicationResponse,
  mockUndoPublicationNotInterestedResponse,
} from '@lens-protocol/api-bindings/mocks';
import { invariant } from '@lens-protocol/shared-kernel';
import { act, waitFor } from '@testing-library/react';

import { setupHookTestScenarioWithSession } from '../../__helpers__/setupHookTestScenarioWithSession';
import { useNotInterestedToggle } from '../useNotInterestedToggle';
import { usePublication } from '../usePublication';

describe(`Given the ${useNotInterestedToggle.name} hook`, () => {
  describe('when calling the execute method on a publication', () => {
    it('should call correct mutation', async () => {
      const publication = mockPostFragment();
      const { renderHook } = await setupHookTestScenarioWithSession([
        mockPublicationResponse({
          variables: {
            request: { forId: publication.id },
          },
          result: publication,
        }),
        mockAddPublicationNotInterestedResponse({
          request: { on: publication.id },
        }),
      ]);

      const { result: publicationResult } = renderHook(() =>
        usePublication({ forId: publication.id }),
      );
      const { result } = renderHook(() => useNotInterestedToggle());

      // put publication in cache
      await waitFor(() => expect(publicationResult.current.loading).toBeFalsy());

      invariant(publicationResult.current.data, 'publication not found');
      invariant(isPrimaryPublication(publicationResult.current.data), 'not a primary publication');

      expect(publicationResult.current.data.operations.isNotInterested).toBe(false);

      // mark as not interested
      await act(async () => {
        invariant(publicationResult.current.data, 'publication not found');
        await result.current.execute({ publication: publicationResult.current.data });
      });
      expect(result.current.loading).toBe(false);

      // check publication operations
      expect(publicationResult.current.data.operations.isNotInterested).toBe(true);
    });
  });

  describe('when calling the execute method on already not interested publication', () => {
    it('should call correct mutation', async () => {
      const operations = mockPublicationOperationsFragment({ isNotInterested: true });
      const publication = mockPostFragment({
        operations,
      });
      const { renderHook } = await setupHookTestScenarioWithSession([
        mockPublicationResponse({
          variables: {
            request: { forId: publication.id },
          },
          result: publication,
        }),
        mockUndoPublicationNotInterestedResponse({
          request: { on: publication.id },
        }),
      ]);

      const { result: publicationResult } = renderHook(() =>
        usePublication({ forId: publication.id }),
      );
      const { result } = renderHook(() => useNotInterestedToggle());

      // put publication in cache
      await waitFor(() => expect(publicationResult.current.loading).toBeFalsy());

      invariant(publicationResult.current.data, 'publication not found');
      invariant(isPrimaryPublication(publicationResult.current.data), 'not a primary publication');

      expect(publicationResult.current.data.operations.isNotInterested).toBe(true);

      // undo mark as not interested
      await act(async () => {
        invariant(publicationResult.current.data, 'publication not found');
        await result.current.execute({ publication: publicationResult.current.data });
      });
      expect(result.current.loading).toBe(false);

      // check publication operations
      expect(publicationResult.current.data.operations.isNotInterested).toBe(false);
    });
  });
});
