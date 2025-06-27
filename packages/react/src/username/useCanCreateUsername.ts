import type {
  UnauthenticatedError,
  UnexpectedError,
} from '@lens-protocol/client';
import { canCreateUsername } from '@lens-protocol/client/actions';
import type { CanCreateUsernameRequest } from '@lens-protocol/graphql';

import { type UseAsyncTask, useAuthenticatedAsyncTask } from '../helpers';

export type CanCreateUsernameResponse = {
  canCreateUsername: boolean;
  reason: string;
};

/**
 * Checks if a username can be created.
 *
 * @alpha This is an alpha API and may be subject to breaking changes.
 */
export function useCanCreateUsername(): UseAsyncTask<
  CanCreateUsernameRequest,
  CanCreateUsernameResponse,
  UnexpectedError | UnauthenticatedError
> {
  return useAuthenticatedAsyncTask((sessionClient, request) =>
    canCreateUsername(sessionClient, request).map((result) => {
      if (result.__typename === 'NamespaceOperationValidationPassed') {
        return {
          canCreateUsername: true,
          reason: 'Username is available',
        };
      }
      if (result.__typename === 'NamespaceOperationValidationUnknown') {
        return {
          canCreateUsername: false,
          reason: JSON.stringify(result.extraChecksRequired),
        };
      }
      return {
        canCreateUsername: false,
        reason: result.reason,
      };
    }),
  );
}
