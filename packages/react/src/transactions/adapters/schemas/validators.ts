import {
  CreateCommentRequest,
  CreatePostRequest,
} from '@lens-protocol/domain/use-cases/publications';
import { never } from '@lens-protocol/shared-kernel';
import { z } from 'zod';

import { formatZodError } from './formatters';
import {
  CreateEmbedCommentRequestSchema,
  CreateEmbedPostRequestSchema,
  CreateMediaCommentRequestSchema,
  CreateMediaPostRequestSchema,
  CreateTextualCommentRequestSchema,
  CreateTextualPostRequestSchema,
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
  CreateTextualPostRequestSchema,
  CreateMediaPostRequestSchema,
  CreateEmbedPostRequestSchema,
]);

export const validateCreatePostRequest: Validator<CreatePostRequest> =
  createRequestValidator(CreatePostRequestSchema);

const CreateCommentRequestSchema = z.discriminatedUnion('contentFocus', [
  CreateEmbedCommentRequestSchema,
  CreateMediaCommentRequestSchema,
  CreateTextualCommentRequestSchema,
]);

export const validateCreateCommentRequest: Validator<CreateCommentRequest> = createRequestValidator(
  CreateCommentRequestSchema,
);
