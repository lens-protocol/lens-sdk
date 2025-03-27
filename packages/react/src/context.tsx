import type { PublicClient } from '@lens-protocol/client';
import { invariant } from '@lens-protocol/types';
import React, { type ReactNode, useContext, useEffect, useState } from 'react';
import { Provider as UrqlProvider } from 'urql';

import type { AnyClient } from '@lens-protocol/client';
import { ReadResult, type SuspenseResult } from './helpers';

/**
 * @internal
 */
export type SessionState = {
  resolved: boolean;
  client: AnyClient;
};

/**
 * @internal
 */
export type LensContextValue = {
  state: SessionState;
  resume: () => Promise<SessionState>;
};

function useLensContextValue(publicClient: PublicClient): LensContextValue {
  const [state, setState] = useState<SessionState>({
    resolved: false,
    client: publicClient,
  });

  return {
    state,
    resume: async () => {
      const result = await publicClient.resumeSession();

      const newState = {
        resolved: true,
        client: result.isOk() ? result.value : publicClient,
      } as const;

      setState(newState);

      return newState;
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

  return (
    <LensContext.Provider value={value}>
      <UrqlProvider value={value.state.client.urql}>{children}</UrqlProvider>
    </LensContext.Provider>
  );
}

/**
 * @internal DO NOT USE THIS HOOK OUTSIDE OF THE LENS SDK
 */
export function useLensContext(): LensContextValue {
  const context = useContext(LensContext);

  invariant(
    context,
    'Could not find Lens SDK context, ensure your code is wrapped in a <LensProvider>',
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
}: UseSessionStateArgs): ReadResult<AnyClient> | SuspenseResult<AnyClient> {
  const { state, resume } = useLensContext();
  const [output, setOutput] = useState<ReadResult<AnyClient>>(
    state.resolved ? ReadResult.Success(state.client) : ReadResult.Initial(),
  );

  useEffect(() => {
    // If the session is already known, don't do anything.
    if (state.resolved) {
      return;
    }

    resume().then((value) => setOutput(ReadResult.Success(value.client)));
  }, [resume, state]);

  // Handle suspense
  if (suspense && state.resolved === false) {
    // The effect above won't run when we suspend.

    // Suspends with a ResultAsync which is a Promise-like object.
    throw resume();
  }

  return output;
}
