import { TransactionKind } from '@lens-protocol/domain/entities';
import { FollowPolicyType } from '@lens-protocol/domain/use-cases/profile';
import { z } from 'zod';

import { Erc20AmountSchema, ProfileIdSchema } from './common';

export const CreateProfileRequestSchema = z.object({
  handle: z.string(),
  kind: z.literal(TransactionKind.CREATE_PROFILE),
});

const FollowRequestFeeSchema = z.object({
  amount: Erc20AmountSchema,
  contractAddress: z.string(),
  recipient: z.string(),
});

export const UnconstrainedFollowRequestSchema = z.object({
  followerAddress: z.string(),
  profileId: ProfileIdSchema,
  kind: z.literal(TransactionKind.FOLLOW_PROFILES),
});

export const PaidFollowRequestSchema = z.object({
  followerAddress: z.string(),
  profileId: ProfileIdSchema,
  kind: z.literal(TransactionKind.FOLLOW_PROFILES),
  fee: FollowRequestFeeSchema,
});

export const ProfileOwnerFollowRequestSchema = z.object({
  followerAddress: z.string(),
  profileId: ProfileIdSchema,
  kind: z.literal(TransactionKind.FOLLOW_PROFILES),
  followerProfileId: z.string(),
});

export const UnfollowRequestSchema = z.object({
  profileId: ProfileIdSchema,
  kind: z.literal(TransactionKind.UNFOLLOW_PROFILE),
});

export const UpdateDispatcherConfigRequestSchema = z.object({
  profileId: ProfileIdSchema,
  enabled: z.boolean(),
  kind: z.literal(TransactionKind.UPDATE_DISPATCHER_CONFIG),
});

const ChargeFollowPolicySchema = z.object({
  type: z.literal(FollowPolicyType.CHARGE),
  amount: Erc20AmountSchema,
  recipient: z.string(),
});

const NoFeeFollowPolicySchema = z.object({
  type: z.union([
    z.literal(FollowPolicyType.ANYONE),
    z.literal(FollowPolicyType.ONLY_PROFILE_OWNERS),
    z.literal(FollowPolicyType.NO_ONE),
  ]),
});

export const UpdateFollowPolicyRequestSchema = z.object({
  profileId: ProfileIdSchema,
  policy: z.union([ChargeFollowPolicySchema, NoFeeFollowPolicySchema]),
  kind: z.literal(TransactionKind.UPDATE_FOLLOW_POLICY),
});

const PartialAttributesUpdateSchema = z.record(
  z.union([z.boolean(), z.date(), z.number(), z.string(), z.null()]),
);

export const UpdateProfileDetailsRequestSchema = z.object({
  attributes: PartialAttributesUpdateSchema.optional(),
  bio: z.string().nullable().optional(),
  coverPicture: z.string().nullable().optional(),
  name: z.string(),
  profileId: ProfileIdSchema,
  kind: z.literal(TransactionKind.UPDATE_PROFILE_DETAILS),
  delegate: z.boolean(),
});

const NftOwnershipSignatureSchema = z.object({
  id: z.string(),
  signature: z.string(),
});

export const UpdateNftProfileImageRequestSchema = z.object({
  kind: z.literal(TransactionKind.UPDATE_PROFILE_IMAGE),
  profileId: ProfileIdSchema,
  signature: NftOwnershipSignatureSchema,
  delegate: z.boolean(),
});

export const UpdateOffChainProfileImageRequestSchema = z.object({
  url: z.string(),
  kind: z.literal(TransactionKind.UPDATE_PROFILE_IMAGE),
  profileId: ProfileIdSchema,
  delegate: z.boolean(),
});
