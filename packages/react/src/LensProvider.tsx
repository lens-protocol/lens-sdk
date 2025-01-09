import type { PublicClient } from '@lens-protocol/client';
import React from 'react';
import type { ReactNode } from 'react';

import { LensContextProvider } from './context';

/**
 * <Provider> props
 */
export type LensProviderProps = {
  /**
   * The children to render
   */
  children: ReactNode;
  /**
   * The Lens client to use
   */
  client: PublicClient;
};

/**
 * Manages the lifecycle and internal state of the Lens SDK
 *
 * ```tsx
 * import { LensProvider, PublicClient, testnet } from '@lens-protocol/react';
 *
 * const client = PublicClient.create({
 *   environment: testnet,
 * });
 *
 * function App() {
 *   return (
 *     <LensProvider client={client}>
 *        // ...
 *     </LensProvider>
 *   );
 * }
 * ```
 */
export function LensProvider({ children, client }: LensProviderProps) {
  return <LensContextProvider client={client}>{children}</LensContextProvider>;
}
