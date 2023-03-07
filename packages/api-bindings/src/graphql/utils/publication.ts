import { ReactionType, TransactionKind } from '@lens-protocol/domain/entities';
import {
  CollectPolicyType,
  CollectRequest,
  CollectType,
} from '@lens-protocol/domain/use-cases/publications';
import { DateUtils, never, Overwrite, Prettify } from '@lens-protocol/shared-kernel';

import { CollectPolicy, CollectState } from '../CollectPolicy';
import {
  CollectModuleFragment,
  CommentFragment,
  FeeCollectModuleSettingsFragment,
  FreeCollectModuleSettingsFragment,
  LimitedFeeCollectModuleSettingsFragment,
  LimitedTimedFeeCollectModuleSettingsFragment,
  MirrorFragment,
  PostFragment,
  ProfileFragment,
  PublicationStatsFragment,
  ReactionTypes,
  TimedFeeCollectModuleSettingsFragment,
} from '../generated';
import { erc20Amount } from './amount';
import { isProfileOwnedByMe, ProfileOwnedByMeFragment } from './profile';
import { PickByTypename, Typename } from './types';

export function isPostPublication<T extends Typename<string>>(
  publication: T,
): publication is PickByTypename<T, 'Post'> {
  return publication.__typename === 'Post';
}

export function isCommentPublication<T extends Typename<string>>(
  publication: T,
): publication is PickByTypename<T, 'Comment'> {
  return publication.__typename === 'Comment';
}

export function isMirrorPublication<T extends Typename<string>>(
  publication: T,
): publication is PickByTypename<T, 'Mirror'> {
  return publication.__typename === 'Mirror';
}

export function getDomainReactionType(reaction: ReactionTypes): ReactionType {
  switch (reaction) {
    case ReactionTypes.Upvote:
      return ReactionType.UPVOTE;
    case ReactionTypes.Downvote:
      return ReactionType.DOWNVOTE;
    default:
      never("Can't infer reaction type");
  }
}

export function getApiReactionType(reaction: ReactionType): ReactionTypes {
  switch (reaction) {
    case ReactionType.UPVOTE:
      return ReactionTypes.Upvote;
    case ReactionType.DOWNVOTE:
      return ReactionTypes.Downvote;
    default:
      never("Can't infer reaction type");
  }
}

export type AnyPublicationFragment = CommentFragment | MirrorFragment | PostFragment;

export type ContentPublicationFragment = CommentFragment | PostFragment;

type Gated<T extends ContentPublicationFragment> = Overwrite<
  T,
  {
    isGated: true;
    metadata: Overwrite<
      T['metadata'],
      {
        __encryptionParams: NonNullable<T['metadata']['__encryptionParams']>;
      }
    >;
  }
>;

export type GatedCommentFragment = Prettify<Gated<CommentFragment>>;

export type GatedPostFragment = Prettify<Gated<PostFragment>>;

export type GatedPublicationFragment = GatedCommentFragment | GatedPostFragment;

export function isGatedPublication(
  publication: ContentPublicationFragment,
): publication is GatedPublicationFragment {
  return publication.isGated;
}

export function isContentPublication(
  publication: AnyPublicationFragment,
): publication is ContentPublicationFragment {
  return isPostPublication(publication) || isCommentPublication(publication);
}

export type PublicationOwnedByMeFragment = Overwrite<
  AnyPublicationFragment,
  { profile: ProfileOwnedByMeFragment }
>;

export function isPublicationOwnedByMe(
  publication: AnyPublicationFragment,
): publication is PublicationOwnedByMeFragment {
  return isProfileOwnedByMe(publication.profile);
}

export function createCollectRequest(
  publication: AnyPublicationFragment,
  collector: ProfileOwnedByMeFragment,
): CollectRequest {
  const collectModule =
    publication.__typename === 'Mirror'
      ? publication.mirrorOf.__collectModule
      : publication.__collectModule;

  switch (collectModule.__typename) {
    case 'FreeCollectModuleSettings':
      return {
        profileId: collector.id,
        kind: TransactionKind.COLLECT_PUBLICATION,
        publicationId: publication.id,

        type: CollectType.FREE,
      };
    case 'FeeCollectModuleSettings':
    case 'LimitedFeeCollectModuleSettings':
    case 'TimedFeeCollectModuleSettings':
    case 'LimitedTimedFeeCollectModuleSettings':
      return {
        profileId: collector.id,
        kind: TransactionKind.COLLECT_PUBLICATION,
        publicationId: publication.id,
        type: CollectType.PAID,
        fee: {
          amount: erc20Amount({ from: collectModule.amount }),
          contractAddress: collectModule.contractAddress,
        },
      };
    case 'RevertCollectModuleSettings':
    case 'UnknownCollectModuleSettings':
    case 'AaveFeeCollectModuleSettings':
    case 'ERC4626FeeCollectModuleSettings':
    case 'MultirecipientFeeCollectModuleSettings':
      never(
        `Cannot collect publication (${publication.id}) with "${
          collectModule.__typename as string
        }" collect module`,
      );
  }
}

export type CollectableCollectModuleSettingsFragment =
  | FreeCollectModuleSettingsFragment
  | FeeCollectModuleSettingsFragment
  | LimitedFeeCollectModuleSettingsFragment
  | TimedFeeCollectModuleSettingsFragment
  | LimitedTimedFeeCollectModuleSettingsFragment;

export type PublicationFragmentWithCollectableCollectModule = AnyPublicationFragment & {
  collectModule: CollectableCollectModuleSettingsFragment;
};

function resolveTimeLimitReached(
  collectModule:
    | LimitedTimedFeeCollectModuleSettingsFragment
    | TimedFeeCollectModuleSettingsFragment,
) {
  if (DateUtils.unix() > DateUtils.toUnix(collectModule.endTimestamp)) {
    return CollectState.COLLECT_TIME_EXPIRED;
  }
  return null;
}

function resolveLimitReached(
  collectModule:
    | LimitedFeeCollectModuleSettingsFragment
    | LimitedTimedFeeCollectModuleSettingsFragment,
  publicationStats: PublicationStatsFragment,
) {
  if (publicationStats.totalAmountOfCollects >= parseInt(collectModule.collectLimit)) {
    return CollectState.COLLECT_LIMIT_REACHED;
  }

  return null;
}

function resolveNotFollower(
  collectModule:
    | FreeCollectModuleSettingsFragment
    | FeeCollectModuleSettingsFragment
    | LimitedFeeCollectModuleSettingsFragment
    | TimedFeeCollectModuleSettingsFragment
    | LimitedTimedFeeCollectModuleSettingsFragment,
  author: ProfileFragment,
) {
  if (collectModule.followerOnly && !author.__isFollowedByMe) {
    return CollectState.NOT_A_FOLLOWER;
  }
  return null;
}

export function resolveCollectPolicy({
  profile,
  collectModule,
  publicationStats,
}: {
  collectModule: CollectModuleFragment;
  profile: ProfileFragment;
  publicationStats: PublicationStatsFragment;
}): CollectPolicy {
  switch (collectModule.__typename) {
    case 'FeeCollectModuleSettings':
      return {
        type: CollectPolicyType.CHARGE,
        state: resolveNotFollower(collectModule, profile) ?? CollectState.CAN_BE_COLLECTED,
        amount: erc20Amount({ from: collectModule.amount }),
        referralFee: collectModule.referralFee,
        followerOnly: collectModule.followerOnly,
      };
    case 'LimitedFeeCollectModuleSettings':
      return {
        type: CollectPolicyType.CHARGE,
        state:
          resolveNotFollower(collectModule, profile) ??
          resolveLimitReached(collectModule, publicationStats) ??
          CollectState.CAN_BE_COLLECTED,
        amount: erc20Amount({ from: collectModule.amount }),
        referralFee: collectModule.referralFee,
        collectLimit: parseInt(collectModule.collectLimit),
        followerOnly: collectModule.followerOnly,
      };
    case 'TimedFeeCollectModuleSettings':
      return {
        type: CollectPolicyType.CHARGE,
        state:
          resolveNotFollower(collectModule, profile) ??
          resolveTimeLimitReached(collectModule) ??
          CollectState.CAN_BE_COLLECTED,
        amount: erc20Amount({ from: collectModule.amount }),
        referralFee: collectModule.referralFee,
        endTimestamp: collectModule.endTimestamp,
        followerOnly: collectModule.followerOnly,
      };
    case 'LimitedTimedFeeCollectModuleSettings':
      return {
        type: CollectPolicyType.CHARGE,
        state:
          resolveNotFollower(collectModule, profile) ??
          resolveLimitReached(collectModule, publicationStats) ??
          resolveTimeLimitReached(collectModule) ??
          CollectState.CAN_BE_COLLECTED,
        amount: erc20Amount({ from: collectModule.amount }),
        referralFee: collectModule.referralFee,
        collectLimit: parseInt(collectModule.collectLimit),
        endTimestamp: collectModule.endTimestamp,
        followerOnly: collectModule.followerOnly,
      };
    case 'FreeCollectModuleSettings':
      return {
        type: CollectPolicyType.FREE,
        state: resolveNotFollower(collectModule, profile) ?? CollectState.CAN_BE_COLLECTED,
        followerOnly: collectModule.followerOnly,
      };
    case 'RevertCollectModuleSettings':
    case 'AaveFeeCollectModuleSettings':
    case 'ERC4626FeeCollectModuleSettings':
    case 'MultirecipientFeeCollectModuleSettings':
    case 'UnknownCollectModuleSettings':
      return {
        type: CollectPolicyType.NO_COLLECT,
        state: CollectState.CANNOT_BE_COLLECTED,
      };
  }
}
