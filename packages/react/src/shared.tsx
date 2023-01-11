import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { createAnonymousApolloClient, createApolloClient } from '@lens-protocol/api-bindings';
import {
  PendingSigningRequestError,
  TransactionKind,
  UserRejectedError,
  WalletConnectionError,
} from '@lens-protocol/domain/entities';
import { ActiveProfile } from '@lens-protocol/domain/use-cases/profile';
import {
  SupportedTransactionRequest,
  TransactionQueue,
  TransactionResponders,
} from '@lens-protocol/domain/use-cases/transactions';
import { ActiveWallet, TokenAvailability } from '@lens-protocol/domain/use-cases/wallets';
import { invariant } from '@lens-protocol/shared-kernel';
import { IStorage } from '@lens-protocol/storage';
import React, { ReactNode, useContext } from 'react';

import { ConsoleLogger } from './ConsoleLogger';
import { ErrorHandler } from './ErrorHandler';
import { UnfollowProfileResponder } from './transactions/adapters/responders/UnfollowProfileResponder';
import { LensConfig } from './config';
import { ActiveProfileGateway } from './profile/adapters/ActiveProfileGateway';
import { ActiveProfilePresenter } from './profile/adapters/ActiveProfilePresenter';
import { ProfileGateway } from './profile/adapters/ProfileGateway';
import { createActiveProfileStorage } from './profile/infrastructure/ActiveProfileStorage';
import { PendingTransactionGateway } from './transactions/adapters/PendingTransactionGateway';
import { ProtocolCallRelayer } from './transactions/adapters/ProtocolCallRelayer';
import { SignlessProtocolCallRelayer } from './transactions/adapters/SignlessProtocolCallRelayer';
import {
  TransactionQueuePresenter,
  FailedTransactionError,
} from './transactions/adapters/TransactionQueuePresenter';
import { CreatePostResponder } from './transactions/adapters/responders/CreatePostResponder';
import { FollowProfilesResponder } from './transactions/adapters/responders/FollowProfilesResponder';
import { NoopResponder } from './transactions/adapters/responders/NoopResponder';
import { TransactionFactory } from './transactions/infrastructure/TransactionFactory';
import { TransactionObserver } from './transactions/infrastructure/TransactionObserver';
import { createTransactionStorage } from './transactions/infrastructure/TransactionStorage';
import { BalanceGateway } from './wallet/adapters/BalanceGateway';
import { CredentialsFactory } from './wallet/adapters/CredentialsFactory';
import { CredentialsGateway } from './wallet/adapters/CredentialsGateway';
import { LogoutHandler, LogoutPresenter } from './wallet/adapters/LogoutPresenter';
import { TokenGateway } from './wallet/adapters/TokenGateway';
import { WalletFactory } from './wallet/adapters/WalletFactory';
import { WalletGateway } from './wallet/adapters/WalletGateway';
import { AccessTokenStorage } from './wallet/infrastructure/AccessTokenStorage';
import { AuthApi } from './wallet/infrastructure/AuthApi';
import { CredentialsStorage } from './wallet/infrastructure/CredentialsStorage';
import {
  createNotificationStorage,
  UnreadNotificationsData,
} from './wallet/infrastructure/NotificationStorage';
import { ProviderFactory } from './wallet/infrastructure/ProviderFactory';
import { SignerFactory } from './wallet/infrastructure/SignerFactory';
import { createWalletStorage } from './wallet/infrastructure/WalletStorage';

export type Handlers = {
  onLogout: LogoutHandler;
  onError: ErrorHandler<
    PendingSigningRequestError | UserRejectedError | WalletConnectionError | FailedTransactionError
  >;
};

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
  onError: Handlers['onError'];
  protocolCallRelayer: ProtocolCallRelayer;
  sources: string[];
  transactionFactory: TransactionFactory;
  transactionGateway: PendingTransactionGateway<SupportedTransactionRequest>;
  transactionQueue: TransactionQueue<SupportedTransactionRequest>;
  tokenAvailability: TokenAvailability;
  walletFactory: WalletFactory;
  walletGateway: WalletGateway;
  notificationStorage: IStorage<UnreadNotificationsData>;
  signlessProtocolCallRelayer: SignlessProtocolCallRelayer;
};

export function createSharedDependencies(config: LensConfig, { onLogout, onError }: Handlers) {
  const logger = config.logger ?? new ConsoleLogger();

  // storages
  const activeProfileStorage = createActiveProfileStorage(config.storage);
  const credentialsStorage = new CredentialsStorage(config.storage);
  const walletStorage = createWalletStorage(config.storage);
  const notificationStorage = createNotificationStorage(config.storage);
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
  const balanceGateway = new BalanceGateway(providerFactory);
  const tokenGateway = new TokenGateway(providerFactory);

  const profileGateway = new ProfileGateway(apolloClient);
  const activeProfileGateway = new ActiveProfileGateway(activeProfileStorage);
  const activeProfilePresenter = new ActiveProfilePresenter(apolloClient);

  const logoutPresenter = new LogoutPresenter(onLogout);

  const responders: TransactionResponders<SupportedTransactionRequest> = {
    [TransactionKind.APPROVE_MODULE]: new NoopResponder(),
    [TransactionKind.COLLECT_PUBLICATION]: new NoopResponder(),
    [TransactionKind.CREATE_COMMENT]: new NoopResponder(),
    [TransactionKind.CREATE_POST]: new CreatePostResponder(apolloClient),
    [TransactionKind.CREATE_PROFILE]: new NoopResponder(),
    [TransactionKind.FOLLOW_PROFILES]: new FollowProfilesResponder(apolloClient.cache),
    [TransactionKind.MIRROR_PUBLICATION]: new NoopResponder(),
    [TransactionKind.UNFOLLOW_PROFILE]: new UnfollowProfileResponder(apolloClient.cache),
    [TransactionKind.UPDATE_COVER_IMAGE]: new NoopResponder(),
    [TransactionKind.UPDATE_DISPATCHER_CONFIG]: new NoopResponder(),
    [TransactionKind.UPDATE_FOLLOW_POLICY]: new NoopResponder(),
    [TransactionKind.UPDATE_PROFILE_DETAILS]: new NoopResponder(),
    [TransactionKind.UPDATE_PROFILE_IMAGE]: new NoopResponder(),
  };
  const transactionQueuePresenter = new TransactionQueuePresenter(onError);

  const protocolCallRelayer = new ProtocolCallRelayer(apolloClient, transactionFactory, logger);
  const signlessProtocolCallRelayer = new SignlessProtocolCallRelayer(
    apolloClient,
    transactionFactory,
    logger,
  );

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
  const tokenAvailability = new TokenAvailability(balanceGateway, tokenGateway, activeWallet);

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
    protocolCallRelayer,
    signlessProtocolCallRelayer,
    transactionFactory,
    transactionGateway,
    transactionQueue,
    tokenAvailability,
    walletFactory,
    walletGateway,
    notificationStorage,
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
