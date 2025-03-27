import type { UnauthenticatedError, UnexpectedError } from '@lens-protocol/client';
import { invariant } from '@lens-protocol/types';

import { useLensContext } from '../context';
import { type UseAsyncTask, useAsyncTask } from '../helpers';
import { useSessionClient } from './useSessionClient';

export type LogoutError = UnauthenticatedError | UnexpectedError;

/**
 * Log out of Lens.
 *
 * ```tsx
 * const { execute, error } = useLogout();
 * ```
 */
export function useLogout(): UseAsyncTask<void, void, LogoutError> {
  const { afterLogout } = useLensContext();
  const { data: sessionClient } = useSessionClient();

  return useAsyncTask(() => {
    invariant(
      sessionClient,
      'It appears that you are not logged in. Please log in before attempting to log out.',
    );

    return sessionClient.logout().andTee(afterLogout);
  });
}
