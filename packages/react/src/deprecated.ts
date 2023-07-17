import {
  AnyPublication,
  Attribute,
  Comment,
  ContentPublication,
  EnabledModule,
  EnabledModules,
  FeeFollowModuleSettings,
  Follower,
  Following,
  Media,
  MetadataAttributeOutput,
  MetadataOutput,
  Mirror,
  ModuleInfo,
  NewCollectNotification,
  NewCommentNotification,
  NewFollowerNotification,
  NewMentionNotification,
  NewMirrorNotification,
  NewReactionNotification,
  NftImage,
  PendingPost,
  Post,
  Profile,
  ProfileAttributeReader,
  ProfileAttributes,
  ProfileFollowModuleSettings,
  ProfileOwnedByMe,
  ProfileStats,
  PublicationOwnedByMe,
  PublicationRevenue,
  PublicationStats,
  RevenueAggregate,
  RevertFollowModuleSettings,
  TransactionState,
  UnknownFollowModuleSettings,
  WhoReactedResult,
} from '@lens-protocol/api-bindings';
import { AnyTransactionRequest } from '@lens-protocol/domain/use-cases/transactions';
import { LoginError } from '@lens-protocol/domain/use-cases/wallets';

/**
 * @deprecated Use {@link EnabledModules} instead.
 */
export type EnabledModulesFragment = EnabledModules;

/**
 * @deprecated Use {@link EnabledModule} instead.
 */
export type EnabledModuleFragment = EnabledModule;

/**
 * @deprecated Use {@link ModuleInfo} instead.
 */
export type ModuleInfoFragment = ModuleInfo;

/**
 * @deprecated This is not exposed by any hook so you should not need it.
 */
export type PaginatedResultInfo = {
  __typename: 'PaginatedResultInfo';
  prev: string | null;
  next: string | null;
  totalCount: number | null;
};

/**
 * @deprecated Use {@link PaginatedResultInfo} instead.
 */
export type CommonPaginatedResultInfoFragment = PaginatedResultInfo;

/**
 * @deprecated Use {@link PaginatedResultInfo} instead.
 */
export type CommonPaginatedResultInfo = PaginatedResultInfo;

/**
 * @deprecated Use {@link NewCollectNotification} instead.
 */
export type NewCollectNotificationFragment = NewCollectNotification;

/**
 * @deprecated Use {@link NewCommentNotification} instead.
 */
export type NewCommentNotificationFragment = NewCommentNotification;

/**
 * @deprecated Use {@link NewFollowerNotification} instead.
 */
export type NewFollowerNotificationFragment = NewFollowerNotification;

/**
 * @deprecated Use {@link NewMentionNotification} instead.
 */
export type NewMentionNotificationFragment = NewMentionNotification;

/**
 * @deprecated Use {@link NewMirrorNotification} instead.
 */
export type NewMirrorNotificationFragment = NewMirrorNotification;

/**
 * @deprecated Use {@link NewReactionNotification} instead.
 */
export type NewReactionNotificationFragment = NewReactionNotification;

/**
 * @deprecated Use {@link Attribute} instead.
 */
export type AttributeFragment = Attribute;

/**
 * @deprecated Use {@link Follower} instead.
 */
export type FollowerFragment = Follower;

/**
 * @deprecated Use {@link Following} instead.
 */
export type FollowingFragment = Following;

/**
 * @deprecated Use {@link ProfileAttributeReader} instead.
 */
export type ProfileAttributeReaderFragment = ProfileAttributeReader;

/**
 * @deprecated Use {@link ProfileAttributes} instead.
 */
export type ProfileAttributesFragment = ProfileAttributes;

/**
 * @deprecated Use {@link Profile} instead.
 */
export type ProfileFragment = Profile;

/**
 * @deprecated Use {@link ProfileOwnedByMe} instead.
 */
export type ProfileOwnedByMeFragment = ProfileOwnedByMe;

/**
 * @deprecated Use {@link ProfileStats} instead.
 */
export type ProfileStatsFragment = ProfileStats;

/**
 * @deprecated Use {@link FeeFollowModuleSettings} instead.
 */
export type FeeFollowModuleSettingsFragment = FeeFollowModuleSettings;

/**
 * @deprecated Use {@link ProfileFollowModuleSettings} instead.
 */
export type ProfileFollowModuleSettingsFragment = ProfileFollowModuleSettings;

/**
 * @deprecated Use {@link RevertFollowModuleSettings} instead.
 */
export type RevertFollowModuleSettingsFragment = RevertFollowModuleSettings;

/**
 * @deprecated Use {@link UnknownFollowModuleSettings} instead.
 */
export type UnknownFollowModuleSettingsFragment = UnknownFollowModuleSettings;

/**
 * @deprecated Use {@link AnyPublication} instead.
 */
export type AnyPublicationFragment = AnyPublication;

/**
 * @deprecated Use {@link Comment} instead.
 */
export type CommentFragment = Comment;

/**
 * @deprecated Use {@link Comment} instead.
 */
export type CommentWithFirstCommentFragment = Comment;

/**
 * @deprecated Use {@link Comment} instead.
 */
export type CommentWithFirstComment = Comment;

/**
 * @deprecated Use {@link ContentPublication} instead.
 */
export type ContentPublicationFragment = ContentPublication;

/**
 * @deprecated Use {@link Media} instead.
 */
export type MediaFragment = Media;

/**
 * @deprecated Use {@link MediaSet} instead.
 */
export type MediaSetFragment = MediaSet;

/**
 * @deprecated Use {@link MetadataAttributeOutput} instead.
 */
export type MetadataAttributeOutputFragment = MetadataAttributeOutput;

/**
 * @deprecated Use {@link MetadataOutput} instead.
 */
export type MetadataOutputFragment = MetadataOutput;

/**
 * @deprecated Use {@link Mirror} instead.
 */
export type MirrorFragment = Mirror;

/**
 * @deprecated Use {@link PendingPost} instead.
 */
export type PendingPostFragment = PendingPost;

/**
 * @deprecated Use {@link Post} instead.
 */
export type PostFragment = Post;

/**
 * @deprecated Use {@link PublicationOwnedByMe} instead.
 */
export type PublicationOwnedByMeFragment = PublicationOwnedByMe;

/**
 * @deprecated Use {@link PublicationStats} instead.
 */
export type PublicationStatsFragment = PublicationStats;

/**
 * @deprecated Use {@link RevenueAggregate} instead.
 */
export type RevenueAggregateFragment = RevenueAggregate;

/**
 * @deprecated Use {@link WhoReactedResult} instead.
 */
export type WhoReactedResultFragment = WhoReactedResult;

/**
 * @deprecated Use {@link PublicationRevenue} instead.
 */
export type PublicationRevenueFragment = PublicationRevenue;

/**
 * @deprecated Use {@link TransactionState} instead.
 */
export type BroadcastedTransactionData<T extends SupportedTransactionRequest> = TransactionState<T>;

/**
 * @deprecated Use {@link TransactionState} instead.
 */
export type PendingTransactionData<T extends SupportedTransactionRequest> = TransactionState<T>;

/**
 * @deprecated Use {@link AnyTransactionRequest} instead.
 */
export type TransactionRequestModel = AnyTransactionRequest;

/**
 * @deprecated Use {@link AnyTransactionRequest} instead.
 */
export type SupportedTransactionRequest = AnyTransactionRequest;

/**
 * @deprecated Use {@link LoginError} instead.
 */
export type WalletLoginPotentialErrors = LoginError;

/**
 * @deprecated Use {@link ProfilePictureMedia} or {@link ProfileCoverMedia} instead.
 */
export type ProfileMediaFragment = NonNullable<MediaSet | NftImage>;

/**
 * @deprecated Use {@link ProfilePictureMedia} or {@link ProfileCoverMedia} instead.
 */
export type ProfileMedia = ProfileMediaFragment;

/**
 * @deprecated Use {@link ProfilePictureMedia}, {@link ProfileCoverMedia} or {@link PublicationMediaSet} instead.
 */
export type MediaSet = { __typename: 'MediaSet'; original: Media };
