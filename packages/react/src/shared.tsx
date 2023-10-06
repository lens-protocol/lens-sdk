import {
  createLensApolloClient,
  SafeApolloClient,
  defaultQueryParams,
} from '@lens-protocol/api-bindings';
import { AppId } from '@lens-protocol/domain/entities';
import { ILogger, invariant } from '@lens-protocol/shared-kernel';
import React, { ReactNode, useContext } from 'react';

import { ConsoleLogger } from './ConsoleLogger';
import { LensConfig } from './config';
import { EnvironmentConfig } from './environments';

export type SharedDependencies = {
  apolloClient: SafeApolloClient;
  appId?: AppId;
  environment: EnvironmentConfig;
  logger: ILogger;
};

export function createSharedDependencies(config: LensConfig): SharedDependencies {
  const logger = config.logger ?? new ConsoleLogger();

  const accessTokenStorage = {
    getAccessToken() {
      return '';
    },
    refreshToken() {
      return Promise.resolve();
    },
  };

  // apollo client
  const apolloClient = createLensApolloClient({
    queryParams: config.params ?? defaultQueryParams,
    backendURL: config.environment.backend,
    accessTokenStorage,
    pollingInterval: config.environment.timings.pollingInterval,
    logger,
    contentMatchers: [config.environment.snapshot.matcher],
  });

  return {
    apolloClient,
    environment: config.environment,
    logger,
  };
}

const SharedDependenciesContext = React.createContext<SharedDependencies | null>(null);

type SharedDependenciesProviderProps = {
  children: ReactNode;
  dependencies: SharedDependencies;
};

export function SharedDependenciesProvider({
  children,
  dependencies: context,
}: SharedDependenciesProviderProps) {
  return (
    <SharedDependenciesContext.Provider value={context}>
      {children}
    </SharedDependenciesContext.Provider>
  );
}

/**
 * @internal DO NOT USE THIS HOOK OUTSIDE OF THE LENS SDK
 */
export function useSharedDependencies(): SharedDependencies {
  const context = useContext(SharedDependenciesContext);

  invariant(
    context,
    'Could not find Lens SDK context, ensure your code is wrapped in a <LensProvider>',
  );

  return context;
}
