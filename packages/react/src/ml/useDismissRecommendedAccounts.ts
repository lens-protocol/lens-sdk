import type {
  UnauthenticatedError,
  UnexpectedError,
} from '@lens-protocol/client';
import {
  dismissRecommendedAccounts,
  fetchAccountRecommendations,
} from '@lens-protocol/client/actions';

import type { DismissRecommendedAccountsRequest } from '@lens-protocol/graphql';
import { type UseAsyncTask, useAuthenticatedAsyncTask } from '../helpers';

/**
 * Dismiss recommended accounts.
 *
 * @alpha This is an alpha API and may be subject to breaking changes.
 */
export function useDismissRecommendedAccounts(): UseAsyncTask<
  DismissRecommendedAccountsRequest,
  void,
  UnauthenticatedError | UnexpectedError
> {
  return useAuthenticatedAsyncTask((sessionClient, request) =>
    dismissRecommendedAccounts(sessionClient, request).andTee(() =>
      sessionClient
        .getAuthenticatedUser()
        .andTee((user) =>
          fetchAccountRecommendations(sessionClient, { account: user.address }),
        ),
    ),
  );
}
