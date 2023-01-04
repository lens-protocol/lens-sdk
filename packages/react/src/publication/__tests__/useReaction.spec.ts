import { PostFragment, ReactionTypes } from '@lens-protocol/api-bindings';
import {
  createMockApolloClientWithMultipleResponses,
  mockAddReactionMutationResponse,
  mockPost,
  mockRemoveReactionMutationResponse,
} from '@lens-protocol/api-bindings/mocks';
import { ReactionType } from '@lens-protocol/domain/entities';
import { act } from '@testing-library/react';

import { renderHookWithMocks } from '../../__helpers__/testing-library';
import { useReaction } from '../useReaction';

describe(`Given the ${useReaction.name} hook`, () => {
  const mockPublication: PostFragment = mockPost();
  const profileId = mockPublication.profile.id;

  it('should provide addReaction action', async () => {
    const { result } = renderHookWithMocks(
      () =>
        useReaction({
          profileId,
        }),
      {
        mocks: {
          apolloClient: createMockApolloClientWithMultipleResponses([
            mockAddReactionMutationResponse({
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

    expect(result.current.error).toBe(null);
  });

  it('should provide removeReaction action', async () => {
    const { result } = renderHookWithMocks(
      () =>
        useReaction({
          profileId,
        }),
      {
        mocks: {
          apolloClient: createMockApolloClientWithMultipleResponses([
            mockRemoveReactionMutationResponse({
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

    expect(result.current.error).toBe(null);
  });

  it('should provide hasReaction action', async () => {
    const mockPublicationWithReaction: PostFragment = mockPost({
      reaction: ReactionTypes.Upvote,
    });

    const { result } = renderHookWithMocks(() =>
      useReaction({
        profileId,
      }),
    );

    const hasReactionResult = result.current.hasReaction({
      publication: mockPublicationWithReaction,
      reactionType: ReactionType.UPVOTE,
    });

    expect(hasReactionResult).toBe(true);
  });
});
