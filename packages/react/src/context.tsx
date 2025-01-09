import type { PublicClient, SessionClient } from '@lens-protocol/client';
import type { AuthenticatedUser } from '@lens-protocol/client';
import { invariant } from '@lens-protocol/types';
import React, { type ReactNode, useContext, useEffect, useState } from 'react';
import { ReadResult, type SuspenseResult } from './helpers';

/**
 * @internal
 */
export type UnknownSession = {
  resolved: false;
  client: PublicClient;
  user: undefined;
};

/**
 * @internal
 */
export type AuthenticatedSession = {
  resolved: true;
  client: SessionClient;
  user: AuthenticatedUser;
};
/**
 * @internal
 */
export type UnauthenticatedSession = {
  resolved: true;
  client: PublicClient;
  user: undefined;
};
/**
 * @internal
 */
export type ResolvedSessionState = AuthenticatedSession | UnauthenticatedSession;
/**
 * @internal
 */
export type SessionState = AuthenticatedSession | UnauthenticatedSession | UnknownSession;

/**
 * @internal
 */
export type LensContextValue = {
  client: PublicClient;
  session: SessionState;
  resumeSession: () => Promise<ResolvedSessionState>;
};

function useLensContextValue(client: PublicClient): LensContextValue {
  const [session, setSession] = useState<SessionState>({
    resolved: false,
    client,
    user: undefined,
  });

  return {
    client,
    session,
    resumeSession: async () => {
      const result = await client.resumeSession();

      const session = await result
        .asyncMap(
          async (sessionClient) =>
            ({
              resolved: true,
              client: sessionClient,
              user: (await sessionClient.getAuthenticatedUser())._unsafeUnwrap(),
            }) as const,
        )
        .unwrapOr({
          resolved: true,
          client,
          user: undefined,
        } as const);

      setSession(session);
      return session;
    },
  };
}

const LensContext = React.createContext<LensContextValue | null>(null);

type LensContextProviderProps = {
  children: ReactNode;
  client: PublicClient;
};

/**
 * @internal
 */
export function LensContextProvider({ children, client }: LensContextProviderProps) {
  const value = useLensContextValue(client);

  return <LensContext.Provider value={value}>{children}</LensContext.Provider>;
}

/**
 * @internal DO NOT USE THIS HOOK OUTSIDE OF THE LENS SDK
 */
export function useLensContext(): LensContextValue {
  const context = useContext(LensContext);

  invariant(
    context,
    'Could not find Lens SDK context, ensure your code is wrapped in a Lens <Provider>',
  );

  return context;
}

/**
 * @internal
 */
export type UseSessionStateArgs = {
  suspense: boolean;
};

/**
 * @internal DO NOT USE THIS HOOK OUTSIDE OF THE LENS SDK
 */
export function useSessionState({
  suspense,
}: UseSessionStateArgs): ReadResult<ResolvedSessionState> | SuspenseResult<ResolvedSessionState> {
  const { session, resumeSession } = useLensContext();
  const [output, setOutput] = useState<ReadResult<ResolvedSessionState>>(
    session.resolved ? ReadResult.Success(session) : ReadResult.Initial(),
  );

  useEffect(() => {
    // If the session is already known, don't do anything.
    if (session.resolved) {
      return;
    }

    resumeSession().then((value) => setOutput(ReadResult.Success(value)));
  }, [resumeSession, session]);

  // Handle suspense
  if (suspense && session.resolved === false) {
    // The effect above won't run when we suspend.

    // Suspends with a ResultAsync which is a Promise-like object.
    throw resumeSession();
  }

  return output;
}
