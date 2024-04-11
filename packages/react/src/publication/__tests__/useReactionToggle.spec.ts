import { PublicationReactionType, isPrimaryPublication } from '@lens-protocol/api-bindings';
import {
  mockAddReactionResponse,
  mockPostFragment,
  mockPublicationResponse,
  mockRemoveReactionResponse,
} from '@lens-protocol/api-bindings/mocks';
import { invariant } from '@lens-protocol/shared-kernel';
import { act, waitFor } from '@testing-library/react';

import { setupHookTestScenarioWithSession } from '../../__helpers__/setupHookTestScenarioWithSession';
import { usePublication } from '../usePublication';
import { useReactionToggle } from '../useReactionToggle';

describe(`Given the ${useReactionToggle.name} hook`, () => {
  const publication = mockPostFragment();

  describe('when calling the execute method on a publication', () => {
    it('should update the publication `stats` and `operations` as expected', async () => {
      const { renderHook } = await setupHookTestScenarioWithSession([
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
        mockRemoveReactionResponse({
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
      const { result } = renderHook(() => useReactionToggle());

      // put publication in cache
      await waitFor(() => expect(publicationResult.current.loading).toBeFalsy());

      invariant(publicationResult.current.data, 'publication not found');
      invariant(isPrimaryPublication(publicationResult.current.data), 'not a primary publication');

      expect(publicationResult.current.data.operations.hasUpvoted).toBe(false);
      const upvotes = publicationResult.current.data.stats.upvotes;

      // add reaction
      await act(async () => {
        invariant(publicationResult.current.data, 'publication not found');
        invariant(
          isPrimaryPublication(publicationResult.current.data),
          'not a primary publication',
        );

        await result.current.execute({
          reaction: PublicationReactionType.Upvote,
          publication: publicationResult.current.data,
        });
      });

      expect(result.current.loading).toBe(false);

      // check publication stats and operations
      expect(publicationResult.current.data.operations.hasUpvoted).toBe(true);
      expect(publicationResult.current.data.stats.upvotes).toEqual(upvotes + 1);

      // remove reaction
      await act(async () => {
        invariant(publicationResult.current.data, 'publication not found');
        invariant(
          isPrimaryPublication(publicationResult.current.data),
          'not a primary publication',
        );

        await result.current.execute({
          reaction: PublicationReactionType.Upvote,
          publication: publicationResult.current.data,
        });
      });

      expect(result.current.loading).toBe(false);

      // check publication stats and operations
      expect(publicationResult.current.data.operations.hasUpvoted).toBe(false);
      expect(publicationResult.current.data.stats.upvotes).toEqual(upvotes);
    });
  });
});
