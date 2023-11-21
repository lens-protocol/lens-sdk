import { failure, PromiseResult, success } from '@lens-protocol/shared-kernel';

import type { Authentication } from '../authentication';
import { CredentialsExpiredError, NotAuthenticatedError } from '../errors';

type Handler<Val> = (headers: Record<string, string>) => Promise<Val>;

export async function requireAuthHeaders<Val>(
  authentication: Authentication | undefined,
  handler: Handler<Val>,
): PromiseResult<Val, CredentialsExpiredError | NotAuthenticatedError> {
  // TODO revisit this might be actually defined all the time
  if (!authentication) {
    return failure(new NotAuthenticatedError());
  }

  const result = await authentication.getRequestHeader();

  if (result.isFailure()) {
    return result;
  }

  const value = await handler(result.value);
  return success(value);
}
