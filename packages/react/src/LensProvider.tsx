import { invariant } from '@lens-protocol/shared-kernel';
import { ReactNode, useEffect, useRef, useState } from 'react';

import { LensConfig } from './config';
import { useBootstrapController } from './lifecycle/adapters/useBootstrapController';
import { createSharedDependencies, Handlers, SharedDependenciesProvider } from './shared';

// eslint-disable-next-line @typescript-eslint/no-empty-function
function noop() {}

export type LensProviderProps = Partial<Handlers> & {
  children: ReactNode;
  config: LensConfig;
};

export function LensProvider({ children, ...props }: LensProviderProps) {
  const initialProps = useRef(props).current;
  const [sharedDependencies] = useState(() =>
    createSharedDependencies(props.config, {
      onLogout: props.onLogout ?? noop,
      onError: props.onError ?? noop,
    }),
  );

  useEffect(() => {
    invariant(initialProps.config === props.config, 'LensProvider: config cannot be changed');

    invariant(initialProps.onLogout === props.onLogout, 'LensProvider: onLogout cannot be changed');

    invariant(initialProps.onError === props.onError, 'LensProvider: onError cannot be changed');
  }, [initialProps, props]);

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
