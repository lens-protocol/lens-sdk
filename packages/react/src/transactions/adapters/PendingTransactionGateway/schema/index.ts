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

const ProtocolTransactionRequestSchema = z.union([
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

  UnfollowRequestSchema,

  UpdateDispatcherConfigRequestSchema,

  UpdateFollowPolicyRequestSchema,

  UpdateProfileDetailsRequestSchema,

  // UpdateProfileImageRequest schemas
  UpdateNftProfileImageRequestSchema,
  UpdateOffChainProfileImageRequestSchema,
]);

const AnyTransactionRequestSchema = z.union([
  TokenAllowanceRequestSchema,

  ProtocolTransactionRequestSchema,
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

export const TransactionSchema = z.union([
  MetaTransactionSchema,
  NativeTransactionSchema,
  ProxyTransactionSchema,
]);

export type TransactionSchema = z.infer<typeof TransactionSchema>;

export const TransactionStorageSchema = z.array(TransactionSchema);

export type TransactionStorageSchema = z.infer<typeof TransactionStorageSchema>;
