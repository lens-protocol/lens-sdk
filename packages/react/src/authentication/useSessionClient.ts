import type { SessionClient } from '@lens-social/client';
import { useEffect, useState } from 'react';
import { UnknownSession, useLensContext } from '../context';
import { ReadResult, type SuspenseResult } from '../helpers';

/**
 * {@link useSessionClient} hook arguments
 */
export type UseSessionArgs = {
  /**
   * Enables React Suspense support.
   */
  suspense?: true;
};

/**
 * Retrieve the current {@link SessionClient} if available.
 * If the session is not available, it will attempt to resume it from storage.
 *
 * ```tsx
 * const { data, loading } = useSessionClient();
 * ```
 */
export function useSessionClient(args: UseSessionArgs): SuspenseResult<SessionClient | null>;

/**
 * Retrieve the current {@link SessionClient} if available.
 * If the session is not available, it will attempt to resume it from storage.
 *
 * This signature supports React Suspense:
 *
 * ```tsx
 * const { data } = useSessionClient({ suspense: true });
 * ```
 */
export function useSessionClient(): ReadResult<SessionClient | null>;

export function useSessionClient(args?: { suspense?: boolean }):
  | ReadResult<SessionClient | null>
  | SuspenseResult<SessionClient | null> {
  const { session, resumeSession } = useLensContext();
  const [output, setOutput] = useState<ReadResult<SessionClient | null>>(
    session === UnknownSession ? ReadResult.Initial() : ReadResult.Success(session),
  );

  useEffect(() => {
    // If the session is already known, don't do anything.
    if (session !== UnknownSession) {
      return;
    }

    resumeSession().then((value) => setOutput(ReadResult.Success(value)));
  }, [resumeSession, session]);

  // Handle suspense
  if (args?.suspense && session === UnknownSession) {
    // The effect above won't run when we suspend.

    // Suspends with a ResultAsync which is a Promise-like object.
    throw resumeSession();
  }

  return output;
}
