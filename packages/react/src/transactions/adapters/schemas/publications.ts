import { TransactionKind } from '@lens-protocol/domain/entities';
import {
  CreateQuoteRequest,
  AllOpenActionType,
  CreateCommentRequest,
  CreateMirrorRequest,
  CreatePostRequest,
  OpenActionConfig,
  OpenActionType,
  RecipientWithSplit,
  ReferencePolicyType,
  OpenActionRequest,
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

const ReferrersSchema = z.union([PublicationIdSchema, ProfileIdSchema]).array().min(1);

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

const OpenActionConfigSchema: z.ZodType<OpenActionConfig, z.ZodTypeDef, UnknownObject> = z
  .discriminatedUnion('type', [
    SimpleCollectActionConfigSchema,
    MultirecipientCollectActionConfigSchema,
    UnknownOpenActionConfigSchema,
  ])
  .superRefine((val, ctx) => {
    if (val.type === OpenActionType.SIMPLE_COLLECT) {
      if (val.amount && !val.recipient) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'You must provide a recipient when specifying an amount',
          path: ['recipient'],
        });
      }
    }
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

const UnknownReferencePolicyConfigSchema = z.object({
  type: z.literal(ReferencePolicyType.UNKNOWN),
  address: EvmAddressSchema,
  data: DataSchema,
});

const ReferencePolicyConfigSchema = z.discriminatedUnion('type', [
  AnyoneReferencePolicyConfigSchema,
  DegreesOfSeparationReferencePolicyConfigSchema,
  FollowersOnlyReferencePolicyConfigSchema,
  NoReferencePolicyConfigSchema,
  UnknownReferencePolicyConfigSchema,
]);

export const CreatePostRequestSchema: z.ZodType<CreatePostRequest, z.ZodTypeDef, UnknownObject> =
  z.object({
    kind: z.literal(TransactionKind.CREATE_POST),
    signless: z.boolean(),
    sponsored: z.boolean(),
    metadata: UriSchema,
    reference: ReferencePolicyConfigSchema.default({ type: ReferencePolicyType.ANYONE }),
    actions: OpenActionConfigSchema.array().default([]),
  });

export const CreateCommentRequestSchema: z.ZodType<
  CreateCommentRequest,
  z.ZodTypeDef,
  UnknownObject
> = z.object({
  kind: z.literal(TransactionKind.CREATE_COMMENT),
  signless: z.boolean(),
  sponsored: z.boolean(),
  metadata: UriSchema,
  commentOn: PublicationIdSchema,
  commentOnReferenceData: DataSchema.optional(),
  referrers: ReferrersSchema.optional(),
  reference: ReferencePolicyConfigSchema.default({ type: ReferencePolicyType.ANYONE }),
  actions: OpenActionConfigSchema.array().default([]),
});

export const CreateQuoteRequestSchema: z.ZodType<CreateQuoteRequest, z.ZodTypeDef, UnknownObject> =
  z.object({
    kind: z.literal(TransactionKind.CREATE_QUOTE),
    signless: z.boolean(),
    sponsored: z.boolean(),
    metadata: UriSchema,
    quoteOn: PublicationIdSchema,
    quoteOnReferenceData: DataSchema.optional(),
    referrers: ReferrersSchema.optional(),
    reference: ReferencePolicyConfigSchema.default({ type: ReferencePolicyType.ANYONE }),
    actions: OpenActionConfigSchema.array().default([]),
  });

export const CreateMirrorRequestSchema: z.ZodType<
  CreateMirrorRequest,
  z.ZodTypeDef,
  UnknownObject
> = z.object({
  mirrorOn: PublicationIdSchema,
  mirrorOnReferenceData: DataSchema.optional(),
  referrers: ReferrersSchema.optional(),
  kind: z.literal(TransactionKind.MIRROR_PUBLICATION),
  signless: z.boolean(),
  sponsored: z.boolean(),
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
  publicationId: PublicationIdSchema,
  referrer: PublicationIdSchema.optional(),
  fee: CollectFeeSchema.optional(),
  public: z.literal(false),
  signless: z.boolean(),
  sponsored: z.boolean(),
});

export const SimpleCollectRequestSchema = BaseCollectRequestSchema.extend({
  type: z.literal(AllOpenActionType.SIMPLE_COLLECT),
  publicationId: PublicationIdSchema,
  referrers: ReferrersSchema.optional(),
  fee: CollectFeeSchema.optional(),
  public: z.boolean(),
  signless: z.boolean(),
  sponsored: z.boolean(),
});

export const MultirecipientCollectRequestSchema = BaseCollectRequestSchema.extend({
  type: z.literal(AllOpenActionType.MULTIRECIPIENT_COLLECT),
  publicationId: PublicationIdSchema,
  referrers: ReferrersSchema.optional(),
  fee: CollectFeeSchema,
  public: z.boolean(),
  signless: z.boolean(),
  sponsored: z.boolean(),
});

export const UnknownActionRequestSchema = BaseCollectRequestSchema.extend({
  type: z.literal(AllOpenActionType.UNKNOWN_OPEN_ACTION),
  publicationId: PublicationIdSchema,
  address: EvmAddressSchema,
  data: DataSchema,
  referrers: ReferrersSchema.optional(),
  public: z.boolean(),
  signless: z.boolean(),
  sponsored: z.boolean(),
});

export const OpenActionRequestSchema: z.ZodType<OpenActionRequest, z.ZodTypeDef, UnknownObject> =
  z.discriminatedUnion('type', [
    LegacyCollectRequestSchema,
    SimpleCollectRequestSchema,
    MultirecipientCollectRequestSchema,
    UnknownActionRequestSchema,
  ]);
