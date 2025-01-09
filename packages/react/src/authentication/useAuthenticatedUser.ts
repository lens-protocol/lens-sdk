import type { AuthenticatedUser } from '@lens-protocol/client';
import { useSessionState } from '../context';
import type { ReadResult, SuspenseResult } from '../helpers';

/**
 * {@link useAuthenticatedUser} hook arguments
 */
export type UseAuthenticatedUserArgs = {
  /**
   * Enables React Suspense support.
   */
  suspense: true;
};

/**
 * Retrieve the {@link AuthenticatedUser} if available.
 *
 * This signature supports React Suspense:
 *
 * ```tsx
 * const { data } = useAuthenticatedUser({ suspense: true });
 * ```
 */
export function useAuthenticatedUser(
  args: UseAuthenticatedUserArgs,
): SuspenseResult<AuthenticatedUser | null>;

/**
 * Retrieve the {@link AuthenticatedUser} if available.
 *
 * ```tsx
 * const { data, loading } = useAuthenticatedUser();
 * ```
 */
export function useAuthenticatedUser(): ReadResult<AuthenticatedUser | null>;

export function useAuthenticatedUser(
  args: { suspense: boolean } = { suspense: false },
): ReadResult<AuthenticatedUser | null> | SuspenseResult<AuthenticatedUser | null> {
  const result = useSessionState(args);

  if (result.data) {
    return {
      ...result,
      data: result.data.resolved && result.data.user ? result.data.user : null,
    };
  }

  return result;
}
