import {
  UpdateFollowPolicyRequest,
  UpdateProfileDetailsRequest,
} from '@lens-protocol/domain/use-cases/profile';
import {
  CreateCommentRequest,
  CreatePostRequest,
} from '@lens-protocol/domain/use-cases/publications';
import { TokenAllowanceRequest } from '@lens-protocol/domain/use-cases/wallets';
import { never } from '@lens-protocol/shared-kernel';
import { z } from 'zod';

import { TokenAllowanceRequestSchema } from './erc20';
import { formatZodError } from './formatters';
import {
  UpdateFollowPolicyRequestSchema,
  UpdateProfileDetailsRequestSchema,
  UpdateProfileManagersRequestSchema,
} from './profiles';
import { CreateCommentRequestSchema, CreatePostRequestSchema } from './publications';

export type Validator<T> = (request: unknown) => asserts request is T;

type InferShape<T extends z.ZodType<unknown>> = T extends z.ZodType<infer R> ? R : never;

function createRequestValidator<T extends z.ZodType<unknown>>(schema: T) {
  return (request: unknown): asserts request is InferShape<T> => {
    const result = schema.safeParse(request);

    if (result.success) return;

    never(formatZodError(result.error));
  };
}

export const validateCreatePostRequest: Validator<CreatePostRequest> =
  createRequestValidator(CreatePostRequestSchema);

export const validateCreateCommentRequest: Validator<CreateCommentRequest> = createRequestValidator(
  CreateCommentRequestSchema,
);

export const validateTokenAllowanceRequest: Validator<TokenAllowanceRequest> =
  createRequestValidator(TokenAllowanceRequestSchema);

export const validateUpdateFollowPolicyRequest: Validator<UpdateFollowPolicyRequest> =
  createRequestValidator(UpdateFollowPolicyRequestSchema);

export const validateUpdateProfileDetailsRequest: Validator<UpdateProfileDetailsRequest> =
  createRequestValidator(UpdateProfileDetailsRequestSchema);

export const validateUpdateProfileManagersRequest: Validator<UpdateProfileDetailsRequest> =
  createRequestValidator(UpdateProfileManagersRequestSchema);
