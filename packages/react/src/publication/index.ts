import {
  CommentFragment,
  CommentWithFirstCommentFragment,
  isCommentPublication,
  isMirrorPublication,
  isPostPublication,
  MirrorFragment,
  PublicationSortCriteria,
  PublicationTypes,
} from '@lens-protocol/api-bindings';
  PendingPostFragment,
  PostFragment,
} from '@lens-protocol/api';

export * from './useComments';
export * from './usePublication';
export * from './usePublications';
export * from './useExplorePublications';

export type { Publication } from './types';
export type { PostFragment, CommentFragment, MirrorFragment, CommentWithFirstCommentFragment };
export {
  isPostPublication,
  isCommentPublication,
  isMirrorPublication,
  PublicationSortCriteria,
  PublicationTypes,
};
export type {
  CommentFragment,
  CommentWithFirstCommentFragment,
  MirrorFragment,
  PendingPostFragment,
  PostFragment,
};
export { isPostPublication, isCommentPublication, isMirrorPublication };
