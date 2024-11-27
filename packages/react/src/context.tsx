import type { PublicClient, SessionClient } from '@lens-protocol/client';
import { invariant } from '@lens-protocol/types';
import React, { type ReactNode, useContext, useState } from 'react';

export const UnknownSession = Symbol('Unknown');
export type SessionState = SessionClient | null | typeof UnknownSession;

/**
 * @internal
 */
export type LensContextValue = {
  client: PublicClient;
  session: SessionState;
  resumeSession: () => Promise<SessionClient | null>;
};

function useLensContextValue(client: PublicClient): LensContextValue {
  const [session, setSession] = useState<SessionState>(UnknownSession);

  return {
    client,
    session,
    resumeSession: () =>
      client
        .resumeSession()
        .match(
          (value) => value,
          (_) => null,
        )
        .then((value) => {
          setSession(value);
          return value;
        }),
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
