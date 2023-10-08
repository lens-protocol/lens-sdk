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

import { Erc20AmountInstanceSchema } from './common';
import { tokenAllowanceRequestSchema } from './erc20';
import { formatZodError } from './formatters';
import { updateFollowPolicyRequestSchema, UpdateProfileDetailsRequestSchema } from './profiles';
import {
  createEmbedCommentRequestSchema,
  createEmbedPostRequestSchema,
  createMediaCommentRequestSchema,
  createMediaPostRequestSchema,
  createTextualCommentRequestSchema,
  createTextualPostRequestSchema,
} from './publications';

export type Validator<T> = (request: unknown) => asserts request is T;

type InferShape<T extends z.ZodType<unknown>> = T extends z.ZodType<infer R> ? R : never;

function createRequestValidator<T extends z.ZodType<unknown>>(schema: T) {
  return (request: unknown): asserts request is InferShape<T> => {
    const result = schema.safeParse(request);

    if (result.success) return;

    never(formatZodError(result.error));
  };
}

const CreatePostRequestSchema = z.discriminatedUnion('contentFocus', [
  createEmbedPostRequestSchema(Erc20AmountInstanceSchema),
  createMediaPostRequestSchema(Erc20AmountInstanceSchema),
  createTextualPostRequestSchema(Erc20AmountInstanceSchema),
]);

export const validateCreatePostRequest: Validator<CreatePostRequest> =
  createRequestValidator(CreatePostRequestSchema);

const CreateCommentRequestSchema = z.discriminatedUnion('contentFocus', [
  createEmbedCommentRequestSchema(Erc20AmountInstanceSchema),
  createMediaCommentRequestSchema(Erc20AmountInstanceSchema),
  createTextualCommentRequestSchema(Erc20AmountInstanceSchema),
]);

export const validateCreateCommentRequest: Validator<CreateCommentRequest> = createRequestValidator(
  CreateCommentRequestSchema,
);

const TokenAllowanceRequestSchema = tokenAllowanceRequestSchema(Erc20AmountInstanceSchema);

export const validateTokenAllowanceRequest: Validator<TokenAllowanceRequest> =
  createRequestValidator(TokenAllowanceRequestSchema);

const UpdateFollowPolicyRequestSchema = updateFollowPolicyRequestSchema(Erc20AmountInstanceSchema);

export const validateUpdateFollowPolicyRequest: Validator<UpdateFollowPolicyRequest> =
  createRequestValidator(UpdateFollowPolicyRequestSchema);

export const validateUpdateProfileDetailsRequest: Validator<UpdateProfileDetailsRequest> =
  createRequestValidator(UpdateProfileDetailsRequestSchema);
