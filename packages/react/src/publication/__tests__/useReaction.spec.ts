import { faker } from '@faker-js/faker';
import { PostFragment } from '@lens-protocol/api-bindings';
import {
  createMockApolloClientWithMultipleResponses,
  mockPost,
} from '@lens-protocol/api-bindings/mocks';
import { ReactionType } from '@lens-protocol/domain/entities';
import { NetworkError } from '@lens-protocol/domain/use-cases/publications';
import { act, waitFor } from '@testing-library/react';

import { renderHookWithMocks } from '../../__helpers__/testing-library';
import { useReaction } from '../useReaction';

describe(`Given the ${useReaction.name} hook`, () => {
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
        publicationId: faker.datatype.uuid(),
        reactionType: ReactionType.UPVOTE,
      });
    });

    await waitFor(() => expect(result.current.isPending).toBeFalsy());

    // TODO fix the test
    expect(result.current.error).toBeInstanceOf(NetworkError);
  });
});
