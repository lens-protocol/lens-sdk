import { TransactionKind } from '@lens-protocol/domain/entities';
import { CreatePostRequest } from '@lens-protocol/domain/use-cases/publications';
import { never, RecursiveUnbrand } from '@lens-protocol/shared-kernel';
import { z } from 'zod';

import { formatZodError } from './formatters';
import { CreatePostRequestSchema } from './publications';

function evaluate<Input, Output>(result: z.SafeParseReturnType<Input, Output>): Output {
  if (result.success) {
    return result.data;
  }
  never(formatZodError(result.error));
}

export function createPostRequest(
  input: RecursiveUnbrand<Omit<CreatePostRequest, 'kind'>>,
): CreatePostRequest {
  return evaluate(
    CreatePostRequestSchema.safeParse({
      kind: TransactionKind.CREATE_POST,
      ...input,
    }),
  );
}
