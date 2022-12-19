import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { createApolloClient } from '@lens-protocol/api';
import { ActiveProfile } from '@lens-protocol/domain/use-cases/profile';
import { invariant } from '@lens-protocol/shared-kernel';
import React, { useContext, ReactNode } from 'react';

import { LensConfig } from './config';
import { ActiveProfileGateway } from './profile/adapters/ActiveProfileGateway';
import { ActiveProfilePresenter } from './profile/adapters/ActiveProfilePresenter';
import { ProfileGateway } from './profile/adapters/ProfileGateway';
import { createActiveProfileStorage } from './profile/infrastructure/ActiveProfileStorage';
import { TransactionFactory } from './transactions/infrastructure/TransactionFactory';
import { TransactionObserver } from './transactions/infrastructure/TransactionObserver';
import { CredentialsGateway } from './wallet/adapters/CredentialsGateway';
import { WalletFactory } from './wallet/adapters/WalletFactory';
import { WalletGateway } from './wallet/adapters/WalletGateway';
import { CredentialsStorage } from './wallet/infrastructure/CredentialsStorage';
import { ProviderFactory } from './wallet/infrastructure/ProviderFactory';
import { SignerFactory } from './wallet/infrastructure/SignerFactory';
import { createWalletStorage } from './wallet/infrastructure/WalletStorage';

export type SharedDependencies = {
  activeProfile: ActiveProfile;
  apolloClient: ApolloClient<NormalizedCacheObject>;
  sources: string[];
  credentialsGateway: CredentialsGateway;
  walletGateway: WalletGateway;
  walletFactory: WalletFactory;
};

export function createSharedDependencies(config: LensConfig) {
  const apolloClient = createApolloClient({
    backendURL: config.environment.backend,
  });

  // storages
  const activeProfileStorage = createActiveProfileStorage(config.storage);
  const credentialsStorage = new CredentialsStorage(config.storage);
  const walletStorage = createWalletStorage(config.storage);

  // adapters
  const providerFactory = new ProviderFactory(config.bindings, config.environment.chains);
  const transactionObserver = new TransactionObserver(
    providerFactory,
    apolloClient,
    config.environment.timings,
  );
  const transactionFactory = new TransactionFactory(transactionObserver);
  const signerFactory = new SignerFactory(config.bindings, config.environment.chains);
  const credentialsGateway = new CredentialsGateway(credentialsStorage);
  const walletFactory = new WalletFactory(signerFactory, transactionFactory);
  const walletGateway = new WalletGateway(walletStorage, walletFactory);

  const profileGateway = new ProfileGateway(apolloClient);
  const activeProfileGateway = new ActiveProfileGateway(activeProfileStorage);
  const activeProfilePresenter = new ActiveProfilePresenter(apolloClient);

  const activeProfile = new ActiveProfile(
    profileGateway,
    activeProfileGateway,
    activeProfilePresenter,
  );

  return {
    activeProfile,
    apolloClient,
    sources: config.sources ?? [],
    credentialsGateway,
    walletFactory,
    walletGateway,
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
