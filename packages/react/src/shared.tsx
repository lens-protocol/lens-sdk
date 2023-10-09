import {
  createAuthApolloClient,
  createLensApolloClient,
  defaultQueryParams,
  SafeApolloClient,
} from '@lens-protocol/api-bindings';
import { IConversationsGateway, Logout } from '@lens-protocol/domain/use-cases/authentication';
import { ILogger, invariant } from '@lens-protocol/shared-kernel';
import React, { ReactNode, useContext } from 'react';

import { ConsoleLogger } from './ConsoleLogger';
import { AccessTokenStorage } from './authentication/adapters/AccessTokenStorage';
import { AuthApi } from './authentication/adapters/AuthApi';
import { CredentialsFactory } from './authentication/adapters/CredentialsFactory';
import { CredentialsGateway } from './authentication/adapters/CredentialsGateway';
import { CredentialsStorage } from './authentication/adapters/CredentialsStorage';
import { LogoutPresenter } from './authentication/adapters/LogoutPresenter';
import { LensConfig } from './config';
import { EnvironmentConfig } from './environments';
import { IProfileCacheManager } from './profile/adapters/IProfileCacheManager';
import { ProfileCacheManager } from './profile/infrastructure/ProfileCacheManager';
import { TransactionFactory } from './transactions/infrastructure/TransactionFactory';
import { TransactionObserver } from './transactions/infrastructure/TransactionObserver';
import { WalletFactory } from './wallet/adapters/WalletFactory';
import { WalletGateway } from './wallet/adapters/WalletGateway';
import { ProviderFactory } from './wallet/infrastructure/ProviderFactory';
import { SignerFactory } from './wallet/infrastructure/SignerFactory';
import { createWalletStorage } from './wallet/infrastructure/WalletStorage';

/**
 * @internal
 */
export function createSharedDependencies(config: LensConfig): SharedDependencies {
  const logger = config.logger ?? new ConsoleLogger();

  // auth api
  const anonymousApolloClient = createAuthApolloClient({
    backendURL: config.environment.backend,
    logger,
  });
  const authApi = new AuthApi(anonymousApolloClient);

  // storages
  const credentialsStorage = new CredentialsStorage(config.storage, config.environment.name);
  const accessTokenStorage = new AccessTokenStorage(authApi, credentialsStorage);
  const walletStorage = createWalletStorage(config.storage, config.environment.name);

  // apollo client
  const apolloClient = createLensApolloClient({
    queryParams: config.params ?? defaultQueryParams,
    backendURL: config.environment.backend,
    accessTokenStorage,
    pollingInterval: config.environment.timings.pollingInterval,
    logger,
    contentMatchers: [config.environment.snapshot.matcher],
  });

  // infrastructure
  const signerFactory = new SignerFactory(config.bindings, config.environment.chains);
  const providerFactory = new ProviderFactory(config.bindings, config.environment.chains);
  const transactionObserver = new TransactionObserver(
    providerFactory,
    apolloClient,
    config.environment.timings,
  );

  // common adapters
  const transactionFactory = new TransactionFactory(transactionObserver);
  const credentialsFactory = new CredentialsFactory(authApi);
  const credentialsGateway = new CredentialsGateway(credentialsStorage);
  const profileCacheManager = new ProfileCacheManager(apolloClient);
  const walletFactory = new WalletFactory(signerFactory, transactionFactory);
  const walletGateway = new WalletGateway(walletStorage, walletFactory);

  const conversationsGateway: IConversationsGateway = {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    async reset() {},
  };

  // logout
  const logoutPresenter = new LogoutPresenter();
  const logout = new Logout(
    walletGateway,
    credentialsGateway,
    conversationsGateway,
    logoutPresenter,
  );

  return {
    apolloClient,
    credentialsFactory,
    credentialsGateway,
    environment: config.environment,
    logger,
    logout,
    profileCacheManager,
    walletFactory,
    walletGateway,
  };
}

/**
 * @internal
 */
export type SharedDependencies = {
  apolloClient: SafeApolloClient;
  credentialsFactory: CredentialsFactory;
  credentialsGateway: CredentialsGateway;
  environment: EnvironmentConfig;
  logger: ILogger;
  logout: Logout;
  profileCacheManager: IProfileCacheManager;
  walletFactory: WalletFactory;
  walletGateway: WalletGateway;
};

const SharedDependenciesContext = React.createContext<SharedDependencies | null>(null);

type SharedDependenciesProviderProps = {
  children: ReactNode;
  dependencies: SharedDependencies;
};

/**
 * @internal
 */
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
