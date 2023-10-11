import { TransactionKind } from '@lens-protocol/domain/entities';
import { FollowPolicyType } from '@lens-protocol/domain/use-cases/profile';
import { z } from 'zod';

import {
  Erc20AmountSchema,
  EvmAddressSchema,
  ProfileIdSchema,
  SerializedErc20AmountSchema,
  SignatureSchema,
} from './common';

export const CreateProfileRequestSchema = z.object({
  handle: z.string(),
  kind: z.literal(TransactionKind.CREATE_PROFILE),
});

const FollowRequestFeeSchema = z.object({
  amount: SerializedErc20AmountSchema,
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

export const UpdateProfileManagersRequestSchema = z.object({
  lensManager: z.boolean().optional(),
  add: EvmAddressSchema.array().min(1).optional(),
  remove: EvmAddressSchema.array().min(1).optional(),
  kind: z.literal(TransactionKind.UPDATE_PROFILE_MANAGERS),
});

function chargeFollowPolicyConfigSchema<TAmountSchema extends Erc20AmountSchema>(
  amountSchema: TAmountSchema,
) {
  return z.object({
    type: z.literal(FollowPolicyType.CHARGE),
    amount: amountSchema,
    recipient: z.string(),
  });
}

const AnyoneFollowPolicyConfigSchema = z.object({
  type: z.literal(FollowPolicyType.ANYONE),
});

const OnlyProfileOwnersFollowPolicyConfigSchema = z.object({
  type: z.literal(FollowPolicyType.ONLY_PROFILE_OWNERS),
});

const NoOneFollowPolicyConfigSchema = z.object({
  type: z.literal(FollowPolicyType.NO_ONE),
});

export function updateFollowPolicyRequestSchema<TAmountSchema extends Erc20AmountSchema>(
  amountSchema: TAmountSchema,
) {
  return z.object({
    profileId: ProfileIdSchema,
    policy: z.discriminatedUnion('type', [
      chargeFollowPolicyConfigSchema(amountSchema),
      AnyoneFollowPolicyConfigSchema,
      OnlyProfileOwnersFollowPolicyConfigSchema,
      NoOneFollowPolicyConfigSchema,
    ]),
    kind: z.literal(TransactionKind.UPDATE_FOLLOW_POLICY),
  });
}

const PartialAttributesUpdateSchema = z.record(
  z.union([z.boolean(), z.coerce.date(), z.number(), z.string(), z.null()]),
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
  signature: SignatureSchema,
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
