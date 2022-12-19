import { ReactNode, useEffect, useState } from 'react';

import { LensConfig } from './config';
import { useBootstrapController } from './lifecycle/adapters/useBootstrapController';
import { createSharedDependencies, SharedDependenciesProvider } from './shared';
import { LogoutHandler } from './wallet';

// eslint-disable-next-line @typescript-eslint/no-empty-function
function noop() {}

export type LensProviderProps = {
  children: ReactNode;
  config: LensConfig;
  onLogout?: LogoutHandler;
};

export function LensProvider({ children, config, onLogout = noop }: LensProviderProps) {
  const [sharedDependencies] = useState(() => createSharedDependencies(config, { onLogout }));

  const start = useBootstrapController(sharedDependencies);

  useEffect(() => {
    start();
  }, [start]);

  return (
    <SharedDependenciesProvider dependencies={sharedDependencies}>
      {children}
    </SharedDependenciesProvider>
  );
}
