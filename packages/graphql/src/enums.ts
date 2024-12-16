/**
 * Enum for the different authentication roles a user can have.
 */
export enum Role {
  AccountOwner = 'ACCOUNT_OWNER',
  AccountManager = 'ACCOUNT_MANAGER',
  OnboardingUser = 'ONBOARDING_USER',
  Builder = 'BUILDER',
}

/**
 * Enum for the different page sizes available.
 */
export enum PageSize {
  Ten = 'TEN',
  Fifty = 'FIFTY',
}

/**
 * Enum for the different reasons to report an account.
 */
export enum AccountReportReason {
  Impersonation = 'IMPERSONATION',
  RepetitiveSpam = 'REPETITIVE_SPAM',
  Other = 'OTHER',
}

/**
 * Enum for the different type of Post Actions.
 */
export enum PostActionType {
  SimpleCollectAction = 'SIMPLE_COLLECT_ACTION',
  UnknownAction = 'UNKNOWN_ACTION',
}

/**
 * Enum for the different types of reactions a user can have on a post.
 */
export enum PostReactionType {
  Upvote = 'UPVOTE',
  Downvote = 'DOWNVOTE',
}

/**
 * Enum for the different content warnings.
 */
export enum ContentWarning {
  Nsfw = 'NSFW',
  Sensitive = 'SENSITIVE',
  Spoiler = 'SPOILER',
}

/**
 * Enum for the different types of references a post can have.
 */
export enum PostReferenceType {
  CommentOn = 'COMMENT_ON',
  RepostOf = 'REPOST_OF',
  QuoteOf = 'QUOTE_OF',
}

/**
 * Enum for the different order by options for who referenced on a post.
 */
export enum WhoReferencedPostOrderBy {
  MostRecent = 'MOST_RECENT',
  Oldest = 'OLDEST',
  AccountScore = 'ACCOUNT_SCORE',
}
