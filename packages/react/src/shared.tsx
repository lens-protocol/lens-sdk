import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { createAnonymousApolloClient, createApolloClient } from '@lens-protocol/api';
import { TransactionKind } from '@lens-protocol/domain/entities';
import { ActiveProfile } from '@lens-protocol/domain/use-cases/profile';
import {
  SupportedTransactionRequest,
  TransactionResponders,
  TransactionQueue,
} from '@lens-protocol/domain/use-cases/transactions';
import { ActiveWallet } from '@lens-protocol/domain/use-cases/wallets';
import { IEquatableError, invariant } from '@lens-protocol/shared-kernel';
import React, { useContext, ReactNode } from 'react';

import { NoopResponder } from './NoopResponder';
import { LensConfig } from './config';
import { ActiveProfileGateway } from './profile/adapters/ActiveProfileGateway';
import { ActiveProfilePresenter } from './profile/adapters/ActiveProfilePresenter';
import { ProfileGateway } from './profile/adapters/ProfileGateway';
import { createActiveProfileStorage } from './profile/infrastructure/ActiveProfileStorage';
import { PendingTransactionGateway } from './transactions/adapters/PendingTransactionGateway';
import { TransactionQueuePresenter } from './transactions/adapters/TransactionQueuePresenter';
import { TransactionFactory } from './transactions/infrastructure/TransactionFactory';
import { TransactionObserver } from './transactions/infrastructure/TransactionObserver';
import { createTransactionStorage } from './transactions/infrastructure/TransactionStorage';
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

export type ErrorHandler = (error: IEquatableError) => void;

export type SharedDependencies = {
  activeProfile: ActiveProfile;
  activeProfileGateway: ActiveProfileGateway;
  activeProfilePresenter: ActiveProfilePresenter;
  activeWallet: ActiveWallet;
  apolloClient: ApolloClient<NormalizedCacheObject>;
  authApi: AuthApi;
  credentialsFactory: CredentialsFactory;
  credentialsGateway: CredentialsGateway;
  logoutPresenter: LogoutPresenter;
  onError: ErrorHandler;
  sources: string[];
  transactionQueue: TransactionQueue<SupportedTransactionRequest>;
  walletFactory: WalletFactory;
  walletGateway: WalletGateway;
};

export type Handlers = {
  onLogout: LogoutHandler;
  onError: ErrorHandler;
};

export function createSharedDependencies(config: LensConfig, { onLogout, onError }: Handlers) {
  // storages
  const activeProfileStorage = createActiveProfileStorage(config.storage);
  const credentialsStorage = new CredentialsStorage(config.storage);
  const walletStorage = createWalletStorage(config.storage);
  const transactionStorage = createTransactionStorage(config.storage);

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
  const transactionGateway = new PendingTransactionGateway(transactionStorage, transactionFactory);
  const signerFactory = new SignerFactory(config.bindings, config.environment.chains);
  const credentialsFactory = new CredentialsFactory(authApi);
  const credentialsGateway = new CredentialsGateway(credentialsStorage);
  const walletFactory = new WalletFactory(signerFactory, transactionFactory);
  const walletGateway = new WalletGateway(walletStorage, walletFactory);

  const profileGateway = new ProfileGateway(apolloClient);
  const activeProfileGateway = new ActiveProfileGateway(activeProfileStorage);
  const activeProfilePresenter = new ActiveProfilePresenter(apolloClient);

  const logoutPresenter = new LogoutPresenter(onLogout);

  const responders: TransactionResponders<SupportedTransactionRequest> = {
    [TransactionKind.APPROVE_MODULE]: new NoopResponder(),
    [TransactionKind.COLLECT_PUBLICATION]: new NoopResponder(),
    [TransactionKind.CREATE_COMMENT]: new NoopResponder(),
    [TransactionKind.CREATE_POST]: new NoopResponder(),
    [TransactionKind.CREATE_PROFILE]: new NoopResponder(),
    [TransactionKind.FOLLOW_PROFILES]: new NoopResponder(),
    [TransactionKind.MIRROR_PUBLICATION]: new NoopResponder(),
    [TransactionKind.UNFOLLOW_PROFILE]: new NoopResponder(),
    [TransactionKind.UPDATE_COVER_IMAGE]: new NoopResponder(),
    [TransactionKind.UPDATE_DISPATCHER_CONFIG]: new NoopResponder(),
    [TransactionKind.UPDATE_FOLLOW_POLICY]: new NoopResponder(),
    [TransactionKind.UPDATE_PROFILE_DETAILS]: new NoopResponder(),
    [TransactionKind.UPDATE_PROFILE_IMAGE]: new NoopResponder(),
  };
  const transactionQueuePresenter = new TransactionQueuePresenter(onError);

  // common interactors
  const activeProfile = new ActiveProfile(
    profileGateway,
    activeProfileGateway,
    activeProfilePresenter,
  );
  const activeWallet = new ActiveWallet(credentialsGateway, walletGateway);
  const transactionQueue = new TransactionQueue(
    responders,
    transactionGateway,
    transactionQueuePresenter,
  );

  return {
    activeProfile,
    activeProfileGateway,
    activeProfilePresenter,
    activeWallet,
    apolloClient,
    authApi,
    credentialsFactory,
    credentialsGateway,
    logoutPresenter,
    onError,
    sources: config.sources ?? [],
    transactionQueue,
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
