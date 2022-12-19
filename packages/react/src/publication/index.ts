import {
  isPostPublication,
  isCommentPublication,
  isMirrorPublication,
  PostFragment,
  CommentFragment,
  CommentWithFirstCommentFragment,
  MirrorFragment,
} from '@lens-protocol/api';

export * from './useComments';
export * from './usePublication';

export type { PostFragment, CommentFragment, MirrorFragment, CommentWithFirstCommentFragment };
export { isPostPublication, isCommentPublication, isMirrorPublication };
