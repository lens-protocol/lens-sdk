import { ProxyActionStatus } from '@lens-protocol/domain/entities';
import { ChainType } from '@lens-protocol/shared-kernel';
import { z } from 'zod';

import { TokenAllowanceRequestSchema } from './erc20';
import {
  CreateProfileRequestSchema,
  UnconstrainedFollowRequestSchema,
  PaidFollowRequestSchema,
  ProfileOwnerFollowRequestSchema,
  UnfollowRequestSchema,
  UpdateCoverImageRequestSchema,
  UpdateDispatcherConfigRequestSchema,
  UpdateFollowPolicyRequestSchema,
  UpdateNftProfileImageRequestSchema,
  UpdateOffChainProfileImageRequestSchema,
  UpdateProfileDetailsRequestSchema,
} from './profiles';
import {
  CreateCommentRequestSchema,
  CreateMirrorRequestSchema,
  CreatePostRequestSchema,
  FreeCollectRequestSchema,
  PaidCollectRequestSchema,
} from './publications';

const SupportedRequestModelSchema = z.union([
  // CollectRequest schemas
  FreeCollectRequestSchema,
  PaidCollectRequestSchema,

  // FollowRequest schemas
  UnconstrainedFollowRequestSchema,
  PaidFollowRequestSchema,
  ProfileOwnerFollowRequestSchema,

  CreatePostRequestSchema,

  CreateCommentRequestSchema,

  CreateMirrorRequestSchema,

  CreateProfileRequestSchema,

  TokenAllowanceRequestSchema,

  UnfollowRequestSchema,

  UpdateCoverImageRequestSchema,

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
}

const MetaTransactionSchema = z.object({
  type: z.literal(TransactionType.Meta),
  chainType: z.nativeEnum(ChainType),
  id: z.string(),
  indexingId: z.string(),
  txHash: z.string(),
  nonce: z.number(),
  request: SupportedRequestModelSchema,
});

type MetaTransactionSchema = z.infer<typeof MetaTransactionSchema>;

const NativeTransactionSchema = z.object({
  type: z.literal(TransactionType.Native),
  chainType: z.nativeEnum(ChainType),
  id: z.string(),
  indexingId: z.string().optional(),
  txHash: z.string(),
  request: SupportedRequestModelSchema,
});

type NativeTransactionSchema = z.infer<typeof NativeTransactionSchema>;

const ProxyTransactionSchema = z.object({
  type: z.literal(TransactionType.Proxy),
  chainType: z.nativeEnum(ChainType),
  id: z.string(),
  proxyId: z.string(),
  txHash: z.string().optional(),
  status: z.nativeEnum(ProxyActionStatus).optional(),
  request: SupportedRequestModelSchema,
});

type ProxyTransactionSchema = z.infer<typeof ProxyTransactionSchema>;

export const TransactionSchema = z.union([
  MetaTransactionSchema,
  NativeTransactionSchema,
  ProxyTransactionSchema,
]);

export type TransactionSchema = z.infer<typeof TransactionSchema>;

export const TransactionStorageSchema = z.array(TransactionSchema);

export type TransactionStorageSchema = z.infer<typeof TransactionStorageSchema>;
