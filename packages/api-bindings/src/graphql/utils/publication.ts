import { PublicationType, ReactionType } from '@lens-protocol/domain/entities';
import { never, Overwrite } from '@lens-protocol/shared-kernel';

import {
  Comment,
  CommentFragment,
  Mirror,
  MirrorFragment,
  Post,
  PostFragment,
  ReactionTypes,
} from '../generated';
import { Typename, PickByTypename, JustTypename } from './types';

type PublicationTypename = JustTypename<Mirror> | JustTypename<Comment> | JustTypename<Post>;

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

export const getPublicationType = <T extends PublicationTypename>(
  publication: T,
): PublicationType => {
  switch (publication.__typename) {
    case 'Mirror':
      return PublicationType.MIRROR;
    case 'Comment':
      return PublicationType.COMMENT;
    case 'Post':
      return PublicationType.POST;

    default:
      never("Can't infer publication type");
  }
};

export const getPublicationTypename = <T extends PublicationType>(
  publication: T,
): PublicationTypename['__typename'] => {
  switch (publication) {
    case PublicationType.MIRROR:
      return 'Mirror';
    case PublicationType.POST:
      return 'Post';
    case PublicationType.COMMENT:
      return 'Comment';
    default:
      never("Can't infer publication typename");
  }
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

export type PublicationOwnedByMeFragment = Overwrite<PublicationFragment, { ownedByMe: true }>;

export const isPublicationOwnedByMe = (
  publication: PublicationFragment,
): publication is PublicationOwnedByMeFragment => {
  return publication.ownedByMe;
};
