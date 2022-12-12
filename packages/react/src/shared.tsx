import React, { useContext, ReactNode } from 'react';
import { createApolloClient } from '@lens-protocol/api';
import { invariant } from '@lens-protocol/shared-kernel';

import { LensConfig } from './config';
import { ApolloClient, NormalizedCacheObject } from '@apollo/client';

type SharedDependencies = {
  apolloClient: ApolloClient<NormalizedCacheObject>;
};

export function createSharedDependencies(config: LensConfig) {
  const apolloClient = createApolloClient({
    backendURL: config.environment.gqlEndpoint,
  });

  return {
    apolloClient,
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

export function useSharedDependencies(): SharedDependencies {
  const context = useContext(SharedDependenciesContext);

  invariant(
    context,
    'Could not find Lens SDK context, ensure your code is wrapped in a <LensProvider>',
  );

  return context;
}
