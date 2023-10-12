/* eslint-disable no-fallthrough */
import {
  AnyTransactionRequestModel,
  ProtocolTransactionKind,
  ProtocolTransactionKinds,
  ProtocolTransactionRequestModel,
  TransactionKind,
} from '@lens-protocol/domain/entities';
import {
  AnyTransactionRequest,
  ProtocolTransactionRequest,
} from '@lens-protocol/domain/use-cases/transactions';
import { ChainType, UnknownObject } from '@lens-protocol/shared-kernel';
import { z } from 'zod';

import { TokenAllowanceRequestSchema } from './erc20';
import {
  CreateProfileRequestSchema,
  UnfollowRequestSchema,
  UpdateProfileManagersRequestSchema,
  UpdateProfileDetailsRequestSchema,
  UpdateFollowPolicyRequestSchema,
} from './profiles';
import {
  CreateCommentRequestSchema,
  CreateMirrorRequestSchema,
  CreatePostRequestSchema,
} from './publications';

function resolveProtocolTransactionRequestSchema(kind: ProtocolTransactionKind) {
  switch (kind) {
    case TransactionKind.CREATE_POST:
      return CreatePostRequestSchema;

    case TransactionKind.CREATE_COMMENT:
      return CreateCommentRequestSchema;

    case TransactionKind.MIRROR_PUBLICATION:
      return CreateMirrorRequestSchema;

    case TransactionKind.CREATE_PROFILE:
      return CreateProfileRequestSchema;

    case TransactionKind.UNFOLLOW_PROFILE:
      return UnfollowRequestSchema;

    case TransactionKind.UPDATE_PROFILE_MANAGERS:
      return UpdateProfileManagersRequestSchema;

    case TransactionKind.UPDATE_PROFILE_DETAILS:
      return UpdateProfileDetailsRequestSchema;

    case TransactionKind.UPDATE_FOLLOW_POLICY:
      return UpdateFollowPolicyRequestSchema;

    case TransactionKind.FOLLOW_PROFILES:
    // PaidFollowRequestSchema,
    // ProfileOwnerFollowRequestSchema,
    // UnconstrainedFollowRequestSchema,
    case TransactionKind.CREATE_QUOTE:
    case TransactionKind.COLLECT_PUBLICATION:
    // FreeCollectRequestSchema,
    // PaidCollectRequestSchema,
    default:
      throw new Error('Not implemented');
  }
}

function resolveAnyTransactionRequestSchema(kind: TransactionKind) {
  switch (kind) {
    case TransactionKind.APPROVE_MODULE:
      return TokenAllowanceRequestSchema;

    default:
      return resolveProtocolTransactionRequestSchema(kind);
  }
}

function refineProtocolTransactionRequest(
  val: ProtocolTransactionRequestModel,
): val is ProtocolTransactionRequest {
  const schema = resolveProtocolTransactionRequestSchema(val.kind);

  return schema.safeParse(val).success;
}

function toProtocolTransactionRequest(
  val: ProtocolTransactionRequestModel,
): ProtocolTransactionRequest {
  const schema = resolveProtocolTransactionRequestSchema(val.kind);

  return schema.parse(val);
}

const ProtocolTransactionRequestSchema: z.ZodType<
  ProtocolTransactionRequest,
  z.ZodTypeDef,
  UnknownObject
> = z
  .object({
    kind: z.enum(ProtocolTransactionKinds),
  })
  .passthrough()
  .refine(refineProtocolTransactionRequest)
  .transform(toProtocolTransactionRequest);

function refineAnyTransactionRequest(
  val: AnyTransactionRequestModel,
): val is AnyTransactionRequest {
  const schema = resolveAnyTransactionRequestSchema(val.kind);

  return schema.safeParse(val).success;
}

function toAnyTransactionRequest(val: AnyTransactionRequestModel): AnyTransactionRequest {
  const schema = resolveAnyTransactionRequestSchema(val.kind);

  return schema.parse(val);
}

const AnyTransactionRequestSchema: z.Schema<AnyTransactionRequest, z.ZodTypeDef, UnknownObject> = z
  .object({
    kind: z.nativeEnum(TransactionKind),
  })
  .passthrough()
  .refine(refineAnyTransactionRequest)
  .transform(toAnyTransactionRequest);

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
