import {
  FollowRequest,
  UnfollowRequest,
  UpdateFollowPolicyRequest,
  SetProfileMetadataRequest,
  UnlinkHandleRequest,
  LinkHandleRequest,
} from '@lens-protocol/domain/use-cases/profile';
import { TokenAllowanceRequest } from '@lens-protocol/domain/use-cases/transactions';
import { formatZodError } from '@lens-protocol/metadata';
import { never } from '@lens-protocol/shared-kernel';
import { z } from 'zod';

import { TokenAllowanceRequestSchema } from './erc20';
import {
  FollowRequestSchema,
  UnfollowRequestSchema,
  UpdateFollowPolicyRequestSchema,
  SetProfileMetadataRequestSchema,
  UpdateProfileManagersRequestSchema,
  LinkHandleRequestSchema,
  UnlinkHandleRequestSchema,
} from './profiles';

export type Validator<T> = (request: unknown) => asserts request is T;

type InferShape<T extends z.ZodType<unknown>> = T extends z.ZodType<infer R> ? R : never;

function createRequestValidator<T extends z.ZodType<unknown>>(schema: T) {
  return (request: unknown): asserts request is InferShape<T> => {
    const result = schema.safeParse(request);

    if (result.success) return;

    never(formatZodError(result.error));
  };
}

export const validateTokenAllowanceRequest: Validator<TokenAllowanceRequest> =
  createRequestValidator(TokenAllowanceRequestSchema);

export const validateUpdateFollowPolicyRequest: Validator<UpdateFollowPolicyRequest> =
  createRequestValidator(UpdateFollowPolicyRequestSchema);

export const validateSetProfileMetadataRequest: Validator<SetProfileMetadataRequest> =
  createRequestValidator(SetProfileMetadataRequestSchema);

export const validateUpdateProfileManagersRequest: Validator<SetProfileMetadataRequest> =
  createRequestValidator(UpdateProfileManagersRequestSchema);

export const validateUnfollowRequest: Validator<UnfollowRequest> =
  createRequestValidator(UnfollowRequestSchema);

export const validateFollowRequest: Validator<FollowRequest> =
  createRequestValidator(FollowRequestSchema);

export const validateLinkHandleRequest: Validator<LinkHandleRequest> =
  createRequestValidator(LinkHandleRequestSchema);

export const validateUnlinkHandleRequest: Validator<UnlinkHandleRequest> =
  createRequestValidator(UnlinkHandleRequestSchema);
