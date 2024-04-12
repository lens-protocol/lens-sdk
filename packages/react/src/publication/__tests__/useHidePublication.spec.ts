import {
  mockHidePublicationResponse,
  mockPostFragment,
  mockPublicationResponse,
} from '@lens-protocol/api-bindings/mocks';
import { invariant } from '@lens-protocol/shared-kernel';
import { act, waitFor } from '@testing-library/react';

import { setupHookTestScenarioWithSession } from '../../__helpers__/setupHookTestScenarioWithSession';
import { useHidePublication } from '../useHidePublication';
import { usePublication } from '../usePublication';

describe(`Given the ${useHidePublication.name} hook`, () => {
  describe('when calling the execute method on a publication', () => {
    it('should set its `isHidden` flag', async () => {
      const publication = mockPostFragment();
      const { renderHook } = await setupHookTestScenarioWithSession(
        [
          mockPublicationResponse({
            variables: {
              request: { forId: publication.id },
            },
            result: publication,
          }),
          mockHidePublicationResponse({
            request: {
              for: publication.id,
            },
          }),
        ],
        publication.by,
      );

      const { result } = renderHook(() => ({
        publication: usePublication({ forId: publication.id }),
        toggle: useHidePublication(),
      }));

      // wait for publication to be fetched
      await waitFor(() => expect(result.current.publication.loading).toBeFalsy());

      invariant(result.current.publication.data, 'Not a primary publication');

      expect(result.current.publication.data.isHidden).toBe(false);

      // mark as not interested
      act(() => {
        void result.current.toggle.execute({ publication });
      });
      await waitFor(() => expect(result.current.toggle.loading).toBeFalsy());

      // check publication operations
      expect(result.current.publication.data.isHidden).toBe(true);
    });
  });
});
