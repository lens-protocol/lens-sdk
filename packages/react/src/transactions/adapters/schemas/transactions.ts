import {
  AnyTransactionRequest,
  ProtocolTransactionRequest,
} from '@lens-protocol/domain/use-cases/transactions';
import { ChainType, UnknownObject } from '@lens-protocol/shared-kernel';
import { z } from 'zod';

import { SerializedErc20AmountSchema } from './common';
import { tokenAllowanceRequestSchema } from './erc20';
import {
  CreateProfileRequestSchema,
  PaidFollowRequestSchema,
  ProfileOwnerFollowRequestSchema,
  UnconstrainedFollowRequestSchema,
  UnfollowRequestSchema,
  UpdateProfileManagersRequestSchema,
  updateFollowPolicyRequestSchema,
  UpdateNftProfileImageRequestSchema,
  UpdateOffChainProfileImageRequestSchema,
  UpdateProfileDetailsRequestSchema,
} from './profiles';
import {
  createEmbedCommentRequestSchema,
  createEmbedPostRequestSchema,
  createMediaCommentRequestSchema,
  createMediaPostRequestSchema,
  CreateMirrorRequestSchema,
  createTextualCommentRequestSchema,
  createTextualPostRequestSchema,
  FreeCollectRequestSchema,
  PaidCollectRequestSchema,
} from './publications';

// the repetition of the schemas compared to AnyTransactionRequestSchema
// is intentional due to https://github.com/colinhacks/zod/issues/2106
const ProtocolTransactionRequestSchema: z.Schema<
  ProtocolTransactionRequest,
  z.ZodTypeDef,
  UnknownObject
> = z.union([
  // CollectRequest schemas
  FreeCollectRequestSchema,
  PaidCollectRequestSchema,

  // FollowRequest schemas
  PaidFollowRequestSchema,
  ProfileOwnerFollowRequestSchema,
  UnconstrainedFollowRequestSchema,

  // CreatePostRequest schemas
  createEmbedPostRequestSchema(SerializedErc20AmountSchema),
  createMediaPostRequestSchema(SerializedErc20AmountSchema),
  createTextualPostRequestSchema(SerializedErc20AmountSchema),

  // CreateCommentRequest schemas
  createEmbedCommentRequestSchema(SerializedErc20AmountSchema),
  createMediaCommentRequestSchema(SerializedErc20AmountSchema),
  createTextualCommentRequestSchema(SerializedErc20AmountSchema),

  CreateMirrorRequestSchema,

  CreateProfileRequestSchema,

  UnfollowRequestSchema,

  UpdateProfileManagersRequestSchema,

  updateFollowPolicyRequestSchema(SerializedErc20AmountSchema),

  UpdateProfileDetailsRequestSchema,

  // UpdateProfileImageRequest schemas
  UpdateNftProfileImageRequestSchema,
  UpdateOffChainProfileImageRequestSchema,
]);

// the repetition of the schemas compared to ProtocolTransactionRequestSchema
// is intentional due to https://github.com/colinhacks/zod/issues/2106
const AnyTransactionRequestSchema: z.Schema<AnyTransactionRequest, z.ZodTypeDef, UnknownObject> =
  z.union([
    tokenAllowanceRequestSchema(SerializedErc20AmountSchema),

    // CollectRequest schemas
    FreeCollectRequestSchema,
    PaidCollectRequestSchema,

    // FollowRequest schemas
    PaidFollowRequestSchema,
    ProfileOwnerFollowRequestSchema,
    UnconstrainedFollowRequestSchema,

    // CreatePostRequest schemas
    createEmbedPostRequestSchema(SerializedErc20AmountSchema),
    createMediaPostRequestSchema(SerializedErc20AmountSchema),
    createTextualPostRequestSchema(SerializedErc20AmountSchema),

    // CreateCommentRequest schemas
    createEmbedCommentRequestSchema(SerializedErc20AmountSchema),
    createMediaCommentRequestSchema(SerializedErc20AmountSchema),
    createTextualCommentRequestSchema(SerializedErc20AmountSchema),

    CreateMirrorRequestSchema,

    CreateProfileRequestSchema,

    UnfollowRequestSchema,

    UpdateProfileManagersRequestSchema,

    updateFollowPolicyRequestSchema(SerializedErc20AmountSchema),

    UpdateProfileDetailsRequestSchema,

    // UpdateProfileImageRequest schemas
    UpdateNftProfileImageRequestSchema,
    UpdateOffChainProfileImageRequestSchema,
  ]);

export enum TransactionType {
  Native,
  Meta,
  Data,
}

const MetaTransactionSchema = z.object({
  type: z.literal(TransactionType.Meta),
  chainType: z.nativeEnum(ChainType),
  id: z.string(),
  indexingId: z.string(),
  txHash: z.string().nullable(),
  nonce: z.number(),
  request: ProtocolTransactionRequestSchema,
});

type MetaTransactionSchema = z.infer<typeof MetaTransactionSchema>;

const NativeTransactionSchema = z.object({
  type: z.literal(TransactionType.Native),
  chainType: z.nativeEnum(ChainType),
  id: z.string(),
  indexingId: z.string().optional(),
  txHash: z.string(),
  request: AnyTransactionRequestSchema,
});

type NativeTransactionSchema = z.infer<typeof NativeTransactionSchema>;

const DataTransactionSchema = z.object({
  type: z.literal(TransactionType.Data),
  id: z.string(),
  request: ProtocolTransactionRequestSchema,
});

type DataTransactionSchema = z.infer<typeof DataTransactionSchema>;

export const TransactionSchema = z.discriminatedUnion('type', [
  MetaTransactionSchema,
  NativeTransactionSchema,
  DataTransactionSchema,
]);

export type TransactionSchema = z.infer<typeof TransactionSchema>;

export const TransactionStorageSchema = z.array(TransactionSchema);

export type TransactionStorageSchema = z.infer<typeof TransactionStorageSchema>;
