import { ReactNode, useState } from 'react';

import { LensConfig } from './config';
import { createSharedDependencies, SharedDependenciesProvider } from './shared';

/**
 * <LensProvider> props
 */
export type LensProviderProps = {
  /**
   * The children to render
   */
  children: ReactNode;
  /**
   * The configuration for the Lens SDK
   */
  config: LensConfig;
};

/**
 * Manages the lifecycle and internal state of the Lens SDK
 *
 * @group Components
 * @param props - {@link LensProviderProps}
 */
export function LensProvider({ children, ...props }: LensProviderProps) {
  const [sharedDependencies] = useState(() => {
    return createSharedDependencies(props.config);
  });

  return (
    <SharedDependenciesProvider dependencies={sharedDependencies}>
      {children}
    </SharedDependenciesProvider>
  );
}
