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
import { Erc20AmountSchema, ProfileIdSchema } from './common';

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

const ChargeCollectPolicySchema = z.object({
  type: z.literal(CollectPolicyType.CHARGE),
  fee: Erc20AmountSchema,
  recipient: z.string(),
  metadata: NftMetadataSchema,
  mirrorReward: z.number(),
  collectLimit: z.number().optional(),
  timeLimited: z.boolean(),
  followersOnly: z.boolean(),
});

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
  profileId: ProfileIdSchema,
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
  profileId: ProfileIdSchema,
  kind: z.literal(TransactionKind.CREATE_COMMENT),
  locale: z.string(),
  delegate: z.boolean(),
});

export const CreateMirrorRequestSchema = z.object({
  profileId: ProfileIdSchema,
  publicationId: z.string(),
  kind: z.literal(TransactionKind.MIRROR_PUBLICATION),
  delegate: z.boolean(),
});

export const FreeCollectRequestSchema = z.object({
  profileId: ProfileIdSchema,
  type: z.literal(CollectType.FREE),
  publicationId: z.string(),
  kind: z.literal(TransactionKind.COLLECT_PUBLICATION),
});

const CollectFeeSchema = z.object({
  amount: Erc20AmountSchema,
  contractAddress: z.string(),
});

export const PaidCollectRequestSchema = z.object({
  profileId: ProfileIdSchema,
  type: z.literal(CollectType.PAID),
  publicationId: z.string(),
  fee: CollectFeeSchema,
  kind: z.literal(TransactionKind.COLLECT_PUBLICATION),
});
