import { ReactNode, useState } from 'react';
import { LensConfig } from '.';
import { createSharedDependencies, SharedDependenciesProvider } from './shared';

export type LensProviderProps = {
  children: ReactNode;
  config: LensConfig;
};

export function LensProvider({ children, config }: LensProviderProps) {
  const [sharedDependencies] = useState(() => createSharedDependencies(config));

  return (
    <SharedDependenciesProvider dependencies={sharedDependencies}>
      {children}
    </SharedDependenciesProvider>
  );
}
