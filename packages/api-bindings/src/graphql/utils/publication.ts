import { PublicationId, ReactionType, TransactionKind } from '@lens-protocol/domain/entities';
import {
  CollectPolicyType,
  CollectRequest,
  CollectType,
} from '@lens-protocol/domain/use-cases/publications';
import { DateUtils, never, Overwrite, Prettify } from '@lens-protocol/shared-kernel';

import {
  AaveFeeCollectPolicy,
  CollectState,
  FeeCollectPolicy,
  LimitedFeeCollectPolicy,
  LimitedTimedFeeCollectPolicy,
  MultirecipientFeeCollectPolicy,
  NoCollectPolicy,
  NoFeeCollectPolicy,
  TimedFeeCollectPolicy,
  VaultFeeCollectPolicy,
} from '../CollectPolicy';
import {
  AaveFeeCollectModuleSettings,
  Comment,
  Erc4626FeeCollectModuleSettings,
  FeeCollectModuleSettings,
  FreeCollectModuleSettings,
  LimitedFeeCollectModuleSettings,
  LimitedTimedFeeCollectModuleSettings,
  Mirror,
  MultirecipientFeeCollectModuleSettings,
  Post,
  PublicationStats,
  ReactionTypes,
  SimpleCollectModuleSettings,
  TimedFeeCollectModuleSettings,
} from '../operations';
import { erc20Amount } from './amount';
import { isProfileOwnedByMe, ProfileOwnedByMe } from './profile';
import { PickByTypename, Typename } from './types';

export type CollectModule = ContentPublication['collectModule'];

export type ReferenceModule = NonNullable<ContentPublication['referenceModule']>;

/**
 * @group Helpers
 */
export function isPostPublication<T extends Typename<string>>(
  publication: T,
): publication is PickByTypename<T, 'Post'> {
  return publication.__typename === 'Post';
}

/**
 * @group Helpers
 */
export function isCommentPublication<T extends Typename<string>>(
  publication: T,
): publication is PickByTypename<T, 'Comment'> {
  return publication.__typename === 'Comment';
}

/**
 * @group Helpers
 */
export function isMirrorPublication<T extends Typename<string>>(
  publication: T,
): publication is PickByTypename<T, 'Mirror'> {
  return publication.__typename === 'Mirror';
}

/**
 * @internal
 */
export function isDataAvailabilityPublicationId(publicationId: PublicationId): boolean {
  return publicationId.includes('-DA-');
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

/**
 * Any publication regardless of its type, or capabilities
 */
export type AnyPublication = Comment | Mirror | Post;

/**
 * Any publication that can be referenced other via a comment or mirror
 */
export type ContentPublication = Comment | Post;

/**
 * @internal
 */
export type Gated<T extends ContentPublication> = Overwrite<
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

/**
 * An encrypted comment
 */
export type GatedComment = Prettify<Gated<Comment>>;

/**
 * An encrypted post
 */
export type GatedPost = Prettify<Gated<Post>>;

/**
 * An encrypted publication
 */
export type GatedPublication = GatedComment | GatedPost;

/**
 * @internal
 */
export type Collectable<T extends AnyPublication> = Overwrite<
  T,
  {
    collectPolicy:
      | FeeCollectPolicy
      | NoFeeCollectPolicy
      | LimitedFeeCollectPolicy
      | TimedFeeCollectPolicy
      | LimitedTimedFeeCollectPolicy
      | MultirecipientFeeCollectPolicy
      | VaultFeeCollectPolicy
      | AaveFeeCollectPolicy;

    collectModule:
      | AaveFeeCollectModuleSettings
      | Erc4626FeeCollectModuleSettings
      | FeeCollectModuleSettings
      | FreeCollectModuleSettings
      | LimitedFeeCollectModuleSettings
      | LimitedTimedFeeCollectModuleSettings
      | MultirecipientFeeCollectModuleSettings
      | TimedFeeCollectModuleSettings;
  }
>;

/**
 * A collectable comment
 */
export type CollectableComment = Prettify<Collectable<Comment>>;

/**
 * A collectable mirror (i.e. a mirror of a collectable comment or post)
 */
export type CollectableMirror = Prettify<Collectable<Mirror>>;

/**
 * A collectable post
 */
export type CollectablePost = Prettify<Collectable<Post>>;

/**
 * A collectable publication
 *
 * It can be a comment, mirror or post
 */
export type CollectablePublication = CollectableComment | CollectableMirror | CollectablePost;

/**
 * @group Helpers
 */
export function isGatedPublication(
  publication: ContentPublication,
): publication is GatedPublication {
  return publication.isGated;
}

/**
 * @group Helpers
 */
export function isContentPublication(
  publication: AnyPublication,
): publication is ContentPublication {
  return isPostPublication(publication) || isCommentPublication(publication);
}

export type PublicationOwnedByMe = Overwrite<AnyPublication, { profile: ProfileOwnedByMe }>;

/**
 * @group Helpers
 */
export function isPublicationOwnedByMe(
  publication: AnyPublication,
): publication is PublicationOwnedByMe {
  return isProfileOwnedByMe(publication.profile);
}

export function createCollectRequest(
  publication: AnyPublication,
  collector: ProfileOwnedByMe,
): CollectRequest {
  const collectModule: CollectModule =
    publication.__typename === 'Mirror'
      ? publication.mirrorOf.collectModule
      : publication.collectModule;

  switch (collectModule.__typename) {
    case 'SimpleCollectModuleSettings':
      if (collectModule.feeOptional) {
        return {
          profileId: collector.id,
          kind: TransactionKind.COLLECT_PUBLICATION,
          publicationId: publication.id,
          type: CollectType.PAID,
          fee: {
            amount: erc20Amount({ from: collectModule.feeOptional.amount }),
            contractAddress: collectModule.contractAddress,
          },
        };
      }
      return {
        profileId: collector.id,
        kind: TransactionKind.COLLECT_PUBLICATION,
        publicationId: publication.id,
        followerOnly: collectModule.followerOnly,
        type: CollectType.FREE,
      };
    case 'FreeCollectModuleSettings':
      return {
        profileId: collector.id,
        kind: TransactionKind.COLLECT_PUBLICATION,
        publicationId: publication.id,
        followerOnly: collectModule.followerOnly,
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
    case 'MultirecipientFeeCollectModuleSettings':
    case 'ERC4626FeeCollectModuleSettings':
    case 'AaveFeeCollectModuleSettings':
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

function resolveOptionalTimeLimitReached(
  collectModule:
    | MultirecipientFeeCollectModuleSettings
    | Erc4626FeeCollectModuleSettings
    | AaveFeeCollectModuleSettings
    | SimpleCollectModuleSettings,
) {
  if (
    collectModule.endTimestampOptional &&
    DateUtils.unix() > DateUtils.toUnix(collectModule.endTimestampOptional)
  ) {
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

function resolveOptionalLimitReached(
  collectModule:
    | MultirecipientFeeCollectModuleSettings
    | Erc4626FeeCollectModuleSettings
    | AaveFeeCollectModuleSettings
    | SimpleCollectModuleSettings,
  publicationStats: PublicationStats,
) {
  if (
    collectModule.collectLimitOptional &&
    publicationStats.totalAmountOfCollects >= parseInt(collectModule.collectLimitOptional)
  ) {
    return CollectState.COLLECT_LIMIT_REACHED;
  }

  return null;
}

export type CollectableCollectModuleSettings =
  | FreeCollectModuleSettings
  | FeeCollectModuleSettings
  | LimitedFeeCollectModuleSettings
  | TimedFeeCollectModuleSettings
  | LimitedTimedFeeCollectModuleSettings
  | MultirecipientFeeCollectModuleSettings
  | Erc4626FeeCollectModuleSettings
  | AaveFeeCollectModuleSettings
  | SimpleCollectModuleSettings;

function resolveNotFollower(
  collectModule: CollectableCollectModuleSettings,
  isAuthorFollowedByMe: boolean,
) {
  if (collectModule.followerOnly && !isAuthorFollowedByMe) {
    return CollectState.NOT_A_FOLLOWER;
  }
  return null;
}

export function resolveCollectPolicy({
  collectModule,
  isAuthorFollowedByMe,
  publicationStats,
  collectNftAddress,
}: {
  collectModule: CollectModule;
  isAuthorFollowedByMe: boolean;
  publicationStats: PublicationStats;
  collectNftAddress: string | null;
}):
  | FeeCollectPolicy
  | NoFeeCollectPolicy
  | MultirecipientFeeCollectPolicy
  | VaultFeeCollectPolicy
  | AaveFeeCollectPolicy
  | NoCollectPolicy {
  switch (collectModule.__typename) {
    case 'SimpleCollectModuleSettings': {
      if (collectModule.feeOptional) {
        return {
          type: CollectPolicyType.CHARGE,
          state:
            resolveNotFollower(collectModule, isAuthorFollowedByMe) ??
            resolveOptionalLimitReached(collectModule, publicationStats) ??
            resolveOptionalTimeLimitReached(collectModule) ??
            CollectState.CAN_BE_COLLECTED,
          amount: erc20Amount({ from: collectModule.feeOptional.amount }),
          collectLimit: collectModule.collectLimitOptional
            ? parseInt(collectModule.collectLimitOptional)
            : null,
          collectNftAddress,
          contractAddress: collectModule.contractAddress,
          endTimestamp: collectModule.endTimestampOptional,
          followerOnly: collectModule.followerOnly,
          referralFee: collectModule.feeOptional.referralFee,
        };
      }
      return {
        type: CollectPolicyType.FREE,
        state:
          resolveNotFollower(collectModule, isAuthorFollowedByMe) ??
          resolveOptionalLimitReached(collectModule, publicationStats) ??
          resolveOptionalTimeLimitReached(collectModule) ??
          CollectState.CAN_BE_COLLECTED,
        contractAddress: collectModule.contractAddress,
        collectLimit: collectModule.collectLimitOptional
          ? parseInt(collectModule.collectLimitOptional)
          : null,
        collectNftAddress,
        endTimestamp: collectModule.endTimestampOptional,
        followerOnly: collectModule.followerOnly,
      };
    }
    case 'FeeCollectModuleSettings':
      return {
        type: CollectPolicyType.CHARGE,
        state:
          resolveNotFollower(collectModule, isAuthorFollowedByMe) ?? CollectState.CAN_BE_COLLECTED,

        amount: erc20Amount({ from: collectModule.amount }),
        collectLimit: null,
        collectNftAddress,
        contractAddress: collectModule.contractAddress,
        endTimestamp: null,
        followerOnly: collectModule.followerOnly,
        referralFee: collectModule.referralFee,
      };
    case 'LimitedFeeCollectModuleSettings':
      return {
        type: CollectPolicyType.CHARGE,
        state:
          resolveNotFollower(collectModule, isAuthorFollowedByMe) ??
          resolveLimitReached(collectModule, publicationStats) ??
          CollectState.CAN_BE_COLLECTED,
        amount: erc20Amount({ from: collectModule.amount }),
        collectLimit: parseInt(collectModule.collectLimit),
        collectNftAddress,
        contractAddress: collectModule.contractAddress,
        endTimestamp: null,
        followerOnly: collectModule.followerOnly,
        referralFee: collectModule.referralFee,
      };
    case 'TimedFeeCollectModuleSettings':
      return {
        type: CollectPolicyType.CHARGE,
        state:
          resolveNotFollower(collectModule, isAuthorFollowedByMe) ??
          resolveTimeLimitReached(collectModule) ??
          CollectState.CAN_BE_COLLECTED,
        amount: erc20Amount({ from: collectModule.amount }),
        collectLimit: null,
        collectNftAddress,
        contractAddress: collectModule.contractAddress,
        endTimestamp: collectModule.endTimestamp,
        followerOnly: collectModule.followerOnly,
        referralFee: collectModule.referralFee,
      };
    case 'LimitedTimedFeeCollectModuleSettings':
      return {
        type: CollectPolicyType.CHARGE,
        state:
          resolveNotFollower(collectModule, isAuthorFollowedByMe) ??
          resolveLimitReached(collectModule, publicationStats) ??
          resolveTimeLimitReached(collectModule) ??
          CollectState.CAN_BE_COLLECTED,
        amount: erc20Amount({ from: collectModule.amount }),
        referralFee: collectModule.referralFee,
        collectLimit: parseInt(collectModule.collectLimit),
        endTimestamp: collectModule.endTimestamp,
        followerOnly: collectModule.followerOnly,
        collectNftAddress,
        contractAddress: collectModule.contractAddress,
      };
    case 'FreeCollectModuleSettings':
      return {
        type: CollectPolicyType.FREE,
        state:
          resolveNotFollower(collectModule, isAuthorFollowedByMe) ?? CollectState.CAN_BE_COLLECTED,
        collectLimit: null,
        collectNftAddress,
        contractAddress: collectModule.contractAddress,
        endTimestamp: null,
        followerOnly: collectModule.followerOnly,
      };
    case 'MultirecipientFeeCollectModuleSettings':
    case 'ERC4626FeeCollectModuleSettings':
    case 'AaveFeeCollectModuleSettings':
      return {
        type: CollectPolicyType.CHARGE,
        state:
          resolveNotFollower(collectModule, isAuthorFollowedByMe) ??
          resolveOptionalLimitReached(collectModule, publicationStats) ??
          resolveOptionalTimeLimitReached(collectModule) ??
          CollectState.CAN_BE_COLLECTED,
        amount: erc20Amount({ from: collectModule.amount }),
        referralFee: collectModule.referralFee,
        collectLimit: collectModule.collectLimitOptional
          ? parseInt(collectModule.collectLimitOptional)
          : null,
        endTimestamp: collectModule.endTimestampOptional,
        followerOnly: collectModule.followerOnly,
        collectNftAddress,
        contractAddress: collectModule.contractAddress,
      };
    case 'RevertCollectModuleSettings':
    case 'UnknownCollectModuleSettings':
    // Important: at any time backend can introduce new collect module
    // that older sdk version does not know about
    // eslint-disable-next-line no-fallthrough
    default:
      return {
        type: CollectPolicyType.NO_COLLECT,
        state: CollectState.CANNOT_BE_COLLECTED,
      };
  }
}
