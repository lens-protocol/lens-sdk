import { ReactNode, useState } from 'react';

import { useBootstrapController } from './authentication/adapters/useBootstrapController';
import { BaseConfig } from './config';
import { createSharedDependencies, SharedDependenciesProvider } from './shared';

/**
 * <BaseProvider> props
 */
export type BaseProviderProps<TConfig extends BaseConfig> = {
  /**
   * The children to render
   */
  children: ReactNode;
  /**
   * The configuration for the Lens SDK
   */
  config: TConfig;
};

/**
 * Manages the lifecycle and internal state of the Lens SDK
 *
 * @internal
 */
export function BaseProvider<TConfig extends BaseConfig>({
  children,
  ...props
}: BaseProviderProps<TConfig>) {
  const [sharedDependencies] = useState(() => createSharedDependencies(props.config));

  useBootstrapController(sharedDependencies);

  return (
    <SharedDependenciesProvider dependencies={sharedDependencies}>
      {children}
    </SharedDependenciesProvider>
  );
}
