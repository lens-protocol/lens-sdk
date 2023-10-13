import { PublicationReactionType, isPrimaryPublication } from '@lens-protocol/api-bindings';
import {
  mockAddReactionResponse,
  mockPostFragment,
  mockPublicationResponse,
} from '@lens-protocol/api-bindings/mocks';
import { invariant } from '@lens-protocol/shared-kernel';
import { act, waitFor } from '@testing-library/react';

import { setupHookTestScenario } from '../../__helpers__/setupHookTestScenario';
import { usePublication } from '../usePublication';
import { UseReactionToggleArgs, useReactionToggle } from '../useReactionToggle';

describe(`Given the ${useReactionToggle.name} hook`, () => {
  const publication = mockPostFragment();

  describe('when calling the execute method', () => {
    it('should call correct mutation', async () => {
      const args: UseReactionToggleArgs = {
        publication,
      };

      const { renderHook } = setupHookTestScenario([
        mockPublicationResponse({
          variables: {
            request: { forId: publication.id },
          },
          result: publication,
        }),
        mockAddReactionResponse({
          variables: {
            request: {
              for: publication.id,
              reaction: PublicationReactionType.Upvote,
            },
          },
        }),
      ]);

      const { result: publicationResult } = renderHook(() =>
        usePublication({ forId: publication.id }),
      );
      const { result } = renderHook(() => useReactionToggle(args));

      // put publication in cache
      await waitFor(() => expect(publicationResult.current.loading).toBeFalsy());

      invariant(publicationResult.current.data, 'publication not found');
      invariant(isPrimaryPublication(publicationResult.current.data), 'not a primary publication');

      expect(publicationResult.current.data.operations.hasUpvoted).toBe(false);
      const upvotes = publicationResult.current.data.stats.upvotes;

      // add reaction
      await act(async () => {
        await result.current.execute({
          reaction: PublicationReactionType.Upvote,
        });
      });

      expect(result.current.loading).toBe(false);

      // check publication stats and operations
      expect(publicationResult.current.data.operations.hasUpvoted).toBe(true);
      expect(publicationResult.current.data.stats.upvotes).toEqual(upvotes + 1);
    });
  });
});
