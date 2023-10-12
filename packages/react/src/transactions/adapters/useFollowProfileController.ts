import {
  PendingSigningRequestError,
  TransactionError,
  UserRejectedError,
  WalletConnectionError,
} from '@lens-protocol/domain/entities';
import { ActiveWallet } from '@lens-protocol/domain/use-cases/authentication';
import { FollowProfile, FollowRequest } from '@lens-protocol/domain/use-cases/profile';
import { BroadcastingError, SubsidizeOnChain } from '@lens-protocol/domain/use-cases/transactions';
import {
  InsufficientAllowanceError,
  InsufficientFundsError,
  TokenAvailability,
} from '@lens-protocol/domain/use-cases/wallets';
import { PromiseResult } from '@lens-protocol/shared-kernel';

import { useSharedDependencies } from '../../shared';
import { BalanceGateway } from '../../wallet/adapters/BalanceGateway';
import { TokenGateway } from '../../wallet/adapters/TokenGateway';
import { FollowProfileCallGateway } from './FollowProfileCallGateway';
import { OnChainRelayer } from './OnChainRelayer';
import { TransactionResultPresenter } from './TransactionResultPresenter';
import { validateFollowRequest } from './schemas/validators';

export function useFollowProfileController() {
  const {
    apolloClient,
    credentialsGateway,
    logger,
    providerFactory,
    transactionFactory,
    transactionGateway,
    transactionQueue,
    walletGateway,
  } = useSharedDependencies();

  return async (
    request: FollowRequest,
  ): PromiseResult<
    void,
    | BroadcastingError
    | InsufficientAllowanceError
    | InsufficientFundsError
    | PendingSigningRequestError
    | TransactionError
    | UserRejectedError
    | WalletConnectionError
  > => {
    validateFollowRequest(request);

    const presenter = new TransactionResultPresenter<
      FollowRequest,
      | BroadcastingError
      | InsufficientAllowanceError
      | InsufficientFundsError
      | PendingSigningRequestError
      | TransactionError
      | UserRejectedError
      | WalletConnectionError
    >();
    const gateway = new FollowProfileCallGateway(apolloClient);
    const activeWallet = new ActiveWallet(credentialsGateway, walletGateway);
    const onChainRelayer = new OnChainRelayer(apolloClient, transactionFactory, logger);

    const signedFollow = new SubsidizeOnChain<FollowRequest>(
      activeWallet,
      transactionGateway,
      gateway,
      onChainRelayer,
      transactionQueue,
      presenter,
    );

    const balanceGateway = new BalanceGateway(providerFactory);
    const tokenGateway = new TokenGateway(providerFactory);
    const tokenAvailability = new TokenAvailability(balanceGateway, tokenGateway, activeWallet);

    const followProfiles = new FollowProfile(tokenAvailability, signedFollow, presenter);

    await followProfiles.execute(request);

    const result = presenter.asResult();

    if (result.isSuccess()) {
      return result.value.waitForCompletion();
    }
    return result;
  };
}
