import type {
  UnauthenticatedError,
  UnexpectedError,
} from '@lens-protocol/client';
import { canCreateUsername } from '@lens-protocol/client/actions';
import type {
  CanCreateUsernameRequest,
  CanCreateUsernameResult,
} from '@lens-protocol/graphql';

import { type UseAsyncTask, useAuthenticatedAsyncTask } from '../helpers';

/**
 * Checks if a username can be created.
 *
 * @alpha This is an alpha API and may be subject to breaking changes.
 */
export function useCanCreateUsername(): UseAsyncTask<
  CanCreateUsernameRequest,
  CanCreateUsernameResult,
  UnexpectedError | UnauthenticatedError
> {
  return useAuthenticatedAsyncTask((sessionClient, request) =>
    canCreateUsername(sessionClient, request),
  );
}
