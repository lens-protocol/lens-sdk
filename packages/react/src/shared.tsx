import {
  createAuthApolloClient,
  createLensApolloClient,
  SafeApolloClient,
  Sources,
} from '@lens-protocol/api-bindings';
import { AppId, TransactionKind } from '@lens-protocol/domain/entities';
import {
  AnyTransactionRequest,
  TransactionQueue,
  TransactionResponders,
} from '@lens-protocol/domain/use-cases/transactions';
import { ActiveWallet, TokenAvailability } from '@lens-protocol/domain/use-cases/wallets';
import { ILogger, invariant } from '@lens-protocol/shared-kernel';
import { IStorage, IStorageProvider } from '@lens-protocol/storage';
import React, { ReactNode, useContext } from 'react';

import { ConsoleLogger } from './ConsoleLogger';
import { ErrorHandler } from './ErrorHandler';
import { IBindings, LensConfig } from './config';
import { EnvironmentConfig } from './environments';
import { createInboxKeyStorage } from './inbox/infrastructure/InboxKeyStorage';
import { ActiveProfileGateway } from './profile/adapters/ActiveProfileGateway';
import { ActiveProfilePresenter } from './profile/adapters/ActiveProfilePresenter';
import { ProfileGateway } from './profile/adapters/ProfileGateway';
import { createActiveProfileStorage } from './profile/infrastructure/ActiveProfileStorage';
import { FollowPolicyCallGateway } from './transactions/adapters/FollowPolicyCallGateway';
import { OffChainRelayer } from './transactions/adapters/OffChainRelayer';
import { OnChainRelayer } from './transactions/adapters/OnChainRelayer';
import { PendingTransactionGateway } from './transactions/adapters/PendingTransactionGateway';
import { PublicationCacheManager } from './transactions/adapters/PublicationCacheManager';
import {
  FailedTransactionError,
  TransactionQueuePresenter,
} from './transactions/adapters/TransactionQueuePresenter';
import { CollectPublicationResponder } from './transactions/adapters/responders/CollectPublicationResponder';
import { CreateMirrorResponder } from './transactions/adapters/responders/CreateMirrorResponder';
import { CreatePostResponder } from './transactions/adapters/responders/CreatePostResponder';
import { CreateProfileResponder } from './transactions/adapters/responders/CreateProfileResponder';
import { FollowProfilesResponder } from './transactions/adapters/responders/FollowProfilesResponder';
import { NoopResponder } from './transactions/adapters/responders/NoopResponder';
import { UnfollowProfileResponder } from './transactions/adapters/responders/UnfollowProfileResponder';
import { UpdateDispatcherConfigResponder } from './transactions/adapters/responders/UpdateDispatcherConfigResponder';
import { UpdateFollowPolicyResponder } from './transactions/adapters/responders/UpdateFollowPolicyResponder';
import { UpdateProfileImageResponder } from './transactions/adapters/responders/UpdateProfileImageResponder';
import { UpdateProfileMetadataResponder } from './transactions/adapters/responders/UpdateProfileMetadataResponder';
import { ProfileCacheManager } from './transactions/infrastructure/ProfileCacheManager';
import { TransactionFactory } from './transactions/infrastructure/TransactionFactory';
import { TransactionObserver } from './transactions/infrastructure/TransactionObserver';
import { createTransactionStorage } from './transactions/infrastructure/TransactionStorage';
import { activeWalletVar } from './wallet/adapters/ActiveWalletPresenter';
import { BalanceGateway } from './wallet/adapters/BalanceGateway';
import { CredentialsFactory } from './wallet/adapters/CredentialsFactory';
import { CredentialsGateway } from './wallet/adapters/CredentialsGateway';
import { LogoutHandler } from './wallet/adapters/LogoutPresenter';
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
  onError: ErrorHandler<FailedTransactionError>;
};

export type SharedDependencies = {
  activeProfileGateway: ActiveProfileGateway;
  activeProfilePresenter: ActiveProfilePresenter;
  activeWallet: ActiveWallet;
  apolloClient: SafeApolloClient;
  appId?: AppId;
  authApi: AuthApi;
  bindings: IBindings;
  credentialsFactory: CredentialsFactory;
  credentialsGateway: CredentialsGateway;
  environment: EnvironmentConfig;
  followPolicyCallGateway: FollowPolicyCallGateway;
  inboxKeyStorage: IStorage<string>;
  logger: ILogger;
  notificationStorage: IStorage<UnreadNotificationsData>;
  offChainRelayer: OffChainRelayer;
  onChainRelayer: OnChainRelayer;
  onError: Handlers['onError'];
  onLogout: Handlers['onLogout'];
  profileGateway: ProfileGateway;
  providerFactory: ProviderFactory;
  publicationCacheManager: PublicationCacheManager;
  sources: Sources;
  storageProvider: IStorageProvider;
  tokenAvailability: TokenAvailability;
  transactionFactory: TransactionFactory;
  transactionGateway: PendingTransactionGateway;
  transactionQueue: TransactionQueue<AnyTransactionRequest>;
  walletFactory: WalletFactory;
  walletGateway: WalletGateway;
};

export function createSharedDependencies(
  config: LensConfig,
  { onLogout, onError }: Handlers,
): SharedDependencies {
  const sources = (config.sources as Sources) ?? [];
  const logger = config.logger ?? new ConsoleLogger();

  // storages
  const activeProfileStorage = createActiveProfileStorage(config.storage, config.environment.name);
  const credentialsStorage = new CredentialsStorage(config.storage, config.environment.name);
  const walletStorage = createWalletStorage(config.storage, config.environment.name);
  const notificationStorage = createNotificationStorage(config.storage, config.environment.name);
  const transactionStorage = createTransactionStorage(config.storage, config.environment.name);
  const inboxKeyStorage = createInboxKeyStorage(config.storage, config.environment.name);

  // apollo client
  const anonymousApolloClient = createAuthApolloClient({
    backendURL: config.environment.backend,
    activeWalletVar: activeWalletVar,
    logger,
  });
  const authApi = new AuthApi(anonymousApolloClient);
  const accessTokenStorage = new AccessTokenStorage(authApi, credentialsStorage);
  const apolloClient = createLensApolloClient({
    backendURL: config.environment.backend,
    accessTokenStorage,
    activeWalletVar: activeWalletVar,
    pollingInterval: config.environment.timings.pollingInterval,
    logger,
    contentMatchers: [config.environment.snapshot.matcher],
  });
  const publicationCacheManager = new PublicationCacheManager(apolloClient.cache);
  const profileCacheManager = new ProfileCacheManager(apolloClient, sources);

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
  const followPolicyCallGateway = new FollowPolicyCallGateway(apolloClient);

  const profileGateway = new ProfileGateway(apolloClient);
  const activeProfileGateway = new ActiveProfileGateway(activeProfileStorage);
  const activeProfilePresenter = new ActiveProfilePresenter();

  const activeWallet = new ActiveWallet(credentialsGateway, walletGateway);

  const responders: TransactionResponders<AnyTransactionRequest> = {
    [TransactionKind.APPROVE_MODULE]: new NoopResponder(),
    [TransactionKind.COLLECT_PUBLICATION]: new CollectPublicationResponder(apolloClient, sources),
    [TransactionKind.CREATE_COMMENT]: new NoopResponder(),
    [TransactionKind.CREATE_POST]: new CreatePostResponder(
      profileCacheManager,
      apolloClient,
      sources,
    ),
    [TransactionKind.CREATE_PROFILE]: new CreateProfileResponder(
      profileCacheManager,
      config.environment.handleResolver,
    ),
    [TransactionKind.FOLLOW_PROFILES]: new FollowProfilesResponder(apolloClient.cache),
    [TransactionKind.MIRROR_PUBLICATION]: new CreateMirrorResponder(apolloClient, sources),
    [TransactionKind.UNFOLLOW_PROFILE]: new UnfollowProfileResponder(apolloClient.cache),
    [TransactionKind.UPDATE_DISPATCHER_CONFIG]: new UpdateDispatcherConfigResponder(
      profileCacheManager,
    ),
    [TransactionKind.UPDATE_FOLLOW_POLICY]: new UpdateFollowPolicyResponder(profileCacheManager),
    [TransactionKind.UPDATE_PROFILE_DETAILS]: new UpdateProfileMetadataResponder(
      profileCacheManager,
    ),
    [TransactionKind.UPDATE_PROFILE_IMAGE]: new UpdateProfileImageResponder(profileCacheManager),
  };
  const transactionQueuePresenter = new TransactionQueuePresenter(onError);

  const onChainRelayer = new OnChainRelayer(apolloClient, transactionFactory, logger);
  const offChainRelayer = new OffChainRelayer(apolloClient, transactionFactory, logger);

  // common interactors
  const transactionQueue = new TransactionQueue(
    responders,
    transactionGateway,
    transactionQueuePresenter,
  );
  const tokenAvailability = new TokenAvailability(balanceGateway, tokenGateway, activeWallet);

  return {
    activeProfileGateway,
    activeProfilePresenter,
    activeWallet,
    apolloClient,
    appId: config.appId,
    authApi,
    bindings: config.bindings,
    credentialsFactory,
    credentialsGateway,
    environment: config.environment,
    followPolicyCallGateway,
    inboxKeyStorage,
    logger,
    notificationStorage,
    offChainRelayer,
    onChainRelayer,
    onError,
    onLogout,
    profileGateway,
    providerFactory,
    publicationCacheManager,
    sources,
    storageProvider: config.storage,
    tokenAvailability,
    transactionFactory,
    transactionGateway,
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
