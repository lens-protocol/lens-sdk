import {
  FollowRequest,
  UnfollowRequest,
  UpdateFollowPolicyRequest,
  SetProfileMetadataRequest,
  UnlinkHandleRequest,
  LinkHandleRequest,
} from '@lens-protocol/domain/use-cases/profile';
import { never } from '@lens-protocol/shared-kernel';
import { z } from 'zod';

import { formatZodError } from './formatters';
import {
  FollowRequestSchema,
  UnfollowRequestSchema,
  UpdateFollowPolicyRequestSchema,
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

export const validateUpdateFollowPolicyRequest: Validator<UpdateFollowPolicyRequest> =
  createRequestValidator(UpdateFollowPolicyRequestSchema);

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
