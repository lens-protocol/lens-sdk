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
import { Erc20AmountSchema, ProfileIdSchema, PublicationIdSchema } from './common';

const NftAttributeSchema = z.union([
  z.object({
    displayType: z.literal(NftAttributeDisplayType.Date),
    value: z.coerce.date(),
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

const AaveChargeCollectPolicyConfigSchema = z.object({
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

const VaultChargeCollectPolicyConfigSchema = z.object({
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

const MultirecipientChargeCollectPolicyConfigSchema = z.object({
  type: z.literal(CollectPolicyType.CHARGE),
  fee: Erc20AmountSchema,
  followersOnly: z.boolean(),
  metadata: NftMetadataSchema,
  mirrorReward: z.number(),
  collectLimit: z.number().optional(),

  recipients: z.array(RecipientWithSplitSchema),
  endTimestamp: z.number().optional(),
});

const SimpleChargeCollectPolicyConfigSchema = z.object({
  type: z.literal(CollectPolicyType.CHARGE),
  fee: Erc20AmountSchema,
  followersOnly: z.boolean(),
  metadata: NftMetadataSchema,
  mirrorReward: z.number(),
  collectLimit: z.number().optional(),

  recipient: z.string(),
  timeLimited: z.boolean(),
});

const ChargeCollectPolicyConfigSchema = z.union([
  SimpleChargeCollectPolicyConfigSchema,
  MultirecipientChargeCollectPolicyConfigSchema,
  VaultChargeCollectPolicyConfigSchema,
  AaveChargeCollectPolicyConfigSchema,
]);

const FreeCollectPolicyConfigSchema = z.object({
  type: z.literal(CollectPolicyType.FREE),
  metadata: NftMetadataSchema,
  followersOnly: z.boolean(),
});

const NoCollectPolicyConfigSchema = z.object({
  type: z.literal(CollectPolicyType.NO_COLLECT),
});

const CollectPolicyConfigSchema = z.union([
  ChargeCollectPolicyConfigSchema,
  FreeCollectPolicyConfigSchema,
  NoCollectPolicyConfigSchema,
]);

const MediaSchema = z.object({
  altTag: z.string().optional(),
  cover: z.string().optional(),
  mimeType: z.nativeEnum(SupportedFileType),
  url: z.string(),
});

const AnyoneReferencePolicyConfigSchema = z.object({
  type: z.literal(ReferencePolicyType.ANYONE),
});

const DegreesOfSeparationReferencePolicyConfigSchema = z.object({
  type: z.literal(ReferencePolicyType.DEGREES_OF_SEPARATION),
  params: z.object({
    commentsRestricted: z.boolean(),
    mirrorsRestricted: z.boolean(),
    degreesOfSeparation: z.number(),
  }),
});

const FollowersOnlyReferencePolicyConfigSchema = z.object({
  type: z.literal(ReferencePolicyType.FOLLOWERS_ONLY),
});

const ReferencePolicyConfigSchema = z.union([
  AnyoneReferencePolicyConfigSchema,
  DegreesOfSeparationReferencePolicyConfigSchema,
  FollowersOnlyReferencePolicyConfigSchema,
]);

export const CreatePostRequestSchema = z.object({
  appId: z.string().transform(appId).optional(),
  content: z.string().optional(),
  contentFocus: z.nativeEnum(ContentFocus),
  media: z.array(MediaSchema).optional(),
  reference: ReferencePolicyConfigSchema,
  collect: CollectPolicyConfigSchema,
  profileId: ProfileIdSchema,
  kind: z.literal(TransactionKind.CREATE_POST),
  locale: z.string(),
  delegate: z.boolean(),
  offChain: z.boolean(),
});

export const CreateCommentRequestSchema = z.object({
  appId: z.string().transform(appId).optional(),
  publicationId: PublicationIdSchema,
  content: z.string().optional(),
  contentFocus: z.nativeEnum(ContentFocus),
  media: z.array(MediaSchema).optional(),
  reference: ReferencePolicyConfigSchema,
  collect: CollectPolicyConfigSchema,
  profileId: ProfileIdSchema,
  kind: z.literal(TransactionKind.CREATE_COMMENT),
  locale: z.string(),
  delegate: z.boolean(),
  offChain: z.boolean(),
});

export const CreateMirrorRequestSchema = z.object({
  profileId: ProfileIdSchema,
  publicationId: PublicationIdSchema,
  kind: z.literal(TransactionKind.MIRROR_PUBLICATION),
  delegate: z.boolean(),
  offChain: z.boolean(),
});

export const FreeCollectRequestSchema = z.object({
  profileId: ProfileIdSchema,
  type: z.literal(CollectType.FREE),
  publicationId: PublicationIdSchema,
  followerOnly: z.boolean(),
  kind: z.literal(TransactionKind.COLLECT_PUBLICATION),
});

const CollectFeeSchema = z.object({
  amount: Erc20AmountSchema,
  contractAddress: z.string(),
});

export const PaidCollectRequestSchema = z.object({
  profileId: ProfileIdSchema,
  type: z.literal(CollectType.PAID),
  publicationId: PublicationIdSchema,
  fee: CollectFeeSchema,
  kind: z.literal(TransactionKind.COLLECT_PUBLICATION),
});
