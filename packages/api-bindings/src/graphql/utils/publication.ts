import { PublicationType, ReactionType, TransactionKind } from '@lens-protocol/domain/entities';
import { CollectRequest, CollectType } from '@lens-protocol/domain/use-cases/publications';
import { Amount, DateUtils, Erc20, never, Overwrite } from '@lens-protocol/shared-kernel';

import {
  Comment,
  CommentFragment,
  FeeCollectModuleSettingsFragment,
  FreeCollectModuleSettingsFragment,
  LimitedFeeCollectModuleSettingsFragment,
  LimitedTimedFeeCollectModuleSettingsFragment,
  Mirror,
  MirrorFragment,
  Post,
  PostFragment,
  ProfileFragment,
  ReactionTypes,
  TimedFeeCollectModuleSettingsFragment,
} from '../generated';
import { erc20Amount } from './amount';
import { Typename, PickByTypename, JustTypename } from './types';

type PublicationTypename = JustTypename<Mirror> | JustTypename<Comment> | JustTypename<Post>;

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

export function getPublicationType<T extends PublicationTypename>(publication: T): PublicationType {
  switch (publication.__typename) {
    case 'Mirror':
      return PublicationType.MIRROR;
    case 'Comment':
      return PublicationType.COMMENT;
    case 'Post':
      return PublicationType.POST;

    default:
      never("Can't infer publication type");
  }
}

export function getPublicationTypename<T extends PublicationType>(
  publication: T,
): PublicationTypename['__typename'] {
  switch (publication) {
    case PublicationType.MIRROR:
      return 'Mirror';
    case PublicationType.POST:
      return 'Post';
    case PublicationType.COMMENT:
      return 'Comment';
    default:
      never("Can't infer publication typename");
  }
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

export type PublicationFragment = PostFragment | CommentFragment | MirrorFragment;

export type PublicationOwnedByMeFragment = Overwrite<
  PublicationFragment,
  { profile: Overwrite<ProfileFragment, { ownedByMe: true }> }
>;

export function isPublicationOwnedByMe(
  publication: PublicationFragment,
): publication is PublicationOwnedByMeFragment {
  return publication.profile.ownedByMe;
}

export function createCollectRequest(
  publication: PublicationFragment,
  collector: ProfileFragment,
): CollectRequest {
  switch (publication.collectModule.__typename) {
    case 'FreeCollectModuleSettings':
      return {
        profileId: collector.id,
        kind: TransactionKind.COLLECT_PUBLICATION,
        publicationId: publication.id,
        publicationType: getPublicationType(publication),
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
        publicationType: getPublicationType(publication),
        type: CollectType.PAID,
        fee: {
          amount: erc20Amount({ from: publication.collectModule.amount }),
          contractAddress: publication.collectModule.contractAddress,
        },
      };
    case 'RevertCollectModuleSettings':
    case 'UnknownCollectModuleSettings':
      never(
        `Cannot collect publication with "${
          publication.collectModule.__typename as string
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

export type PublicationFragmentWithCollectableCollectModule = PublicationFragment & {
  collectModule: CollectableCollectModuleSettingsFragment;
};

export enum CollectState {
  CAN_BE_COLLECTED = 'CAN_BE_COLLECTED',
  CANNOT_BE_COLLECTED = 'CANNOT_BE_COLLECTED',
  NOT_A_FOLLOWER = 'NOT_A_FOLLOWER',
  COLLECT_LIMIT_REACHED = 'COLLECT_LIMIT_REACHED',
  COLLECT_TIME_EXPIRED = 'COLLECT_TIME_EXPIRED',
}

export function resolveCollectState({
  collectModule,
  profile,
  publicationStats,
}: {
  collectModule: PublicationFragment['collectModule'];
  profile: PublicationFragment['profile'];
  publicationStats: PublicationFragmentWithCollectableCollectModule['stats'];
}): CollectState {
  const collectModuleProperties = resolveCollectModuleProperties(collectModule);

  if (!collectModuleProperties) {
    return CollectState.CANNOT_BE_COLLECTED;
  }

  const { followerOnly, collectLimit, endTimestamp } = collectModuleProperties;

  if (followerOnly && !profile.isFollowedByMe) {
    return CollectState.NOT_A_FOLLOWER;
  }

  if (collectLimit && publicationStats.totalAmountOfCollects >= collectLimit) {
    return CollectState.COLLECT_LIMIT_REACHED;
  }

  if (endTimestamp && DateUtils.unix() > DateUtils.toUnix(endTimestamp)) {
    return CollectState.COLLECT_TIME_EXPIRED;
  }

  return CollectState.CAN_BE_COLLECTED;
}

type CollectModuleProperties = {
  fee: Amount<Erc20> | null;
  followerOnly: boolean | null;
  referralFee: number | null;
  collectLimit: number | null;
  endTimestamp: string | null;
};

export function resolveCollectModuleProperties(
  collectModule: NonNullable<PublicationFragment['collectModule']>,
): CollectModuleProperties | null {
  switch (collectModule.__typename) {
    case 'FeeCollectModuleSettings':
      return {
        fee: erc20Amount({ from: collectModule.amount }),
        referralFee: collectModule.referralFee,
        followerOnly: collectModule.followerOnly,
        collectLimit: null,
        endTimestamp: null,
      };
    case 'LimitedFeeCollectModuleSettings':
      return {
        fee: erc20Amount({ from: collectModule.amount }),
        referralFee: collectModule.referralFee,
        collectLimit: parseInt(collectModule.collectLimit),
        followerOnly: collectModule.followerOnly,
        endTimestamp: null,
      };
    case 'TimedFeeCollectModuleSettings':
      return {
        fee: erc20Amount({ from: collectModule.amount }),
        referralFee: collectModule.referralFee,
        endTimestamp: collectModule.endTimestamp,
        followerOnly: collectModule.followerOnly,
        collectLimit: null,
      };
    case 'LimitedTimedFeeCollectModuleSettings':
      return {
        fee: erc20Amount({ from: collectModule.amount }),
        referralFee: collectModule.referralFee,
        collectLimit: parseInt(collectModule.collectLimit),
        endTimestamp: collectModule.endTimestamp,
        followerOnly: collectModule.followerOnly,
      };
    case 'FreeCollectModuleSettings':
      return {
        fee: null,
        followerOnly: collectModule.followerOnly,
        referralFee: null,
        collectLimit: null,
        endTimestamp: null,
      };
    case 'RevertCollectModuleSettings':
    default:
      // default makes sure we don't throw on unknown collect modules
      return null;
  }
}
