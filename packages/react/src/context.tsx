import type { Client } from '@lens-social/client';
import { invariant } from '@lens-social/types';
import React, { type ReactNode, useContext } from 'react';

/**
 * @internal
 */
export type LensContextValue = {
  client: Client;
};

/**
 * @internal
 */
export function createContextValue(client: Client): LensContextValue {
  return { client };
}

const LensContext = React.createContext<LensContextValue | null>(null);

type LensContextProviderProps = {
  children: ReactNode;
  value: LensContextValue;
};

/**
 * @internal
 */
export function LensContextProvider({ children, value }: LensContextProviderProps) {
  return (<LensContext.Provider value={value}>{children}</LensContext.Provider>);
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
