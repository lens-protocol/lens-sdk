import { TransactionKind } from '@lens-protocol/domain/entities';
import { CreateQuoteRequest } from '@lens-protocol/domain/src/use-cases/publications/CreateQuote';
import {
  AllOpenActionType,
  CreateCommentRequest,
  CreateMirrorRequest,
  CreatePostRequest,
  OpenActionConfig,
  OpenActionType,
  RecipientWithSplit,
  ReferencePolicyType,
} from '@lens-protocol/domain/use-cases/publications';
import { UnknownObject } from '@lens-protocol/shared-kernel';
import { z } from 'zod';

import {
  Erc20AmountSchema,
  ProfileIdSchema,
  PublicationIdSchema,
  UriSchema,
  EvmAddressSchema,
  DataSchema,
} from './common';

const RecipientWithSplitSchema: z.ZodType<RecipientWithSplit, z.ZodTypeDef, UnknownObject> =
  z.object({
    recipient: EvmAddressSchema,
    split: z.number(),
  });

const SimpleCollectActionConfigSchema = z.object({
  type: z.literal(OpenActionType.SIMPLE_COLLECT),
  amount: Erc20AmountSchema.optional(),
  followerOnly: z.boolean(),
  referralFee: z.number().optional(),
  collectLimit: z.number().optional(),
  recipient: EvmAddressSchema.optional(),
  endsAt: z.coerce.date().min(new Date()).optional(),
});

const MultirecipientCollectActionConfigSchema = z.object({
  type: z.literal(OpenActionType.MULTIRECIPIENT_COLLECT),
  amount: Erc20AmountSchema,
  followerOnly: z.boolean(),
  referralFee: z.number().optional(),
  collectLimit: z.number().optional(),
  recipients: z.array(RecipientWithSplitSchema),
  endsAt: z.coerce.date().min(new Date()).optional(),
});

const UnknownOpenActionConfigSchema = z.object({
  type: z.literal(OpenActionType.UNKNOWN_OPEN_ACTION),
  address: EvmAddressSchema,
  data: DataSchema,
});

const OpenActionConfigSchema: z.ZodType<OpenActionConfig, z.ZodTypeDef, UnknownObject> =
  z.discriminatedUnion('type', [
    SimpleCollectActionConfigSchema,
    MultirecipientCollectActionConfigSchema,
    UnknownOpenActionConfigSchema,
  ]);

const AnyoneReferencePolicyConfigSchema = z.object({
  type: z.literal(ReferencePolicyType.ANYONE),
});

const DegreesOfSeparationReferencePolicyConfigSchema = z.object({
  type: z.literal(ReferencePolicyType.DEGREES_OF_SEPARATION),
  params: z.object({
    commentsRestricted: z.boolean(),
    mirrorsRestricted: z.boolean(),
    degreesOfSeparation: z.number(),
    quotesRestricted: z.boolean(),
    sourceProfileId: ProfileIdSchema.optional(),
  }),
});

const FollowersOnlyReferencePolicyConfigSchema = z.object({
  type: z.literal(ReferencePolicyType.FOLLOWERS_ONLY),
});

const NoReferencePolicyConfigSchema = z.object({
  type: z.literal(ReferencePolicyType.NO_ONE),
});

const ReferencePolicyConfigSchema = z.discriminatedUnion('type', [
  AnyoneReferencePolicyConfigSchema,
  DegreesOfSeparationReferencePolicyConfigSchema,
  FollowersOnlyReferencePolicyConfigSchema,
  NoReferencePolicyConfigSchema,
]);

export const CreatePostRequestSchema: z.ZodType<CreatePostRequest, z.ZodTypeDef, UnknownObject> =
  z.object({
    kind: z.literal(TransactionKind.CREATE_POST),
    delegate: z.boolean(),
    metadata: UriSchema,
    reference: ReferencePolicyConfigSchema.optional(),
    actions: OpenActionConfigSchema.array()
      .min(1, 'You must provide at least one open action')
      .optional(),
  });

export const CreateCommentRequestSchema: z.ZodType<
  CreateCommentRequest,
  z.ZodTypeDef,
  UnknownObject
> = z.object({
  kind: z.literal(TransactionKind.CREATE_COMMENT),
  delegate: z.boolean(),
  metadata: UriSchema,
  commentOn: PublicationIdSchema,
  reference: ReferencePolicyConfigSchema.optional(),
  actions: OpenActionConfigSchema.array()
    .min(1, 'You must provide at least one open action')
    .optional(),
});

export const CreateQuoteRequestSchema: z.ZodType<CreateQuoteRequest, z.ZodTypeDef, UnknownObject> =
  z.object({
    kind: z.literal(TransactionKind.CREATE_QUOTE),
    delegate: z.boolean(),
    metadata: UriSchema,
    quoteOn: PublicationIdSchema,
    reference: ReferencePolicyConfigSchema.optional(),
    actions: OpenActionConfigSchema.array()
      .min(1, 'You must provide at least one open action')
      .optional(),
  });

export const CreateMirrorRequestSchema: z.ZodType<
  CreateMirrorRequest,
  z.ZodTypeDef,
  UnknownObject
> = z.object({
  mirrorOn: PublicationIdSchema,
  kind: z.literal(TransactionKind.MIRROR_PUBLICATION),
  delegate: z.boolean(),
});

const CollectFeeSchema = z.object({
  amount: Erc20AmountSchema,
  contractAddress: EvmAddressSchema,
});

const BaseCollectRequestSchema = z.object({
  kind: z.literal(TransactionKind.ACT_ON_PUBLICATION),
  publicationId: PublicationIdSchema,
});

export const LegacyCollectRequestSchema = BaseCollectRequestSchema.extend({
  type: z.literal(AllOpenActionType.LEGACY_COLLECT),
  delegate: z.boolean(),
  publicationId: PublicationIdSchema,
  referrer: PublicationIdSchema.optional(),
  fee: CollectFeeSchema.optional(),
});

export const SimpleCollectRequestSchema = BaseCollectRequestSchema.extend({
  type: z.literal(AllOpenActionType.SIMPLE_COLLECT),
  delegate: z.boolean(),
  publicationId: PublicationIdSchema,
  referrers: z.union([PublicationIdSchema, ProfileIdSchema]).array().min(1).optional(),
  fee: CollectFeeSchema.optional(),
});

export const MultirecipientCollectRequestSchema = BaseCollectRequestSchema.extend({
  type: z.literal(AllOpenActionType.MULTIRECIPIENT_COLLECT),
  publicationId: PublicationIdSchema,
  referrers: z.union([PublicationIdSchema, ProfileIdSchema]).array().min(1).optional(),
  fee: CollectFeeSchema,
});

export const UnknownActionRequestSchema = BaseCollectRequestSchema.extend({
  type: z.literal(AllOpenActionType.UNKNOWN_OPEN_ACTION),
  delegate: z.boolean(),
  publicationId: PublicationIdSchema,
  address: EvmAddressSchema,
  data: DataSchema,
});

export const CollectRequestSchema = z.discriminatedUnion('type', [
  LegacyCollectRequestSchema,
  SimpleCollectRequestSchema,
  MultirecipientCollectRequestSchema,
  UnknownActionRequestSchema,
]);
