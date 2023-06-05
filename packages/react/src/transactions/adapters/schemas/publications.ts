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

import { appId } from '../../../utils';
import {
  Erc20AmountSchema,
  SerializedErc20AmountSchema,
  ProfileIdSchema,
  PublicationIdSchema,
} from './common';

const NftAttributeSchema = z.discriminatedUnion('displayType', [
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

function aaveChargeCollectPolicyConfigSchema<TAmountSchema extends Erc20AmountSchema>(
  feeSchema: TAmountSchema,
) {
  return z.object({
    type: z.literal(CollectPolicyType.CHARGE),
    fee: feeSchema,
    followersOnly: z.boolean(),
    metadata: NftMetadataSchema,
    mirrorReward: z.number(),
    collectLimit: z.number().optional(),

    recipient: z.string(),
    depositToAave: z.literal(true),
    endTimestamp: z.number().optional(),
  });
}

function vaultChargeCollectPolicyConfigSchema<TAmountSchema extends Erc20AmountSchema>(
  feeSchema: TAmountSchema,
) {
  return z.object({
    type: z.literal(CollectPolicyType.CHARGE),
    fee: feeSchema,
    followersOnly: z.boolean(),
    metadata: NftMetadataSchema,
    mirrorReward: z.number(),
    collectLimit: z.number().optional(),

    recipient: z.string(),
    vault: z.string(),
    endTimestamp: z.number().optional(),
  });
}

function multirecipientChargeCollectPolicyConfigSchema<TAmountSchema extends Erc20AmountSchema>(
  feeSchema: TAmountSchema,
) {
  return z.object({
    type: z.literal(CollectPolicyType.CHARGE),
    fee: feeSchema,
    followersOnly: z.boolean(),
    metadata: NftMetadataSchema,
    mirrorReward: z.number(),
    collectLimit: z.number().optional(),

    recipients: z.array(RecipientWithSplitSchema),
    endTimestamp: z.number().optional(),
  });
}

function simpleChargeCollectPolicyConfigSchema<TAmountSchema extends Erc20AmountSchema>(
  feeSchema: TAmountSchema,
) {
  return z.object({
    type: z.literal(CollectPolicyType.CHARGE),
    fee: feeSchema,
    followersOnly: z.boolean(),
    metadata: NftMetadataSchema,
    mirrorReward: z.number(),
    collectLimit: z.number().optional(),

    recipient: z.string(),
    timeLimited: z.boolean(),
  });
}

const FreeCollectPolicyConfigSchema = z.object({
  type: z.literal(CollectPolicyType.FREE),
  metadata: NftMetadataSchema,
  followersOnly: z.boolean(),
});

const NoCollectPolicyConfigSchema = z.object({
  type: z.literal(CollectPolicyType.NO_COLLECT),
});

function collectPolicyConfigSchema<TAmountSchema extends Erc20AmountSchema>(
  feeSchema: TAmountSchema,
) {
  return z.union([
    simpleChargeCollectPolicyConfigSchema(feeSchema),
    multirecipientChargeCollectPolicyConfigSchema(feeSchema),
    vaultChargeCollectPolicyConfigSchema(feeSchema),
    aaveChargeCollectPolicyConfigSchema(feeSchema),
    FreeCollectPolicyConfigSchema,
    NoCollectPolicyConfigSchema,
  ]);
}

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

const ReferencePolicyConfigSchema = z.discriminatedUnion('type', [
  AnyoneReferencePolicyConfigSchema,
  DegreesOfSeparationReferencePolicyConfigSchema,
  FollowersOnlyReferencePolicyConfigSchema,
]);

const AppIdSchema: z.Schema<AppId, z.ZodTypeDef, string> = z.any().transform(appId);

function createBasePostRequestSchema<TAmountSchema extends Erc20AmountSchema>(
  feeSchema: TAmountSchema,
) {
  return z.object({
    appId: AppIdSchema.optional(),
    collect: collectPolicyConfigSchema(feeSchema),
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
}

export function createTextualPostRequestSchema<TAmountSchema extends Erc20AmountSchema>(
  feeSchema: TAmountSchema,
) {
  return createBasePostRequestSchema(feeSchema).extend({
    content: z.string(),
    contentFocus: z.enum([ContentFocus.ARTICLE, ContentFocus.LINK, ContentFocus.TEXT_ONLY]),
    media: z.array(MediaSchema).optional(),
  });
}

export function createMediaPostRequestSchema<TAmountSchema extends Erc20AmountSchema>(
  feeSchema: TAmountSchema,
) {
  return createBasePostRequestSchema(feeSchema).extend({
    content: z.string().optional(),
    contentFocus: z.enum([ContentFocus.AUDIO, ContentFocus.IMAGE, ContentFocus.VIDEO]),
    media: z.array(MediaSchema),
  });
}

export function createEmbedPostRequestSchema<TAmountSchema extends Erc20AmountSchema>(
  feeSchema: TAmountSchema,
) {
  return createBasePostRequestSchema(feeSchema).extend({
    animationUrl: z.string(),
    content: z.string().optional(),
    contentFocus: z.enum([ContentFocus.EMBED]),
    media: z.array(MediaSchema).optional(),
  });
}

function createBaseCommentRequestSchema<TAmountSchema extends Erc20AmountSchema>(
  feeSchema: TAmountSchema,
) {
  return createBasePostRequestSchema(feeSchema).extend({
    publicationId: PublicationIdSchema,
  });
}

export function createTextualCommentRequestSchema<TAmountSchema extends Erc20AmountSchema>(
  feeSchema: TAmountSchema,
) {
  return createBaseCommentRequestSchema(feeSchema).extend({
    content: z.string(),
    contentFocus: z.enum([ContentFocus.ARTICLE, ContentFocus.LINK, ContentFocus.TEXT_ONLY]),
    media: z.array(MediaSchema).optional(),
  });
}

export function createMediaCommentRequestSchema<TAmountSchema extends Erc20AmountSchema>(
  feeSchema: TAmountSchema,
) {
  return createBaseCommentRequestSchema(feeSchema).extend({
    content: z.string().optional(),
    contentFocus: z.enum([ContentFocus.AUDIO, ContentFocus.IMAGE, ContentFocus.VIDEO]),
    media: z.array(MediaSchema),
  });
}

export function createEmbedCommentRequestSchema<TAmountSchema extends Erc20AmountSchema>(
  feeSchema: TAmountSchema,
) {
  return createBaseCommentRequestSchema(feeSchema).extend({
    animationUrl: z.string(),
    content: z.string().optional(),
    contentFocus: z.enum([ContentFocus.EMBED]),
    media: z.array(MediaSchema).optional(),
  });
}

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
  amount: SerializedErc20AmountSchema,
  contractAddress: z.string(),
});

export const PaidCollectRequestSchema = BaseCollectRequestSchema.extend({
  type: z.literal(CollectType.PAID),
  fee: CollectFeeSchema,
});
