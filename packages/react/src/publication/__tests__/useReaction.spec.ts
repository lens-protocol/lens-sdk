import { PostFragment, ReactionTypes } from '@lens-protocol/api-bindings';
import {
  createAddReactionMutationMockedResponse,
  createMockApolloClientWithMultipleResponses,
  createRemoveReactionMutationMockedResponse,
  mockPostFragment,
} from '@lens-protocol/api-bindings/mocks';
import { ReactionType } from '@lens-protocol/domain/entities';
import { act } from '@testing-library/react';

import { renderHookWithMocks } from '../../__helpers__/testing-library';
import { useReaction } from '../useReaction';

describe(`Given the ${useReaction.name} hook`, () => {
  describe(`when adding a reaction`, () => {
    it('should call correct mutation and resolve without errors', async () => {
      const mockPublication: PostFragment = mockPostFragment();
      const profileId = mockPublication.profile.id;

      const { result } = renderHookWithMocks(
        () =>
          useReaction({
            profileId,
          }),
        {
          mocks: {
            apolloClient: createMockApolloClientWithMultipleResponses([
              createAddReactionMutationMockedResponse({
                variables: {
                  publicationId: mockPublication.id,
                  profileId,
                  reaction: ReactionTypes.Upvote,
                },
              }),
            ]),
          },
        },
      );

      await act(async () => {
        await result.current.addReaction({
          publication: mockPublication,
          reactionType: ReactionType.UPVOTE,
        });
      });

      expect(result.current.isPending).toBe(false);
    });
  });

  describe(`when removing a reaction`, () => {
    it('should call correct mutation and resolve without errors', async () => {
      const mockPublication: PostFragment = mockPostFragment();
      const profileId = mockPublication.profile.id;

      const { result } = renderHookWithMocks(
        () =>
          useReaction({
            profileId,
          }),
        {
          mocks: {
            apolloClient: createMockApolloClientWithMultipleResponses([
              createRemoveReactionMutationMockedResponse({
                variables: {
                  publicationId: mockPublication.id,
                  profileId,
                  reaction: ReactionTypes.Upvote,
                },
              }),
            ]),
          },
        },
      );

      await act(async () => {
        await result.current.removeReaction({
          publication: mockPublication,
          reactionType: ReactionType.UPVOTE,
        });
      });

      expect(result.current.isPending).toBe(false);
    });
  });

  describe(`when checking if a profile has reacted to a given publication`, () => {
    it('should verify the provided reaction matches the reaction in the publication object', async () => {
      const mockPublicationWithReaction: PostFragment = mockPostFragment({
        reaction: ReactionTypes.Upvote,
      });

      const { result } = renderHookWithMocks(() =>
        useReaction({
          profileId: '',
        }),
      );

      const hasReactionResult = result.current.hasReaction({
        publication: mockPublicationWithReaction,
        reactionType: ReactionType.UPVOTE,
      });

      expect(hasReactionResult).toBe(true);
    });
  });
});
