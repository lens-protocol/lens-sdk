import { ReactionType, TransactionKind } from '@lens-protocol/domain/entities';
import {
  CollectPolicyType,
  CollectRequest,
  CollectType,
} from '@lens-protocol/domain/use-cases/publications';
import { DateUtils, never, Overwrite, Prettify } from '@lens-protocol/shared-kernel';

import { CollectPolicy, CollectState } from '../CollectPolicy';
import {
  CollectModule,
  Comment,
  FeeCollectModuleSettings,
  FreeCollectModuleSettings,
  LimitedFeeCollectModuleSettings,
  LimitedTimedFeeCollectModuleSettings,
  Mirror,
  Post,
  Profile,
  PublicationStats,
  ReactionTypes,
  TimedFeeCollectModuleSettings,
} from '../operations';
import { erc20Amount } from './amount';
import { isProfileOwnedByMe, ProfileOwnedByMe } from './profile';
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

export function resolveDomainReactionType(reaction: ReactionTypes): ReactionType {
  switch (reaction) {
    case ReactionTypes.Upvote:
      return ReactionType.UPVOTE;
    case ReactionTypes.Downvote:
      return ReactionType.DOWNVOTE;
    default:
      never("Can't infer reaction type");
  }
}

export function resolveApiReactionType(reaction: ReactionType): ReactionTypes {
  switch (reaction) {
    case ReactionType.UPVOTE:
      return ReactionTypes.Upvote;
    case ReactionType.DOWNVOTE:
      return ReactionTypes.Downvote;
    default:
      never("Can't infer reaction type");
  }
}

export type AnyPublication = Comment | Mirror | Post;

export type ContentPublication = Comment | Post;

type Gated<T extends ContentPublication> = Overwrite<
  T,
  {
    isGated: true;
    metadata: Overwrite<
      T['metadata'],
      {
        encryptionParams: NonNullable<T['metadata']['encryptionParams']>;
      }
    >;
  }
>;

export type GatedComment = Prettify<Gated<Comment>>;

export type GatedPost = Prettify<Gated<Post>>;

export type GatedPublication = GatedComment | GatedPost;

export function isGatedPublication(
  publication: ContentPublication,
): publication is GatedPublication {
  return publication.isGated;
}

export function isContentPublication(
  publication: AnyPublication,
): publication is ContentPublication {
  return isPostPublication(publication) || isCommentPublication(publication);
}

export type PublicationOwnedByMe = Overwrite<AnyPublication, { profile: ProfileOwnedByMe }>;

export function isPublicationOwnedByMe(
  publication: AnyPublication,
): publication is PublicationOwnedByMe {
  return isProfileOwnedByMe(publication.profile);
}

export function createCollectRequest(
  publication: AnyPublication,
  collector: ProfileOwnedByMe,
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

function resolveTimeLimitReached(
  collectModule: LimitedTimedFeeCollectModuleSettings | TimedFeeCollectModuleSettings,
) {
  if (DateUtils.unix() > DateUtils.toUnix(collectModule.endTimestamp)) {
    return CollectState.COLLECT_TIME_EXPIRED;
  }
  return null;
}

function resolveLimitReached(
  collectModule: LimitedFeeCollectModuleSettings | LimitedTimedFeeCollectModuleSettings,
  publicationStats: PublicationStats,
) {
  if (publicationStats.totalAmountOfCollects >= parseInt(collectModule.collectLimit)) {
    return CollectState.COLLECT_LIMIT_REACHED;
  }

  return null;
}

function resolveNotFollower(
  collectModule:
    | FreeCollectModuleSettings
    | FeeCollectModuleSettings
    | LimitedFeeCollectModuleSettings
    | TimedFeeCollectModuleSettings
    | LimitedTimedFeeCollectModuleSettings,
  author: Profile,
) {
  if (collectModule.followerOnly && !author.isFollowedByMe) {
    return CollectState.NOT_A_FOLLOWER;
  }
  return null;
}

export function resolveCollectPolicy({
  profile,
  collectModule,
  publicationStats,
  collectNftAddress,
}: {
  collectModule: CollectModule;
  profile: Profile;
  publicationStats: PublicationStats;
  collectNftAddress: string | null;
}): CollectPolicy {
  switch (collectModule.__typename) {
    case 'FeeCollectModuleSettings':
      return {
        type: CollectPolicyType.CHARGE,
        state: resolveNotFollower(collectModule, profile) ?? CollectState.CAN_BE_COLLECTED,
        amount: erc20Amount({ from: collectModule.amount }),
        referralFee: collectModule.referralFee,
        followerOnly: collectModule.followerOnly,
        collectNftAddress,
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
        collectNftAddress,
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
        collectNftAddress,
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
        collectNftAddress,
      };
    case 'FreeCollectModuleSettings':
      return {
        type: CollectPolicyType.FREE,
        state: resolveNotFollower(collectModule, profile) ?? CollectState.CAN_BE_COLLECTED,
        followerOnly: collectModule.followerOnly,
        collectNftAddress,
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
