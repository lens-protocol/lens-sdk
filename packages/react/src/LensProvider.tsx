import { PropsWithChildren, useEffect, useRef, useState } from 'react';

import { ErrorHandler } from './ErrorHandler';
import { LensConfig, validateConfig } from './config';
import { useBootstrapController } from './lifecycle/adapters/useBootstrapController';
import { createSharedDependencies, SharedDependenciesProvider } from './shared';
import { FailedTransactionError } from './transactions/adapters/TransactionQueuePresenter';
import { LogoutHandler } from './wallet';

// eslint-disable-next-line @typescript-eslint/no-empty-function
function noop() {}

export type { ErrorHandler, FailedTransactionError };

/**
 * <LensProvider> props
 */
export type LensProviderProps = PropsWithChildren<{
  config: LensConfig;
  /**
   * @defaultValue no-op
   */
  onLogout?: LogoutHandler;
  /**
   * @defaultValue no-op
   */
  onError?: ErrorHandler<FailedTransactionError>;
}>;

// A specific function type would not trigger implicit any.
// See https://github.com/DefinitelyTyped/DefinitelyTyped/issues/52873#issuecomment-845806435 for a comparison between `Function` and more specific types.
// eslint-disable-next-line @typescript-eslint/ban-types
function useLatestCallback<T extends Function>(callback: T) {
  const latestCallbackRef = useRef(callback);

  useEffect(() => {
    latestCallbackRef.current = callback;
  }, [callback]);

  return (...args: unknown[]) => latestCallbackRef.current.apply(null, args) as T;
}

/**
 * Given {@link LensConfig} it manages the lifecycle and internal state management of the Lens SDK
 *
 * @param props - {@link LensProviderProps}
 */
export function LensProvider({ children, ...props }: LensProviderProps) {
  const onError = useLatestCallback(props.onError ?? noop);
  const onLogout = useLatestCallback(props.onLogout ?? noop);

  const [sharedDependencies] = useState(() => {
    validateConfig(props.config);
    return createSharedDependencies(props.config, { onError, onLogout });
  });

  const isStartedRef = useRef(false);
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
