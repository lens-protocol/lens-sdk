import { MockedResponse } from '@apollo/client/testing';
import { ReactionTypes } from '@lens-protocol/api-bindings';
import {
  mockAddReactionResponse,
  mockLensApolloClient,
  mockRemoveReactionResponse,
  mockPostFragment,
  mockSources,
} from '@lens-protocol/api-bindings/mocks';
import { ProfileId } from '@lens-protocol/domain/entities';
import { act } from '@testing-library/react';

import { renderHookWithMocks } from '../../__helpers__/testing-library';
import { defaultMediaTransformsConfig } from '../../mediaTransforms';
import { PublicationCacheManager } from '../../transactions/adapters/PublicationCacheManager';
import { useReaction } from '../useReaction';

function setupUseReaction({
  mocks = [],
  profileId,
}: {
  profileId: ProfileId;
  mocks?: ReadonlyArray<MockedResponse<unknown>>;
}) {
  const apolloClient = mockLensApolloClient(mocks);
  return renderHookWithMocks(
    () =>
      useReaction({
        profileId: profileId,
      }),
    {
      mocks: {
        apolloClient: apolloClient,
        publicationCacheManager: new PublicationCacheManager(
          apolloClient,
          mockSources(),
          defaultMediaTransformsConfig,
        ),
      },
    },
  );
}

describe(`Given the ${useReaction.name} hook`, () => {
  describe(`when adding a reaction`, () => {
    it('should call correct mutation and resolve without errors', async () => {
      const publication = mockPostFragment();
      const profileId = publication.profile.id;

      const mocks = [
        mockAddReactionResponse({
          variables: {
            publicationId: publication.id,
            profileId,
            reaction: ReactionTypes.Upvote,
          },
        }),
      ];

      const { result } = setupUseReaction({
        mocks,
        profileId,
      });

      await act(async () => {
        await result.current.addReaction({
          publication: publication,
          reactionType: ReactionTypes.Upvote,
        });
      });

      expect(result.current.isPending).toBe(false);
    });
  });

  describe(`when removing a reaction`, () => {
    it('should call correct mutation and resolve without errors', async () => {
      const mockPublication = mockPostFragment();
      const profileId = mockPublication.profile.id;

      const mocks = [
        mockRemoveReactionResponse({
          variables: {
            publicationId: mockPublication.id,
            profileId,
            reaction: ReactionTypes.Upvote,
          },
        }),
      ];
      const { result } = setupUseReaction({ profileId, mocks });

      await act(async () => {
        await result.current.removeReaction({
          publication: mockPublication,
          reactionType: ReactionTypes.Upvote,
        });
      });

      expect(result.current.isPending).toBe(false);
    });
  });

  describe(`when checking if a profile has reacted to a given publication`, () => {
    it('should verify the provided reaction matches the reaction in the publication object', async () => {
      const mockPublicationWithReaction = mockPostFragment({
        reaction: ReactionTypes.Upvote,
      });

      const { result } = setupUseReaction({
        profileId: mockPublicationWithReaction.profile.id,
      });

      const hasReactionResult = result.current.hasReaction({
        publication: mockPublicationWithReaction,
        reactionType: ReactionTypes.Upvote,
      });

      expect(hasReactionResult).toBe(true);
    });
  });
});
