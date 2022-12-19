import {
  isPostPublication,
  isCommentPublication,
  isMirrorPublication,
  PostFragment,
  CommentFragment,
  MirrorFragment,
} from '@lens-protocol/api';

export * from './useComments';
export * from './usePublication';

export type { PostFragment, CommentFragment, MirrorFragment };
export { isPostPublication, isCommentPublication, isMirrorPublication };
