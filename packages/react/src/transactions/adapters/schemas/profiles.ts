import { TransactionKind } from '@lens-protocol/domain/entities';
import {
  FollowPolicyType,
  UpdateFollowPolicyRequest,
  UpdateProfileManagersRequest,
} from '@lens-protocol/domain/use-cases/profile';
import { UnknownObject } from '@lens-protocol/shared-kernel';
import { z } from 'zod';

import { Erc20AmountSchema, EvmAddressSchema, ProfileIdSchema } from './common';

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

export const UpdateProfileManagersRequestSchema = z
  .object({
    lensManager: z.boolean().optional(),
    add: EvmAddressSchema.array().min(1).optional(),
    remove: EvmAddressSchema.array().min(1).optional(),
    kind: z.literal(TransactionKind.UPDATE_PROFILE_MANAGERS),
  })
  .superRefine((val, ctx): val is UpdateProfileManagersRequest => {
    if (['add', 'remove', 'lensManager'].every((key) => !(key in val))) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `At least one of 'add', 'remove', or 'lensManager' must be present.`,
      });
      return z.NEVER;
    }
    // TODO add further checks needed

    return z.NEVER;
  });

const ChargeFollowPolicyConfigSchema = z.object({
  type: z.literal(FollowPolicyType.CHARGE),
  amount: Erc20AmountSchema,
  recipient: z.string(),
});

const AnyoneFollowPolicyConfigSchema = z.object({
  type: z.literal(FollowPolicyType.ANYONE),
});

const NoOneFollowPolicyConfigSchema = z.object({
  type: z.literal(FollowPolicyType.NO_ONE),
});

export const UpdateFollowPolicyRequestSchema: z.ZodType<
  UpdateFollowPolicyRequest,
  z.ZodTypeDef,
  UnknownObject
> = z.object({
  policy: z.discriminatedUnion('type', [
    ChargeFollowPolicyConfigSchema,
    AnyoneFollowPolicyConfigSchema,
    NoOneFollowPolicyConfigSchema,
  ]),
  kind: z.literal(TransactionKind.UPDATE_FOLLOW_POLICY),
});

export const UpdateProfileDetailsRequestSchema = z.object({
  metadataURI: z.string().url(),
  kind: z.literal(TransactionKind.UPDATE_PROFILE_DETAILS),
  delegate: z.boolean(),
});
