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
 * Enum for the different type of Post Actions.
 */
export enum PostActionType {
  SimpleCollectAction = 'SIMPLE_COLLECT_ACTION',
  UnknownAction = 'UNKNOWN_ACTION',
}

/**
 * Enum for the different order by options for who referenced on a post.
 */
export enum WhoReferencedPostOrderBy {
  MostRecent = 'MOST_RECENT',
  Oldest = 'OLDEST',
  AccountScore = 'ACCOUNT_SCORE',
}

/**
 * Enum for the comparison operator to use in access conditions.
 */
export enum AccessConditionComparison {
  Equal = 'EQUAL',
  NotEqual = 'NOT_EQUAL',
  GreaterThan = 'GREATER_THAN',
  GreaterThanOrEqual = 'GREATER_THAN_OR_EQUAL',
  LessThan = 'LESS_THAN',
  LessThanOrEqual = 'LESS_THAN_OR_EQUAL',
}

/**
 * Enum for the reasons to report an account.
 */
export enum AccountReportReason {
  Impersonation = 'IMPERSONATION',
  RepetitiveSpam = 'REPETITIVE_SPAM',
  Other = 'OTHER',
}

/**
 * Enum for the order by options in account search.
 */
export enum AccountSearchOrderBy {
  Default = 'DEFAULT',
  AccountScore = 'ACCOUNT_SCORE',
}

/**
 * Enum for the platforms supported by the app.
 */
export enum AppMetadataLensPlatformsItem {
  Web = 'WEB',
  Ios = 'IOS',
  Android = 'ANDROID',
}

/**
 * Enum for the order by options for apps.
 */
export enum AppsOrderBy {
  Alphabetical = 'ALPHABETICAL',
  LatestFirst = 'LATEST_FIRST',
  OldestFirst = 'OLDEST_FIRST',
}

/**
 * Enum for the different types of followers order by options.
 */
export enum FollowersOrderBy {
  MostRecent = 'MOST_RECENT',
  Oldest = 'OLDEST',
}

/**
 * Enum for the different types of followers you know order by options.
 */
export enum FollowersYouKnowOrderBy {
  MostRecent = 'MOST_RECENT',
  Oldest = 'OLDEST',
}

/**
 * Enum for the different types of following order by options.
 */
export enum FollowingOrderBy {
  MostRecent = 'MOST_RECENT',
  Oldest = 'OLDEST',
}

/**
 * Enum for the different sources for "For You" feed.
 */
export enum ForYouSource {
  Recommended = 'RECOMMENDED',
  Trending = 'TRENDING',
}

/**
 * Enum for the different types of graphs order by options.
 */
export enum GraphsOrderBy {
  MostRecent = 'MOST_RECENT',
  Oldest = 'OLDEST',
}

/**
 * Enum for the different types of groups order by options.
 */
export enum GroupsOrderBy {
  MostRecent = 'MOST_RECENT',
  Oldest = 'OLDEST',
}

/**
 * Enum for the different types of main content focus.
 */
export enum MainContentFocus {
  Article = 'ARTICLE',
  Video = 'VIDEO',
  Image = 'IMAGE',
}

/**
 * Enum for the different types of managed accounts visibility.
 */
export enum ManagedAccountsVisibility {
  Public = 'PUBLIC',
  Private = 'PRIVATE',
}

/**
 * Enum for the different types of media audio kind.
 */
export enum MediaAudioKind {
  Podcast = 'PODCAST',
  Music = 'MUSIC',
}

/**
 * Enum for the different types of media audio.
 */
export enum MediaAudioType {
  AudioWav = 'AUDIO_WAV',
  AudioVndWave = 'AUDIO_VND_WAVE',
  AudioMpeg = 'AUDIO_MPEG',
  AudioOgg = 'AUDIO_OGG',
  AudioMp4 = 'AUDIO_MP_4',
  AudioAac = 'AUDIO_AAC',
  AudioWebm = 'AUDIO_WEBM',
  AudioFlac = 'AUDIO_FLAC',
}

/**
 * Enum for the different types of media image.
 */
export enum MediaImageType {
  Jpeg = 'JPEG',
  Png = 'PNG',
}

/**
 * Enum for the different types of media video.
 */
export enum MediaVideoType {
  Mp4 = 'MP4',
  Avi = 'AVI',
}

/**
 * Enum for the different types of metadata attribute.
 */
export enum MetadataAttributeType {
  String = 'STRING',
  Number = 'NUMBER',
}

/**
 * Enum for the different types of metadata license.
 */
export enum MetadataLicenseType {
  CcBy = 'CC_BY',
  CcBySa = 'CC_BY_SA',
}

/**
 * Enum for the different types of notification order by options.
 */
export enum NotificationOrderBy {
  MostRecent = 'MOST_RECENT',
  Oldest = 'OLDEST',
}

/**
 * Enum for the different types of notifications.
 */
export enum NotificationType {
  Mention = 'MENTION',
  Comment = 'COMMENT',
}

/**
 * Enum for the different types of page size.
 */
export enum PageSize {
  Small = 'SMALL',
  Medium = 'MEDIUM',
  Large = 'LARGE',
}

/**
 * Enum for the different types of post action categories.
 */
export enum PostActionCategoryType {
  Like = 'LIKE',
  Share = 'SHARE',
}

/**
 * Enum for the different types of post reaction order by options.
 */
export enum PostReactionOrderBy {
  MostRecent = 'MOST_RECENT',
  Oldest = 'OLDEST',
}

/**
 * Enum for the different types of post report reasons.
 */
export enum PostReportReason {
  Spam = 'SPAM',
  Inappropriate = 'INAPPROPRIATE',
}

/**
 * Enum for the different types of post tags order by options.
 */
export enum PostTagsOrderBy {
  MostRecent = 'MOST_RECENT',
  Oldest = 'OLDEST',
}

/**
 * Enum for the different types of posts.
 */
export enum PostType {
  Original = 'ORIGINAL',
  Repost = 'REPOST',
}

/**
 * Enum for the different types of post visibility filters.
 */
export enum PostVisibilityFilter {
  Public = 'PUBLIC',
  Private = 'PRIVATE',
}

/**
 * Enum for the different types of self-funded fallback reasons.
 */
export enum SelfFundedFallbackReason {
  InsufficientFunds = 'INSUFFICIENT_FUNDS',
  NetworkError = 'NETWORK_ERROR',
}

/**
 * Enum for the different types of sponsor limit.
 */
export enum SponsorLimitType {
  Daily = 'DAILY',
  Monthly = 'MONTHLY',
}

/**
 * Enum for the different types of sponsored fallback reasons.
 */
export enum SponsoredFallbackReason {
  NoSponsor = 'NO_SPONSOR',
  SponsorDeclined = 'SPONSOR_DECLINED',
}

/**
 * Enum for the different types of token standards.
 */
export enum TokenStandard {
  Erc20 = 'ERC20',
  Erc721 = 'ERC721',
}

/**
 * Enum for the different types of transactions.
 */
export enum TransactionType {
  Transfer = 'TRANSFER',
  Approval = 'APPROVAL',
}

/**
 * Enum for the different types of tri-state values.
 */
export enum TriStateValue {
  Yes = 'YES',
  No = 'NO',
  Maybe = 'MAYBE',
}

/**
 * Enum for the different types of unblock error.
 */
export enum UnblockErrorType {
  NotBlocked = 'NOT_BLOCKED',
  AlreadyUnblocked = 'ALREADY_UNBLOCKED',
}

/**
 * Enum for the different types of who acted on post order by options.
 */
export enum WhoActedOnPostOrderBy {
  MostRecent = 'MOST_RECENT',
  Oldest = 'OLDEST',
}

/**
 * Enum for the different authentication roles a user can have.
 */
export enum Role {
  Admin = 'ADMIN',
  User = 'USER',
}

/**
 * Enum for the different type of Post Actions.
 */
export enum PostActionType {
  Like = 'LIKE',
  Share = 'SHARE',
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
