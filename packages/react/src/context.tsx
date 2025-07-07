import type {
  AnyClient,
  PublicClient,
  SessionClient,
} from '@lens-protocol/client';
import { invariant } from '@lens-protocol/types';
import React, {
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { Provider as UrqlProvider } from 'urql';
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
  afterLogin: (sessionClient: SessionClient) => Promise<void>;
  afterLogout: () => Promise<void>;
};

function createInitialSessionState(publicClient: PublicClient): SessionState {
  return publicClient.currentSession.isSessionClient()
    ? {
        resolved: true,
        client: publicClient.currentSession,
      }
    : {
        resolved: false,
        client: publicClient,
      };
}

async function attemptSessionRestoration(
  publicClient: PublicClient,
  setState: (state: SessionState) => void,
) {
  const result = await publicClient.resumeSession();
  setState({
    resolved: true,
    client: result.isOk() ? result.value : publicClient,
  });
}

function useCreateLensContextValue(
  publicClient: PublicClient,
): LensContextValue {
  const [state, setState] = useState<SessionState>(() =>
    createInitialSessionState(publicClient),
  );

  // biome-ignore lint/correctness/useExhaustiveDependencies: update state when publicClient changes
  useEffect(() => {
    const currentPublicClient = state.client.isSessionClient()
      ? state.client.parent
      : state.client;

    // Only update if the client reference has actually changed
    if (currentPublicClient !== publicClient) {
      if (state.resolved) {
        // Preserve authenticated state by attempting session restoration
        attemptSessionRestoration(publicClient, setState);
      } else {
        setState(createInitialSessionState(publicClient));
      }
    }
  }, [publicClient]); // Only react to prop changes, not internal state changes

  return {
    state,

    resume: useCallback(async () => {
      const result = await publicClient.resumeSession();

      const newState = {
        resolved: true,
        client: result.isOk() ? result.value : publicClient,
      } as const;

      setState(newState);

      return newState;
    }, [publicClient]),

    afterLogin: useCallback(async (sessionClient) => {
      setState({ resolved: true, client: sessionClient });
    }, []),

    afterLogout: useCallback(async () => {
      setState({ resolved: true, client: publicClient });
    }, [publicClient]),
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
export function LensContextProvider({
  children,
  client,
}: LensContextProviderProps) {
  const value = useCreateLensContextValue(client);

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
    // If the session is already known, just update the output.
    if (state.resolved) {
      setOutput(ReadResult.Success(state.client));
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
