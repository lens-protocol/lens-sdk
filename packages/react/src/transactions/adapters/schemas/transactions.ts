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
  SetProfileMetadataRequestSchema,
  UpdateFollowPolicyRequestSchema,
  FollowRequestSchema,
  LinkHandleRequestSchema,
  UnlinkHandleRequestSchema,
  UnblockProfilesRequestSchema,
  ClaimHandleRequestSchema,
  BlockProfilesRequestSchema,
} from './profiles';
import {
  OpenActionRequestSchema,
  CreateCommentRequestSchema,
  CreateMirrorRequestSchema,
  CreatePostRequestSchema,
  CreateQuoteRequestSchema,
} from './publications';

function resolveProtocolTransactionRequestSchema(
  kind: ProtocolTransactionKind,
): z.ZodType<ProtocolTransactionRequest, z.ZodTypeDef, UnknownObject> {
  switch (kind) {
    case TransactionKind.ACT_ON_PUBLICATION:
      return OpenActionRequestSchema;
    case TransactionKind.BLOCK_PROFILE:
      return BlockProfilesRequestSchema;
    case TransactionKind.CLAIM_HANDLE:
      return ClaimHandleRequestSchema;
    case TransactionKind.CREATE_COMMENT:
      return CreateCommentRequestSchema;
    case TransactionKind.CREATE_POST:
      return CreatePostRequestSchema;
    case TransactionKind.CREATE_PROFILE:
      return CreateProfileRequestSchema;
    case TransactionKind.CREATE_QUOTE:
      return CreateQuoteRequestSchema;
    case TransactionKind.FOLLOW_PROFILE:
      return FollowRequestSchema;
    case TransactionKind.LINK_HANDLE:
      return LinkHandleRequestSchema;
    case TransactionKind.MIRROR_PUBLICATION:
      return CreateMirrorRequestSchema;
    case TransactionKind.UNFOLLOW_PROFILE:
      return UnfollowRequestSchema;
    case TransactionKind.UNLINK_HANDLE:
      return UnlinkHandleRequestSchema;
    case TransactionKind.UPDATE_FOLLOW_POLICY:
      return UpdateFollowPolicyRequestSchema;
    case TransactionKind.UPDATE_PROFILE_DETAILS:
      return SetProfileMetadataRequestSchema;
    case TransactionKind.UPDATE_PROFILE_MANAGERS:
      return UpdateProfileManagersRequestSchema;
    case TransactionKind.UNBLOCK_PROFILE:
      return UnblockProfilesRequestSchema;

    default:
      throw new Error('Not implemented');
  }
}

function resolveAnyTransactionRequestSchema(
  kind: TransactionKind,
): z.ZodType<AnyTransactionRequest, z.ZodTypeDef, UnknownObject> {
  switch (kind) {
    case TransactionKind.APPROVE_MODULE:
      return TokenAllowanceRequestSchema;

    default:
      return resolveProtocolTransactionRequestSchema(kind);
  }
}

function refineProtocolTransactionRequest(
  val: ProtocolTransactionRequestModel,
  ctx: z.RefinementCtx,
): val is ProtocolTransactionRequest {
  const schema = resolveProtocolTransactionRequestSchema(val.kind);
  const result = schema.safeParse(val);

  if (!result.success) {
    result.error.issues.forEach((issue) => ctx.addIssue(issue));
  }
  return z.NEVER;
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
  .superRefine(refineProtocolTransactionRequest)
  .transform(toProtocolTransactionRequest);

function refineAnyTransactionRequest(
  val: AnyTransactionRequestModel,
  ctx: z.RefinementCtx,
): val is ProtocolTransactionRequest {
  const schema = resolveAnyTransactionRequestSchema(val.kind);
  const result = schema.safeParse(val);

  if (!result.success) {
    result.error.issues.forEach((issue) => ctx.addIssue(issue));
  }
  return z.NEVER;
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
  .superRefine(refineAnyTransactionRequest)
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
  relayerTxId: z.string(),
  txHash: z.string().nullable(),
  nonce: z.number(),
  request: ProtocolTransactionRequestSchema,
});

type MetaTransactionSchema = z.infer<typeof MetaTransactionSchema>;

const NativeTransactionSchema = z.object({
  type: z.literal(TransactionType.Native),
  chainType: z.nativeEnum(ChainType),
  id: z.string(),
  relayerTxId: z.string().optional(),
  txHash: z.string().nullable(),
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

export const TransactionListSchema = z.array(TransactionSchema);

export type TransactionListSchema = typeof TransactionListSchema;

export type TransactionList = z.infer<typeof TransactionListSchema>;
