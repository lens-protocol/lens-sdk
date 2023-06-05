import { CreatePostRequest } from '@lens-protocol/domain/use-cases/publications';
import { never } from '@lens-protocol/shared-kernel';
import { z } from 'zod';

import { formatZodError } from './formatters';
import {
  CreateEmbedPostRequestSchema,
  CreateMediaPostRequestSchema,
  CreateTextualPostRequestSchema,
} from './publications';

const CreatePostRequestSchema = z.discriminatedUnion('contentFocus', [
  CreateTextualPostRequestSchema,
  CreateMediaPostRequestSchema,
  CreateEmbedPostRequestSchema,
]);

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
