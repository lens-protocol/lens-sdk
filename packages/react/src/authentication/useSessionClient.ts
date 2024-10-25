import type { SessionClient } from '@lens-social/client';
import { useEffect, useState } from 'react';
import { UnknownSession, useLensContext } from '../context';
import { ReadResult, type SuspenseResult } from '../helpers';

/**
 * {@link useSessionClient} hook arguments
 */
export type UseSessionArgs = {
  /**
   * Whether to use suspense mode
   *
   * @defaultValue false
   */
  suspense?: boolean;
};

export function useSessionClient(args: UseSessionArgs): SuspenseResult<SessionClient | null>;

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
