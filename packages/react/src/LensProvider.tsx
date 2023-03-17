import { invariant } from '@lens-protocol/shared-kernel';
import React, { useEffect, useRef, useState } from 'react';

import { LensConfig, validateConfig } from './config';
import { useBootstrapController } from './lifecycle/adapters/useBootstrapController';
import { createSharedDependencies, Handlers, SharedDependenciesProvider } from './shared';

// eslint-disable-next-line @typescript-eslint/no-empty-function
function noop() {}

export type LensProviderProps = Partial<Handlers> & {
  children: React.ReactNode;
  config: LensConfig;
};

export function LensProvider({ children, ...props }: LensProviderProps) {
  const isStartedRef = useRef(false);
  const initialProps = useRef(props).current;

  validateConfig(props.config);

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
    // Protects again multiple calls to start (quite likely from `useEffect` hook in concurrent mode (or in strict mode))
    if (isStartedRef.current) {
      return;
    }

    isStartedRef.current = true;
    start();
  }, [start]);

  return (
    <SharedDependenciesProvider dependencies={sharedDependencies}>
      {children}
    </SharedDependenciesProvider>
  );
}
