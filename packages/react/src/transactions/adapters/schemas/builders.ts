import { TransactionKind } from '@lens-protocol/domain/entities';
import {
  CreateCommentRequest,
  CreateMirrorRequest,
  CreatePostRequest,
  CreateQuoteRequest,
} from '@lens-protocol/domain/use-cases/publications';
import { never, RecursiveUnbrand } from '@lens-protocol/shared-kernel';
import { z } from 'zod';

import { formatZodError } from './formatters';
import {
  CreateCommentRequestSchema,
  CreateMirrorRequestSchema,
  CreatePostRequestSchema,
  CreateQuoteRequestSchema,
} from './publications';

function evaluate<Input, Output>(result: z.SafeParseReturnType<Input, Output>): Output {
  if (result.success) {
    return result.data;
  }
  never(formatZodError(result.error));
}

export function createCommentRequest(
  input: Partial<RecursiveUnbrand<Omit<CreateCommentRequest, 'kind'>>>,
): CreateCommentRequest {
  return evaluate(
    CreateCommentRequestSchema.safeParse({
      kind: TransactionKind.CREATE_COMMENT,
      ...input,
    }),
  );
}

export function createPostRequest(
  input: Partial<RecursiveUnbrand<Omit<CreatePostRequest, 'kind'>>>,
): CreatePostRequest {
  return evaluate(
    CreatePostRequestSchema.safeParse({
      kind: TransactionKind.CREATE_POST,
      ...input,
    }),
  );
}

export function createMirrorRequest(
  input: RecursiveUnbrand<Omit<CreateMirrorRequest, 'kind'>>,
): CreateMirrorRequest {
  return evaluate(
    CreateMirrorRequestSchema.safeParse({
      kind: TransactionKind.MIRROR_PUBLICATION,
      ...input,
    }),
  );
}

export function createQuoteRequest(
  input: Partial<RecursiveUnbrand<Omit<CreateQuoteRequest, 'kind'>>>,
): CreateQuoteRequest {
  return evaluate(
    CreateQuoteRequestSchema.safeParse({
      kind: TransactionKind.CREATE_QUOTE,
      ...input,
    }),
  );
}
