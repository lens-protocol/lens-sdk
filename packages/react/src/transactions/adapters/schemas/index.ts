import { ProxyActionStatus } from '@lens-protocol/domain/entities';
import {
  AnyTransactionRequest,
  ProtocolTransactionRequest,
} from '@lens-protocol/domain/use-cases/transactions';
import { ChainType, UnknownObject } from '@lens-protocol/shared-kernel';
import { z } from 'zod';

import { TokenAllowanceRequestSchema } from './erc20';
import {
  CreateProfileRequestSchema,
  PaidFollowRequestSchema,
  ProfileOwnerFollowRequestSchema,
  UnconstrainedFollowRequestSchema,
  UnfollowRequestSchema,
  UpdateDispatcherConfigRequestSchema,
  UpdateFollowPolicyRequestSchema,
  UpdateNftProfileImageRequestSchema,
  UpdateOffChainProfileImageRequestSchema,
  UpdateProfileDetailsRequestSchema,
} from './profiles';
import {
  CreateEmbedCommentRequestSchema,
  CreateEmbedPostRequestSchema,
  CreateMediaCommentRequestSchema,
  CreateMediaPostRequestSchema,
  CreateMirrorRequestSchema,
  CreateTextualCommentRequestSchema,
  CreateTextualPostRequestSchema,
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
  CreateEmbedPostRequestSchema,
  CreateMediaPostRequestSchema,
  CreateTextualPostRequestSchema,

  // CreateCommentRequest schemas
  CreateEmbedCommentRequestSchema,
  CreateMediaCommentRequestSchema,
  CreateTextualCommentRequestSchema,

  CreateMirrorRequestSchema,

  CreateProfileRequestSchema,

  UnfollowRequestSchema,

  UpdateDispatcherConfigRequestSchema,

  UpdateFollowPolicyRequestSchema,

  UpdateProfileDetailsRequestSchema,

  // UpdateProfileImageRequest schemas
  UpdateNftProfileImageRequestSchema,
  UpdateOffChainProfileImageRequestSchema,
]);

// the repetition of the schemas compared to ProtocolTransactionRequestSchema
// is intentional due to https://github.com/colinhacks/zod/issues/2106
const AnyTransactionRequestSchema: z.Schema<AnyTransactionRequest, z.ZodTypeDef, UnknownObject> =
  z.union([
    TokenAllowanceRequestSchema,

    // CollectRequest schemas
    FreeCollectRequestSchema,
    PaidCollectRequestSchema,

    // FollowRequest schemas
    PaidFollowRequestSchema,
    ProfileOwnerFollowRequestSchema,
    UnconstrainedFollowRequestSchema,

    // CreatePostRequest schemas
    CreateEmbedPostRequestSchema,
    CreateMediaPostRequestSchema,
    CreateTextualPostRequestSchema,

    // CreateCommentRequest schemas
    CreateEmbedCommentRequestSchema,
    CreateMediaCommentRequestSchema,
    CreateTextualCommentRequestSchema,

    CreateMirrorRequestSchema,

    CreateProfileRequestSchema,

    UnfollowRequestSchema,

    UpdateDispatcherConfigRequestSchema,

    UpdateFollowPolicyRequestSchema,

    UpdateProfileDetailsRequestSchema,

    // UpdateProfileImageRequest schemas
    UpdateNftProfileImageRequestSchema,
    UpdateOffChainProfileImageRequestSchema,
  ]);

export enum TransactionType {
  Native,
  Meta,
  Proxy,
  Data,
}

const MetaTransactionSchema = z.object({
  type: z.literal(TransactionType.Meta),
  chainType: z.nativeEnum(ChainType),
  id: z.string(),
  indexingId: z.string(),
  txHash: z.string(),
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

const ProxyTransactionSchema = z.object({
  type: z.literal(TransactionType.Proxy),
  chainType: z.nativeEnum(ChainType),
  id: z.string(),
  proxyId: z.string(),
  txHash: z.string().optional(),
  status: z.nativeEnum(ProxyActionStatus).optional(),
  request: ProtocolTransactionRequestSchema,
});

type ProxyTransactionSchema = z.infer<typeof ProxyTransactionSchema>;

const DataTransactionSchema = z.object({
  type: z.literal(TransactionType.Data),
  id: z.string(),
  request: ProtocolTransactionRequestSchema,
});

type DataTransactionSchema = z.infer<typeof DataTransactionSchema>;

export const TransactionSchema = z.discriminatedUnion('type', [
  MetaTransactionSchema,
  NativeTransactionSchema,
  ProxyTransactionSchema,
  DataTransactionSchema,
]);

export type TransactionSchema = z.infer<typeof TransactionSchema>;

export const TransactionStorageSchema = z.array(TransactionSchema);

export type TransactionStorageSchema = z.infer<typeof TransactionStorageSchema>;
