import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { createAnonymousApolloClient, createApolloClient } from '@lens-protocol/api';
import { ActiveProfile } from '@lens-protocol/domain/use-cases/profile';
import { ActiveWallet } from '@lens-protocol/domain/use-cases/wallets';
import { invariant } from '@lens-protocol/shared-kernel';
import React, { useContext, ReactNode } from 'react';

import { LensConfig } from './config';
import { ActiveProfileGateway } from './profile/adapters/ActiveProfileGateway';
import { ActiveProfilePresenter } from './profile/adapters/ActiveProfilePresenter';
import { ProfileGateway } from './profile/adapters/ProfileGateway';
import { createActiveProfileStorage } from './profile/infrastructure/ActiveProfileStorage';
import { TransactionFactory } from './transactions/infrastructure/TransactionFactory';
import { TransactionObserver } from './transactions/infrastructure/TransactionObserver';
import { CredentialsFactory } from './wallet/adapters/CredentialsFactory';
import { CredentialsGateway } from './wallet/adapters/CredentialsGateway';
import { LogoutHandler, LogoutPresenter } from './wallet/adapters/LogoutPresenter';
import { WalletFactory } from './wallet/adapters/WalletFactory';
import { WalletGateway } from './wallet/adapters/WalletGateway';
import { AccessTokenStorage } from './wallet/infrastructure/AccessTokenStorage';
import { AuthApi } from './wallet/infrastructure/AuthApi';
import { CredentialsStorage } from './wallet/infrastructure/CredentialsStorage';
import { ProviderFactory } from './wallet/infrastructure/ProviderFactory';
import { SignerFactory } from './wallet/infrastructure/SignerFactory';
import { createWalletStorage } from './wallet/infrastructure/WalletStorage';

export type SharedDependencies = {
  activeProfile: ActiveProfile;
  activeWallet: ActiveWallet;
  apolloClient: ApolloClient<NormalizedCacheObject>;
  authApi: AuthApi;
  credentialsFactory: CredentialsFactory;
  credentialsGateway: CredentialsGateway;
  logoutPresenter: LogoutPresenter;
  sources: string[];
  walletFactory: WalletFactory;
  walletGateway: WalletGateway;
};

export type Handlers = {
  onLogout: LogoutHandler;
};

export function createSharedDependencies(config: LensConfig, { onLogout }: Handlers) {
  // storages
  const activeProfileStorage = createActiveProfileStorage(config.storage);
  const credentialsStorage = new CredentialsStorage(config.storage);
  const walletStorage = createWalletStorage(config.storage);

  // apollo client
  const anonymousApolloClient = createAnonymousApolloClient({
    backendURL: config.environment.backend,
  });
  const authApi = new AuthApi(anonymousApolloClient);
  const accessTokenStorage = new AccessTokenStorage(authApi, credentialsStorage);
  const apolloClient = createApolloClient({
    backendURL: config.environment.backend,
    accessTokenStorage,
  });

  // adapters
  const providerFactory = new ProviderFactory(config.bindings, config.environment.chains);
  const transactionObserver = new TransactionObserver(
    providerFactory,
    apolloClient,
    config.environment.timings,
  );
  const transactionFactory = new TransactionFactory(transactionObserver);
  const signerFactory = new SignerFactory(config.bindings, config.environment.chains);
  const credentialsFactory = new CredentialsFactory(authApi);
  const credentialsGateway = new CredentialsGateway(credentialsStorage);
  const walletFactory = new WalletFactory(signerFactory, transactionFactory);
  const walletGateway = new WalletGateway(walletStorage, walletFactory);

  const profileGateway = new ProfileGateway(apolloClient);
  const activeProfileGateway = new ActiveProfileGateway(activeProfileStorage);
  const activeProfilePresenter = new ActiveProfilePresenter(apolloClient);

  const logoutPresenter = new LogoutPresenter(onLogout);

  // common interactors
  const activeProfile = new ActiveProfile(
    profileGateway,
    activeProfileGateway,
    activeProfilePresenter,
  );
  const activeWallet = new ActiveWallet(credentialsGateway, walletGateway);

  return {
    activeProfile,
    activeWallet,
    apolloClient,
    authApi,
    credentialsFactory,
    credentialsGateway,
    logoutPresenter,
    sources: config.sources ?? [],
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
