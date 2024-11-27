import type { PublicClient } from '@lens-protocol/client';
import React from 'react';

import type { ReactNode } from 'react';
import { LensContextProvider } from './context';

/**
 * <Provider> props
 */
export type ProviderProps = {
  /**
   * The children to render
   */
  children: ReactNode;
  /**
   * The configuration for the Lens SDK
   */
  client: PublicClient;
};

/**
 * Manages the lifecycle and internal state of the Lens SDK
 *
 * ```tsx
 * import { Provider, staging } from '@lens-protocol/react-web';
 * import { bindings as wagmiBindings } from '@lens-protocol/wagmi';
 *
 *
 *
 * function App() {
 *   return (
 *     <Provider config={lensConfig}>
 *        // ...
 *     </Provider>
 *   );
 * }
 * ```
 */
export function Provider({ children, client }: ProviderProps) {
  return <LensContextProvider client={client}>{children}</LensContextProvider>;
}
