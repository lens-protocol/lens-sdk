import {
  PendingSigningRequestError,
  TransactionError,
  UserRejectedError,
  WalletConnectionError,
} from '@lens-protocol/domain/entities';
import { ActiveWallet } from '@lens-protocol/domain/use-cases/authentication';
import { UnfollowProfile, UnfollowRequest } from '@lens-protocol/domain/use-cases/profile';
import { BroadcastingError } from '@lens-protocol/domain/use-cases/transactions';
import { PromiseResult } from '@lens-protocol/shared-kernel';

import { useSharedDependencies } from '../../shared';
import { OnChainRelayer } from './OnChainRelayer';
import { TransactionResultPresenter } from './TransactionResultPresenter';
import { UnfollowProfileCallGateway } from './UnfollowProfileCallGateway';
import { validateUnfollowRequest } from './schemas/validators';

export function useUnfollowProfileController() {
  const {
    apolloClient,
    credentialsGateway,
    logger,
    transactionFactory,
    transactionGateway,
    transactionQueue,
    walletGateway,
  } = useSharedDependencies();

  return async (
    request: UnfollowRequest,
  ): PromiseResult<
    void,
    | BroadcastingError
    | PendingSigningRequestError
    | UserRejectedError
    | WalletConnectionError
    | TransactionError
  > => {
    validateUnfollowRequest(request);

    const presenter = new TransactionResultPresenter<
      UnfollowRequest,
      BroadcastingError | PendingSigningRequestError | UserRejectedError | WalletConnectionError
    >();
    const gateway = new UnfollowProfileCallGateway(apolloClient);
    const activeWallet = new ActiveWallet(credentialsGateway, walletGateway);
    const onChainRelayer = new OnChainRelayer(apolloClient, transactionFactory, logger);

    const unfollowProfiles = new UnfollowProfile(
      activeWallet,
      transactionGateway,
      gateway,
      onChainRelayer,
      transactionQueue,
      presenter,
    );

    await unfollowProfiles.execute(request);

    const result = presenter.asResult();

    if (result.isSuccess()) {
      return result.value.waitForCompletion();
    }
    return result;
  };
}
