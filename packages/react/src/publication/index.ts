import {
  CommentFragment,
  CommentWithFirstCommentFragment,
  isCommentPublication,
  isMirrorPublication,
  isPostPublication,
  MirrorFragment,
  PublicationSortCriteria,
  PublicationTypes,
  PendingPostFragment,
  PostFragment,
} from '@lens-protocol/api-bindings';

export * from './useComments';
export * from './usePublication';
export * from './usePublications';
export * from './useExplorePublications';

export type { Publication } from './types';
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
