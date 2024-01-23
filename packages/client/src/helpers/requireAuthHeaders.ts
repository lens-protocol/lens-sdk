import { PromiseResult, success } from '@lens-protocol/shared-kernel';

import type { Authentication } from '../authentication';
import { CredentialsExpiredError, NotAuthenticatedError } from '../errors';

type Handler<Val> = (headers: Record<string, string>) => Promise<Val>;

export async function requireAuthHeaders<Val>(
  authentication: Authentication,
  handler: Handler<Val>,
): PromiseResult<Val, CredentialsExpiredError | NotAuthenticatedError> {
  const result = await authentication.getRequestHeader();

  if (result.isFailure()) {
    return result;
  }

  const value = await handler(result.value);
  return success(value);
}
