import { PostFragment } from '@lens-protocol/api-bindings';
import {
  createMockApolloClientWithMultipleResponses,
  mockPost,
} from '@lens-protocol/api-bindings/mocks';
import { ReactionType } from '@lens-protocol/domain/entities';
import { act, waitFor } from '@testing-library/react';

import { renderHookWithMocks } from '../../__helpers__/testing-library';
import { useReaction } from '../useReaction';

describe.skip(`Given the ${useReaction.name} hook`, () => {
  const mockPublication: PostFragment = mockPost();

  it("should return addReaction action that when triggered won't throw an error", async () => {
    const { result } = renderHookWithMocks(
      () =>
        useReaction({
          profileId: mockPublication.profile.id,
        }),
      {
        mocks: {
          apolloClient: createMockApolloClientWithMultipleResponses([]),
        },
      },
    );

    await act(async () => {
      await result.current.addReaction({
        publication: mockPublication,
        reactionType: ReactionType.UPVOTE,
      });
    });

    await waitFor(() => expect(result.current.isPending).toBeFalsy());

    // TODO fix the test
    expect(result.current.error).toBeInstanceOf(Error);
  });

  // use publication, use reaction, addReaction,
  // - check if publication has optimistic reaction,
  // - check if api call was triggered

  // the same for removeReaction

  // test for hasReaction

  // handle errors when removing non-existing reaction

  // handle api connection error ?
});
