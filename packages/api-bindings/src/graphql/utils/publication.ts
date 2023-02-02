import { ReactionType } from '@lens-protocol/domain/entities';
import { never, Overwrite } from '@lens-protocol/shared-kernel';

import {
  CommentFragment,
  MirrorFragment,
  PostFragment,
  ProfileFragment,
  ReactionTypes,
} from '../generated';
import { Typename, PickByTypename } from './types';

export const isPostPublication = <T extends Typename<string>>(
  publication: T,
): publication is PickByTypename<T, 'Post'> => {
  return publication.__typename === 'Post';
};

export const isCommentPublication = <T extends Typename<string>>(
  publication: T,
): publication is PickByTypename<T, 'Comment'> => {
  return publication.__typename === 'Comment';
};

export const isMirrorPublication = <T extends Typename<string>>(
  publication: T,
): publication is PickByTypename<T, 'Mirror'> => {
  return publication.__typename === 'Mirror';
};

export const getDomainReactionType = (reaction: ReactionTypes): ReactionType => {
  switch (reaction) {
    case ReactionTypes.Upvote:
      return ReactionType.UPVOTE;
    case ReactionTypes.Downvote:
      return ReactionType.DOWNVOTE;
    default:
      never("Can't infer reaction type");
  }
};

export const getApiReactionType = (reaction: ReactionType): ReactionTypes => {
  switch (reaction) {
    case ReactionType.UPVOTE:
      return ReactionTypes.Upvote;
    case ReactionType.DOWNVOTE:
      return ReactionTypes.Downvote;
    default:
      never("Can't infer reaction type");
  }
};

export type PublicationFragment = PostFragment | CommentFragment | MirrorFragment;

export type PublicationOwnedByMeFragment = Overwrite<
  PublicationFragment,
  { profile: Overwrite<ProfileFragment, { ownedByMe: true }> }
>;

export const isPublicationOwnedByMe = (
  publication: PublicationFragment,
): publication is PublicationOwnedByMeFragment => {
  return publication.profile.ownedByMe;
};
