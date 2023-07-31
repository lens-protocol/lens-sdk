import {
  AppId,
  DecryptionCriteriaType,
  Erc20ComparisonOperator,
  NftContractType,
  TransactionKind,
} from '@lens-protocol/domain/entities';
import {
  SupportedFileType,
  CollectPolicyType,
  CollectType,
  ContentFocus,
  MetadataAttributeDisplayType,
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

const NftOwnershipCriterionSchema = z.object({
  type: z.literal(DecryptionCriteriaType.NFT_OWNERSHIP),
  contractAddress: z.string(),
  chainId: z.number(),
  contractType: z.nativeEnum(NftContractType),
  tokenIds: z.array(z.string()).min(1).max(30).optional(),
});

function erc20OwnershipCriterionSchema<TAmountSchema extends Erc20AmountSchema>(
  amountSchema: TAmountSchema,
) {
  return z.object({
    type: z.literal(DecryptionCriteriaType.ERC20_OWNERSHIP),
    amount: amountSchema,
    condition: z.nativeEnum(Erc20ComparisonOperator),
  });
}

const AddressOwnershipCriterionSchema = z.object({
  type: z.literal(DecryptionCriteriaType.ADDRESS_OWNERSHIP),
  address: z.string(),
});

const ProfileOwnershipCriterionSchema = z.object({
  type: z.literal(DecryptionCriteriaType.PROFILE_OWNERSHIP),
  profileId: ProfileIdSchema,
});

const FollowOwnershipCriterionSchema = z.object({
  type: z.literal(DecryptionCriteriaType.FOLLOW_PROFILE),
  profileId: ProfileIdSchema,
});

const CollectPublicationCriterionSchema = z.object({
  type: z.literal(DecryptionCriteriaType.COLLECT_PUBLICATION),
  publicationId: PublicationIdSchema,
});

const CollectThisPublicationCriterionSchema = z.object({
  type: z.literal(DecryptionCriteriaType.COLLECT_THIS_PUBLICATION),
});

function simpleCriterionSchema<TAmountSchema extends Erc20AmountSchema>(
  amountSchema: TAmountSchema,
) {
  return z.discriminatedUnion('type', [
    NftOwnershipCriterionSchema,
    erc20OwnershipCriterionSchema(amountSchema),
    AddressOwnershipCriterionSchema,
    ProfileOwnershipCriterionSchema,
    FollowOwnershipCriterionSchema,
    CollectPublicationCriterionSchema,
    CollectThisPublicationCriterionSchema,
  ]);
}

function unique(items: Array<unknown>) {
  return new Set(items.map((item) => JSON.stringify(item))).size === items.length;
}

function orCriterionSchema<TAmountSchema extends Erc20AmountSchema>(amountSchema: TAmountSchema) {
  return z.object({
    type: z.literal(DecryptionCriteriaType.OR),
    or: z.array(simpleCriterionSchema(amountSchema)).min(2).max(5).refine(unique, {
      message: 'Must be an array of unique criteria',
    }),
  });
}

function andCriterionSchema<TAmountSchema extends Erc20AmountSchema>(amountSchema: TAmountSchema) {
  return z.object({
    type: z.literal(DecryptionCriteriaType.AND),
    and: z.array(simpleCriterionSchema(amountSchema)).min(2).max(5).refine(unique, {
      message: 'Must be an array of unique criteria',
    }),
  });
}

function decryptionCriteriaSchema<TAmountSchema extends Erc20AmountSchema>(
  amountSchema: TAmountSchema,
) {
  return z
    .discriminatedUnion('type', [
      orCriterionSchema(amountSchema),
      andCriterionSchema(amountSchema),
      NftOwnershipCriterionSchema,
      erc20OwnershipCriterionSchema(amountSchema),
      AddressOwnershipCriterionSchema,
      ProfileOwnershipCriterionSchema,
      FollowOwnershipCriterionSchema,
      CollectPublicationCriterionSchema,
      CollectThisPublicationCriterionSchema,
    ])
    .optional();
}

const MetadataAttributeSchema = z.discriminatedUnion('displayType', [
  z.object({
    displayType: z.literal(MetadataAttributeDisplayType.Date),
    value: z.coerce.date(),
    traitType: z.string(),
  }),
  z.object({
    displayType: z.literal(MetadataAttributeDisplayType.Number),
    value: z.number(),
    traitType: z.string(),
  }),
  z.object({
    displayType: z.literal(MetadataAttributeDisplayType.String),
    value: z.string(),
    traitType: z.string(),
  }),
]);

const NftMetadataSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  attributes: z.array(MetadataAttributeSchema),
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

const MediaObjectSchema = z.object({
  altTag: z.string().optional(),
  cover: z.string().optional(),
  mimeType: z.nativeEnum(SupportedFileType),
  url: z.string(),
});

const MetadataImageSchema = z.object({
  mimeType: z.nativeEnum(ImageType),
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

function createCommonPublicationRequestSchema<TAmountSchema extends Erc20AmountSchema>(
  amountSchema: TAmountSchema,
) {
  return z.object({
    appId: AppIdSchema.optional(),
    attributes: z.array(MetadataAttributeSchema).optional(),
    collect: collectPolicyConfigSchema(amountSchema),
    contentWarning: z.nativeEnum(ContentWarning).optional(),
    decryptionCriteria: decryptionCriteriaSchema(amountSchema),
    delegate: z.boolean(),
    image: MetadataImageSchema.optional(),
    locale: z.string(),
    offChain: z.boolean(),
    profileId: ProfileIdSchema,
    reference: ReferencePolicyConfigSchema,
    tags: z.array(z.string()).optional(),
  });
}

function createBasePostRequestSchema<TAmountSchema extends Erc20AmountSchema>(
  amountSchema: TAmountSchema,
) {
  return createCommonPublicationRequestSchema(amountSchema).extend({
    kind: z.literal(TransactionKind.CREATE_POST),
  });
}

export function createTextualPostRequestSchema<TAmountSchema extends Erc20AmountSchema>(
  amountSchema: TAmountSchema,
) {
  return createBasePostRequestSchema(amountSchema).extend({
    content: z.string(),
    contentFocus: z.enum([ContentFocus.ARTICLE, ContentFocus.LINK, ContentFocus.TEXT_ONLY]),
    media: z.array(MediaObjectSchema).optional(),
  });
}

export function createMediaPostRequestSchema<TAmountSchema extends Erc20AmountSchema>(
  amountSchema: TAmountSchema,
) {
  return createBasePostRequestSchema(amountSchema).extend({
    content: z.string().optional(),
    contentFocus: z.enum([ContentFocus.AUDIO, ContentFocus.IMAGE, ContentFocus.VIDEO]),
    media: z.array(MediaObjectSchema),
  });
}

export function createEmbedPostRequestSchema<TAmountSchema extends Erc20AmountSchema>(
  amountSchema: TAmountSchema,
) {
  return createBasePostRequestSchema(amountSchema).extend({
    animationUrl: z.string(),
    content: z.string().optional(),
    contentFocus: z.enum([ContentFocus.EMBED]),
    media: z.array(MediaObjectSchema).optional(),
  });
}

function createBaseCommentRequestSchema<TAmountSchema extends Erc20AmountSchema>(
  amountSchema: TAmountSchema,
) {
  return createCommonPublicationRequestSchema(amountSchema).extend({
    publicationId: PublicationIdSchema,
    kind: z.literal(TransactionKind.CREATE_COMMENT),
  });
}

export function createTextualCommentRequestSchema<TAmountSchema extends Erc20AmountSchema>(
  amountSchema: TAmountSchema,
) {
  return createBaseCommentRequestSchema(amountSchema).extend({
    content: z.string(),
    contentFocus: z.enum([ContentFocus.ARTICLE, ContentFocus.LINK, ContentFocus.TEXT_ONLY]),
    media: z.array(MediaObjectSchema).optional(),
  });
}

export function createMediaCommentRequestSchema<TAmountSchema extends Erc20AmountSchema>(
  amountSchema: TAmountSchema,
) {
  return createBaseCommentRequestSchema(amountSchema).extend({
    content: z.string().optional(),
    contentFocus: z.enum([ContentFocus.AUDIO, ContentFocus.IMAGE, ContentFocus.VIDEO]),
    media: z.array(MediaObjectSchema),
  });
}

export function createEmbedCommentRequestSchema<TAmountSchema extends Erc20AmountSchema>(
  amountSchema: TAmountSchema,
) {
  return createBaseCommentRequestSchema(amountSchema).extend({
    animationUrl: z.string(),
    content: z.string().optional(),
    contentFocus: z.enum([ContentFocus.EMBED]),
    media: z.array(MediaObjectSchema).optional(),
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
