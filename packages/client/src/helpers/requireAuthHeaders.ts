import { failure, PromiseResult, success } from '@lens-protocol/shared-kernel';

import type { Authentication } from '../authentication';
import { CredentialsExpiredError, NotAuthenticatedError } from '../consts/errors';

type Handler<Val> = (headers: Record<string, string>) => Promise<Val>;

export async function requireAuthHeaders<Val>(
  authentication: Authentication | undefined,
  handler: Handler<Val>,
): PromiseResult<Val, CredentialsExpiredError | NotAuthenticatedError> {
  if (!authentication) {
    return failure(new NotAuthenticatedError());
  }

  const headerResult = await authentication.getRequestHeader();

  if (headerResult.isFailure()) {
    return failure(headerResult.error);
  }

  const result = await handler(headerResult.value);
  return success(result);
}
