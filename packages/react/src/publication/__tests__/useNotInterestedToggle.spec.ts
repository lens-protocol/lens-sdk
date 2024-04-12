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
    it('should set its `operations.isNotInterested` flag', async () => {
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

      const { result } = renderHook(() => ({
        publication: usePublication({ forId: publication.id }),
        toggle: useNotInterestedToggle(),
      }));

      // wait for publication to be fetched
      await waitFor(() => expect(result.current.publication.loading).toBeFalsy());

      invariant(
        result.current.publication.data && isPrimaryPublication(result.current.publication.data),
        'Not a primary publication',
      );

      expect(result.current.publication.data.operations.isNotInterested).toBe(false);

      // mark as not interested
      act(() => {
        void result.current.toggle.execute({ publication });
      });
      await waitFor(() => expect(result.current.toggle.loading).toBeFalsy());

      // check publication operations
      expect(result.current.publication.data.operations.isNotInterested).toBe(true);
    });

    it('should undo previously flagged publications', async () => {
      const publication = mockPostFragment({
        operations: mockPublicationOperationsFragment({ isNotInterested: true }),
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

      const { result } = renderHook(() => ({
        publication: usePublication({ forId: publication.id }),
        toggle: useNotInterestedToggle(),
      }));

      // wait for publication to be fetched
      await waitFor(() => expect(result.current.publication.loading).toBeFalsy());

      invariant(
        result.current.publication.data && isPrimaryPublication(result.current.publication.data),
        'Not a primary publication',
      );

      expect(result.current.publication.data?.operations.isNotInterested).toBe(true);

      // undo mark as not interested
      act(() => {
        void result.current.toggle.execute({ publication });
      });
      await waitFor(() => expect(result.current.toggle.loading).toBeFalsy());

      // check publication operations
      expect(result.current.publication.data.operations.isNotInterested).toBe(false);
    });
  });
});
