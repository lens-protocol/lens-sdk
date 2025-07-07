import type {
  UnauthenticatedError,
  UnexpectedError,
} from '@lens-protocol/client';
import { dismissRecommendedAccounts } from '@lens-protocol/client/actions';

import type { DismissRecommendedAccountsRequest } from '@lens-protocol/graphql';
import { type UseAsyncTask, useAuthenticatedAsyncTask } from '../helpers';

/**
 * Dismiss recommended accounts.
 *
 * @alpha This is an alpha API and may be subject to breaking changes.
 *
 * ```tsx
 * import { evmAddress, useDismissRecommendedAccounts } from '@lens-protocol/react';
 *
 * const { execute } = useDismissRecommendedAccounts();
 *
 * const result = await execute({
 *   accounts: [evmAddress('0x1234567890123456789012345678901234567890')],
 * });
 *
 * if (result.isErr()) {
 *   console.error(result.error);
 * }
 * ```
 */
export function useDismissRecommendedAccounts(): UseAsyncTask<
  DismissRecommendedAccountsRequest,
  void,
  UnauthenticatedError | UnexpectedError
> {
  return useAuthenticatedAsyncTask((sessionClient, request) =>
    dismissRecommendedAccounts(sessionClient, request),
  );
}
