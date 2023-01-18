export type PublicationId = string;

/**
 * @deprecated
 * Was added to make cache update inside `infrastracture` layer easier
 * With the new `PublicationCacheManager` no longer required
 */
export enum PublicationType {
  MIRROR = 'mirror',
  POST = 'post',
  COMMENT = 'comment',
}

export enum ReactionType {
  UPVOTE = 'upvote',
  DOWNVOTE = 'downvote',
}
