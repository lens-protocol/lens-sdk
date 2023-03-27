import { TransactionKind } from '@lens-protocol/domain/entities';
import {
  SupportedFileType,
  CollectPolicyType,
  CollectType,
  ContentFocus,
  NftAttributeDisplayType,
  ReferencePolicyType,
} from '@lens-protocol/domain/use-cases/publications';
import { z } from 'zod';

import { appId } from '../../../../utils';
import { Erc20AmountSchema } from './common';

const NftAttributeSchema = z.union([
  z.object({
    displayType: z.literal(NftAttributeDisplayType.Date),
    value: z.date(),
    traitType: z.string(),
  }),
  z.object({
    displayType: z.literal(NftAttributeDisplayType.Number),
    value: z.number(),
    traitType: z.string(),
  }),
  z.object({
    displayType: z.literal(NftAttributeDisplayType.String),
    value: z.string(),
    traitType: z.string(),
  }),
]);

const NftMetadataSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  attributes: z.array(NftAttributeSchema),
});

const RecipientWithSplitSchema = z.object({
  recipient: z.string(),
  split: z.number(),
});

const AaveChargeCollectPolicySchema = z.object({
  type: z.literal(CollectPolicyType.CHARGE),
  fee: Erc20AmountSchema,
  followersOnly: z.boolean(),
  metadata: NftMetadataSchema,
  mirrorReward: z.number(),
  collectLimit: z.number().optional(),

  recipient: z.string(),
  depositToAave: z.literal(true),
  endTimestamp: z.number().optional(),
});

const VaultChargeCollectPolicySchema = z.object({
  type: z.literal(CollectPolicyType.CHARGE),
  fee: Erc20AmountSchema,
  followersOnly: z.boolean(),
  metadata: NftMetadataSchema,
  mirrorReward: z.number(),
  collectLimit: z.number().optional(),

  recipient: z.string(),
  vault: z.string(),
  endTimestamp: z.number().optional(),
});

const MultirecipientChargeCollectPolicySchema = z.object({
  type: z.literal(CollectPolicyType.CHARGE),
  fee: Erc20AmountSchema,
  followersOnly: z.boolean(),
  metadata: NftMetadataSchema,
  mirrorReward: z.number(),
  collectLimit: z.number().optional(),

  recipients: z.array(RecipientWithSplitSchema),
  endTimestamp: z.number().optional(),
});

const SimpleChargeCollectPolicySchema = z.object({
  type: z.literal(CollectPolicyType.CHARGE),
  fee: Erc20AmountSchema,
  followersOnly: z.boolean(),
  metadata: NftMetadataSchema,
  mirrorReward: z.number(),
  collectLimit: z.number().optional(),

  recipient: z.string(),
  timeLimited: z.boolean(),
});

const ChargeCollectPolicySchema = z.union([
  SimpleChargeCollectPolicySchema,
  MultirecipientChargeCollectPolicySchema,
  VaultChargeCollectPolicySchema,
  AaveChargeCollectPolicySchema,
]);

const FreeCollectPolicySchema = z.object({
  type: z.literal(CollectPolicyType.FREE),
  metadata: NftMetadataSchema,
  followersOnly: z.boolean(),
});

const NoCollectPolicySchema = z.object({
  type: z.literal(CollectPolicyType.NO_COLLECT),
});

const CollectPolicySchema = z.union([
  ChargeCollectPolicySchema,
  FreeCollectPolicySchema,
  NoCollectPolicySchema,
]);

const MediaSchema = z.object({
  altTag: z.string().optional(),
  cover: z.string().optional(),
  mimeType: z.nativeEnum(SupportedFileType),
  url: z.string(),
});

const AnyoneReferencePolicySchema = z.object({
  type: z.literal(ReferencePolicyType.ANYONE),
});

const DegreesOfSeparationReferencePolicySchema = z.object({
  type: z.literal(ReferencePolicyType.DEGREES_OF_SEPARATION),
  params: z.object({
    commentsRestricted: z.boolean(),
    mirrorsRestricted: z.boolean(),
    degreesOfSeparation: z.number(),
  }),
});

const FollowersOnlyReferencePolicySchema = z.object({
  type: z.literal(ReferencePolicyType.FOLLOWERS_ONLY),
});

const ReferencePolicyConfigSchema = z.union([
  AnyoneReferencePolicySchema,
  DegreesOfSeparationReferencePolicySchema,
  FollowersOnlyReferencePolicySchema,
]);

export const CreatePostRequestSchema = z.object({
  appId: z.string().transform(appId).optional(),
  content: z.string().optional(),
  contentFocus: z.nativeEnum(ContentFocus),
  media: z.array(MediaSchema).optional(),
  reference: ReferencePolicyConfigSchema,
  collect: CollectPolicySchema,
  profileId: z.string(),
  kind: z.literal(TransactionKind.CREATE_POST),
  locale: z.string(),
  delegate: z.boolean(),
});

export const CreateCommentRequestSchema = z.object({
  appId: z.string().transform(appId).optional(),
  publicationId: z.string(),
  content: z.string().optional(),
  contentFocus: z.nativeEnum(ContentFocus),
  media: z.array(MediaSchema).optional(),
  reference: ReferencePolicyConfigSchema,
  collect: CollectPolicySchema,
  profileId: z.string(),
  kind: z.literal(TransactionKind.CREATE_COMMENT),
  locale: z.string(),
  delegate: z.boolean(),
});

export const CreateMirrorRequestSchema = z.object({
  profileId: z.string(),
  publicationId: z.string(),
  kind: z.literal(TransactionKind.MIRROR_PUBLICATION),
  delegate: z.boolean(),
});

export const FreeCollectRequestSchema = z.object({
  profileId: z.string(),
  type: z.literal(CollectType.FREE),
  publicationId: z.string(),
  kind: z.literal(TransactionKind.COLLECT_PUBLICATION),
});

const CollectFeeSchema = z.object({
  amount: Erc20AmountSchema,
  contractAddress: z.string(),
});

export const PaidCollectRequestSchema = z.object({
  profileId: z.string(),
  type: z.literal(CollectType.PAID),
  publicationId: z.string(),
  fee: CollectFeeSchema,
  kind: z.literal(TransactionKind.COLLECT_PUBLICATION),
});
