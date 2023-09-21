import {
  CommentFragment,
  MirrorFragment,
  PostFragment,
  QuoteFragment,
} from './fragments.generated';

export type AnyPublicationFragment =
  | CommentFragment
  | MirrorFragment
  | PostFragment
  | QuoteFragment;

export type PrimaryPublicationFragment = PostFragment | CommentFragment | QuoteFragment;
