import { TransactionKind } from '@lens-protocol/domain/entities';
import {
  CreateProfileRequest,
  FollowPolicyConfig,
  FollowPolicyType,
  FollowRequest,
  UpdateFollowPolicyRequest,
  UpdateProfileManagersRequest,
} from '@lens-protocol/domain/use-cases/profile';
import { UnknownObject } from '@lens-protocol/shared-kernel';
import { z } from 'zod';

import {
  DataSchema,
  Erc20AmountSchema,
  EvmAddressSchema,
  ProfileIdSchema,
  UriSchema,
} from './common';

export const CreateProfileRequestSchema: z.ZodType<
  CreateProfileRequest,
  z.ZodTypeDef,
  UnknownObject
> = z.object({
  kind: z.literal(TransactionKind.CREATE_PROFILE),
  localName: z.string(),
  approveSignless: z.boolean(),
  to: EvmAddressSchema,
});

const FollowRequestFeeSchema = z.object({
  amount: Erc20AmountSchema,
  contractAddress: z.string(),
  recipient: z.string(),
});

const FreeFollowRequestSchema = z.object({
  profileId: ProfileIdSchema,
  kind: z.literal(TransactionKind.FOLLOW_PROFILE),
  signless: z.boolean(),
  sponsored: z.boolean(),
});

const PaidFollowRequestSchema = z.object({
  profileId: ProfileIdSchema,
  kind: z.literal(TransactionKind.FOLLOW_PROFILE),
  fee: FollowRequestFeeSchema,
  signless: z.literal(false),
  sponsored: z.boolean(),
});
const UnknownFollowRequestSchema = z.object({
  profileId: ProfileIdSchema,
  kind: z.literal(TransactionKind.FOLLOW_PROFILE),
  address: EvmAddressSchema,
  data: DataSchema,
  signless: z.boolean(),
  sponsored: z.boolean(),
});

export const FollowRequestSchema: z.ZodType<FollowRequest, z.ZodTypeDef, UnknownObject> = z.union([
  PaidFollowRequestSchema,
  FreeFollowRequestSchema,
  UnknownFollowRequestSchema,
]);

export const UnfollowRequestSchema = z.object({
  profileId: ProfileIdSchema,
  kind: z.literal(TransactionKind.UNFOLLOW_PROFILE),
  signless: z.boolean(),
  sponsored: z.boolean(),
});

export const UpdateProfileManagersRequestSchema = z
  .object({
    approveSignless: z.boolean().optional(),
    add: EvmAddressSchema.array().min(1).optional(),
    remove: EvmAddressSchema.array().min(1).optional(),
    kind: z.literal(TransactionKind.UPDATE_PROFILE_MANAGERS),
    sponsored: z.boolean(),
  })
  .superRefine((val, ctx): val is UpdateProfileManagersRequest => {
    if (['add', 'remove', 'approveSignless'].every((key) => !(key in val))) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `At least one of 'add', 'remove', or 'approveSignless' must be present.`,
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

const UnknownFollowPolicyConfigSchema = z.object({
  type: z.literal(FollowPolicyType.UNKNOWN),
  address: EvmAddressSchema,
  data: DataSchema,
});

const FollowPolicyConfigSchema: z.ZodType<FollowPolicyConfig, z.ZodTypeDef, UnknownObject> =
  z.discriminatedUnion('type', [
    ChargeFollowPolicyConfigSchema,
    AnyoneFollowPolicyConfigSchema,
    NoOneFollowPolicyConfigSchema,
    UnknownFollowPolicyConfigSchema,
  ]);

export const UpdateFollowPolicyRequestSchema: z.ZodType<
  UpdateFollowPolicyRequest,
  z.ZodTypeDef,
  UnknownObject
> = z.object({
  policy: FollowPolicyConfigSchema,
  kind: z.literal(TransactionKind.UPDATE_FOLLOW_POLICY),
  signless: z.boolean(),
  sponsored: z.boolean(),
});

export const SetProfileMetadataRequestSchema = z.object({
  metadataURI: UriSchema,
  kind: z.literal(TransactionKind.UPDATE_PROFILE_DETAILS),
  signless: z.boolean(),
  sponsored: z.boolean(),
});

export const LinkHandleRequestSchema = z.object({
  fullHandle: z.string(),
  profileId: ProfileIdSchema,
  kind: z.literal(TransactionKind.LINK_HANDLE),
  signless: z.boolean(),
  sponsored: z.boolean(),
});

export const UnlinkHandleRequestSchema = z.object({
  fullHandle: z.string(),
  profileId: ProfileIdSchema,
  kind: z.literal(TransactionKind.UNLINK_HANDLE),
  signless: z.boolean(),
  sponsored: z.boolean(),
});

export const UnblockProfilesRequestSchema = z.object({
  profileIds: ProfileIdSchema.array().min(1),
  kind: z.literal(TransactionKind.UNBLOCK_PROFILE),
  signless: z.boolean(),
  sponsored: z.boolean(),
});

export const ClaimHandleRequestSchema = z.union([
  z.object({
    kind: z.literal(TransactionKind.CLAIM_HANDLE),
    localName: z.string(),
    followPolicy: FollowPolicyConfigSchema.optional(),
  }),
  z.object({
    kind: z.literal(TransactionKind.CLAIM_HANDLE),
    id: z.string(),
    handle: z.string(),
    followPolicy: FollowPolicyConfigSchema.optional(),
  }),
]);

export const BlockProfilesRequestSchema = z.object({
  profileIds: ProfileIdSchema.array().min(1),
  kind: z.literal(TransactionKind.BLOCK_PROFILE),
  signless: z.boolean(),
  sponsored: z.boolean(),
});
