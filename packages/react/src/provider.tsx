import type { Client } from '@lens-social/client';
import React from 'react';

import { type ReactNode, useState } from 'react';
import { createContextValue, LensContextProvider } from './context';

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
  client: Client;
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
  const [value] = useState(() => createContextValue(client));

  return <LensContextProvider value={value}>{children}</LensContextProvider>;
}
