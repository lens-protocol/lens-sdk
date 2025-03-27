import type { SessionClient } from '@lens-protocol/client';
import { useSessionState } from '../context';
import type { ReadResult, SuspenseResult } from '../helpers';

/**
 * {@link useSessionClient} hook arguments
 */
export type UseSessionArgs = {
  /**
   * Enables React Suspense support.
   */
  suspense: true;
};

/**
 * Retrieve the current {@link SessionClient} if available.
 * If the session is not available, it will attempt to resume it from storage.
 *
 * This signature supports React Suspense:
 *
 * ```tsx
 * import { useSessionClient } from '@lens-protocol/react';
 *
 * const { data } = useSessionClient({ suspense: true });
 * ```
 */
export function useSessionClient(args: UseSessionArgs): SuspenseResult<SessionClient | null>;

/**
 * Retrieve the current {@link SessionClient} if available.
 * If the session is not available, it will attempt to resume it from storage.
 *
 * ```tsx
 * import { useSessionClient } from '@lens-protocol/react';
 *
 * const { data, loading } = useSessionClient();
 * ```
 */
export function useSessionClient(): ReadResult<SessionClient | null>;

export function useSessionClient(
  args: { suspense: boolean } = { suspense: false },
): ReadResult<SessionClient | null> | SuspenseResult<SessionClient | null> {
  const result = useSessionState(args);

  if (result.data) {
    return {
      ...result,
      data: result.data.isSessionClient() ? result.data : null,
    };
  }

  return result;
}
