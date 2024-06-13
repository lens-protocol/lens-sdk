import {
  createAuthApolloClient,
  createLensApolloClient,
  SafeApolloClient,
} from '@lens-protocol/api-bindings';
import { TransactionKind } from '@lens-protocol/domain/entities';
import { ActiveWallet, Logout } from '@lens-protocol/domain/use-cases/authentication';
import {
  AnyTransactionRequest,
  TransactionQueue,
  TransactionResponders,
} from '@lens-protocol/domain/use-cases/transactions';
import { TokenAvailability } from '@lens-protocol/domain/use-cases/wallets';
import { invariant } from '@lens-protocol/shared-kernel';
import { IStorage } from '@lens-protocol/storage';
import React, { ReactNode, useContext } from 'react';

import { AuthApi } from './authentication/adapters/AuthApi';
import { CredentialsFactory } from './authentication/adapters/CredentialsFactory';
import { CredentialsGateway } from './authentication/adapters/CredentialsGateway';
import { CredentialsStorage } from './authentication/adapters/CredentialsStorage';
import { LogoutPresenter } from './authentication/adapters/LogoutPresenter';
import { createRefreshTokenStorage } from './authentication/adapters/RefreshTokenStorage';
import { BaseConfig, RequiredConfig, resolveConfig } from './config';
import { createInboxKeyStorage, DisableConversationsGateway } from './inbox';
import { IProfileCacheManager } from './profile/adapters/IProfileCacheManager';
import { ProfileCacheManager } from './profile/infrastructure/ProfileCacheManager';
import { PublicationCacheManager } from './publication/infrastructure/PublicationCacheManager';
import { ITransactionFactory } from './transactions/adapters/ITransactionFactory';
import { MomokaRelayer } from './transactions/adapters/MomokaRelayer';
import { OnChainRelayer } from './transactions/adapters/OnChainRelayer';
import { PendingTransactionGateway } from './transactions/adapters/PendingTransactionGateway';
import { TransactionQueuePresenter } from './transactions/adapters/TransactionQueuePresenter';
import { BlockProfilesResponder } from './transactions/adapters/responders/BlockProfilesResponder';
import { CreateProfileResponder } from './transactions/adapters/responders/CreateProfileResponder';
import { FollowProfileResponder } from './transactions/adapters/responders/FollowProfileResponder';
import { LinkHandleResponder } from './transactions/adapters/responders/LinkHandleResponder';
import { NoopResponder } from './transactions/adapters/responders/NoopResponder';
import { RefreshCurrentProfileResponder } from './transactions/adapters/responders/RefreshCurrentProfileResponder';
import { RefreshPublicationResponder } from './transactions/adapters/responders/RefreshPublicationResponder';
import { UnblockProfilesResponder } from './transactions/adapters/responders/UnblockProfilesResponder';
import { UnfollowProfileResponder } from './transactions/adapters/responders/UnfollowProfileResponder';
import { UpdateProfileManagersResponder } from './transactions/adapters/responders/UpdateProfileManagersResponder';
import { TransactionFactory } from './transactions/infrastructure/TransactionFactory';
import { TransactionObserver } from './transactions/infrastructure/TransactionObserver';
import { createTransactionStorage } from './transactions/infrastructure/TransactionStorage';
import { BalanceGateway } from './wallet/adapters/BalanceGateway';
import { IProviderFactory } from './wallet/adapters/IProviderFactory';
import { TokenGateway } from './wallet/adapters/TokenGateway';
import { WalletGateway } from './wallet/adapters/WalletGateway';
import { ProviderFactory } from './wallet/infrastructure/ProviderFactory';
import { SignerFactory } from './wallet/infrastructure/SignerFactory';

/**
 * @internal
 */
export function createSharedDependencies(userConfig: BaseConfig): SharedDependencies {
  const config = resolveConfig(userConfig);

  // auth api
  const anonymousApolloClient = createAuthApolloClient({
    uri: config.environment.backend,
    logger: config.logger,
    origin: config.origin,
  });
  const authApi = new AuthApi(anonymousApolloClient);

  // storages
  const credentialsStorage = new CredentialsStorage(
    createRefreshTokenStorage(config.storage, config.environment.name),
    authApi,
  );
  const transactionStorage = createTransactionStorage(config.storage, config.environment.name);
  const inboxKeyStorage = createInboxKeyStorage(config.storage, config.environment.name);

  // apollo client
  const apolloClient = createLensApolloClient({
    connectToDevTools: config.debug,
    uri: config.environment.backend,
    accessTokenStorage: credentialsStorage,
    pollingInterval: config.environment.timings.pollingInterval,
    logger: config.logger,
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
  const credentialsGateway = new CredentialsGateway(credentialsStorage, apolloClient);
  const profileCacheManager = new ProfileCacheManager(apolloClient, config.fragmentVariables);
  const publicationCacheManager = new PublicationCacheManager(
    apolloClient,
    config.fragmentVariables,
  );
  const walletGateway = new WalletGateway(signerFactory, transactionFactory);
  const transactionGateway = new PendingTransactionGateway(transactionStorage, transactionFactory);
  const onChainRelayer = new OnChainRelayer(apolloClient, transactionFactory, config.logger);
  const momokaRelayer = new MomokaRelayer(apolloClient, transactionFactory, config.logger);
  const conversationsGateway = new DisableConversationsGateway(inboxKeyStorage);

  const responders: TransactionResponders<AnyTransactionRequest> = {
    [TransactionKind.ACT_ON_PUBLICATION]: new RefreshPublicationResponder(publicationCacheManager),
    [TransactionKind.APPROVE_MODULE]: new NoopResponder(),
    [TransactionKind.BLOCK_PROFILE]: new BlockProfilesResponder(profileCacheManager),
    [TransactionKind.CLAIM_HANDLE]: new CreateProfileResponder(apolloClient),
    [TransactionKind.CREATE_COMMENT]: new RefreshCurrentProfileResponder(profileCacheManager),
    [TransactionKind.CREATE_POST]: new RefreshCurrentProfileResponder(profileCacheManager),
    [TransactionKind.CREATE_PROFILE]: new CreateProfileResponder(apolloClient),
    [TransactionKind.CREATE_QUOTE]: new RefreshCurrentProfileResponder(profileCacheManager),
    [TransactionKind.FOLLOW_PROFILE]: new FollowProfileResponder(apolloClient, profileCacheManager),
    [TransactionKind.LINK_HANDLE]: new LinkHandleResponder(apolloClient, profileCacheManager),
    [TransactionKind.MIRROR_PUBLICATION]: new RefreshCurrentProfileResponder(profileCacheManager),
    [TransactionKind.UNBLOCK_PROFILE]: new UnblockProfilesResponder(profileCacheManager),
    [TransactionKind.UNFOLLOW_PROFILE]: new UnfollowProfileResponder(
      apolloClient,
      profileCacheManager,
    ),
    [TransactionKind.UNLINK_HANDLE]: new LinkHandleResponder(apolloClient, profileCacheManager),
    [TransactionKind.UPDATE_FOLLOW_POLICY]: new RefreshCurrentProfileResponder(profileCacheManager),
    [TransactionKind.UPDATE_PROFILE_DETAILS]: new RefreshCurrentProfileResponder(
      profileCacheManager,
    ),
    [TransactionKind.UPDATE_PROFILE_MANAGERS]: new UpdateProfileManagersResponder(
      apolloClient,
      profileCacheManager,
    ),
  };
  const transactionQueuePresenter = new TransactionQueuePresenter();

  const balanceGateway = new BalanceGateway(providerFactory);
  const tokenGateway = new TokenGateway(providerFactory);

  // common interactors
  const activeWallet = new ActiveWallet(credentialsGateway, walletGateway);
  const tokenAvailability = new TokenAvailability(balanceGateway, tokenGateway, activeWallet);
  const transactionQueue = TransactionQueue.create(
    responders,
    transactionGateway,
    transactionQueuePresenter,
  );

  // logout
  const logoutPresenter = new LogoutPresenter();
  const logout = new Logout(
    credentialsGateway,
    transactionGateway,
    conversationsGateway,
    logoutPresenter,
  );

  // controllers
  credentialsStorage.onExpiry(logout);

  return {
    activeWallet,
    apolloClient,
    config,
    credentialsStorage,
    credentialsFactory,
    credentialsGateway,
    inboxKeyStorage,
    logout,
    momokaRelayer,
    onChainRelayer,
    profileCacheManager,
    providerFactory,
    publicationCacheManager,
    tokenAvailability,
    transactionFactory,
    transactionGateway,
    transactionQueue,
    walletGateway,
  };
}

/**
 * @internal
 */
export type SharedDependencies = {
  activeWallet: ActiveWallet;
  apolloClient: SafeApolloClient;
  config: RequiredConfig;
  credentialsStorage: CredentialsStorage;
  credentialsFactory: CredentialsFactory;
  credentialsGateway: CredentialsGateway;
  inboxKeyStorage: IStorage<string>;
  logout: Logout;
  momokaRelayer: MomokaRelayer;
  onChainRelayer: OnChainRelayer;
  profileCacheManager: IProfileCacheManager;
  providerFactory: IProviderFactory;
  publicationCacheManager: PublicationCacheManager;
  tokenAvailability: TokenAvailability;
  transactionFactory: ITransactionFactory<AnyTransactionRequest>;
  transactionGateway: PendingTransactionGateway;
  transactionQueue: TransactionQueue<AnyTransactionRequest>;
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
