import { AppId, TransactionKind } from '@lens-protocol/domain/entities';
import {
  SupportedFileType,
  CollectPolicyType,
  CollectType,
  ContentFocus,
  NftAttributeDisplayType,
  ReferencePolicyType,
  ContentWarning,
  ImageType,
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
  externalUrl: z.string().optional(),
  image: z.string().optional(),
  imageMimeType: z.nativeEnum(ImageType).optional(),
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

const AppIdSchema: z.Schema<AppId, z.ZodTypeDef, string> = z.any().transform(appId);

const BasePostRequestSchema = z.object({
  appId: AppIdSchema.optional(),
  collect: CollectPolicyConfigSchema,
  contentWarning: z.nativeEnum(ContentWarning).optional(),
  // decryptionCriteria TODO, add to schema
  delegate: z.boolean(),
  kind: z.literal(TransactionKind.CREATE_POST),
  locale: z.string(),
  offChain: z.boolean(),
  profileId: ProfileIdSchema,
  reference: ReferencePolicyConfigSchema,
  tags: z.array(z.string()).optional(),
});

export const CreateTextualPostRequestSchema = BasePostRequestSchema.extend({
  content: z.string(),
  contentFocus: z.enum([ContentFocus.ARTICLE, ContentFocus.LINK, ContentFocus.TEXT_ONLY]),
  media: z.array(MediaSchema).optional(),
});

export const CreateMediaPostRequestSchema = BasePostRequestSchema.extend({
  content: z.string().optional(),
  contentFocus: z.enum([ContentFocus.AUDIO, ContentFocus.IMAGE, ContentFocus.VIDEO]),
  media: z.array(MediaSchema),
});

export const CreateEmbedPostRequestSchema = BasePostRequestSchema.extend({
  animationUrl: z.string(),
  content: z.string().optional(),
  contentFocus: z.enum([ContentFocus.EMBED]),
  media: z.array(MediaSchema).optional(),
});

const BaseCommentRequestSchema = z.object({
  appId: AppIdSchema.optional(),
  collect: CollectPolicyConfigSchema,
  contentWarning: z.nativeEnum(ContentWarning).optional(),
  // decryptionCriteria TODO, add to schema
  delegate: z.boolean(),
  kind: z.literal(TransactionKind.CREATE_COMMENT),
  locale: z.string(),
  offChain: z.boolean(),
  profileId: ProfileIdSchema,
  publicationId: PublicationIdSchema,
  reference: ReferencePolicyConfigSchema,
  tags: z.array(z.string()).optional(),
});

export const CreateTextualCommentRequestSchema = BaseCommentRequestSchema.extend({
  content: z.string(),
  contentFocus: z.enum([ContentFocus.ARTICLE, ContentFocus.LINK, ContentFocus.TEXT_ONLY]),
  media: z.array(MediaSchema).optional(),
});

export const CreateMediaCommentRequestSchema = BaseCommentRequestSchema.extend({
  content: z.string().optional(),
  contentFocus: z.enum([ContentFocus.AUDIO, ContentFocus.IMAGE, ContentFocus.VIDEO]),
  media: z.array(MediaSchema),
});

export const CreateEmbedCommentRequestSchema = BaseCommentRequestSchema.extend({
  animationUrl: z.string(),
  content: z.string().optional(),
  contentFocus: z.enum([ContentFocus.EMBED]),
  media: z.array(MediaSchema).optional(),
});

export const CreateMirrorRequestSchema = z.object({
  profileId: ProfileIdSchema,
  publicationId: PublicationIdSchema,
  kind: z.literal(TransactionKind.MIRROR_PUBLICATION),
  delegate: z.boolean(),
  offChain: z.boolean(),
});

const BaseCollectRequestSchema = z.object({
  kind: z.literal(TransactionKind.COLLECT_PUBLICATION),
  profileId: ProfileIdSchema,
  publicationId: PublicationIdSchema,
});

export const FreeCollectRequestSchema = BaseCollectRequestSchema.extend({
  type: z.literal(CollectType.FREE),
  followerOnly: z.boolean(),
});

const CollectFeeSchema = z.object({
  amount: Erc20AmountSchema,
  contractAddress: z.string(),
});

export const PaidCollectRequestSchema = BaseCollectRequestSchema.extend({
  type: z.literal(CollectType.PAID),
  fee: CollectFeeSchema,
});
