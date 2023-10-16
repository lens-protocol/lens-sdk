import {
  PendingSigningRequestError,
  TransactionError,
  UserRejectedError,
  WalletConnectionError,
} from '@lens-protocol/domain/entities';
import { FollowProfile, FollowRequest } from '@lens-protocol/domain/use-cases/profile';
import {
  BroadcastingError,
  DelegableSigning,
  SubsidizeOnChain,
} from '@lens-protocol/domain/use-cases/transactions';
import {
  InsufficientAllowanceError,
  InsufficientFundsError,
} from '@lens-protocol/domain/use-cases/wallets';
import { PromiseResult } from '@lens-protocol/shared-kernel';

import { useSharedDependencies } from '../../shared';
import { TransactionResultPresenter } from './TransactionResultPresenter';
import { FollowProfileGateway } from './profiles/FollowProfileGateway';
import { validateFollowRequest } from './schemas/validators';

export function useFollowController() {
  const {
    activeWallet,
    apolloClient,
    onChainRelayer,
    tokenAvailability,
    transactionFactory,
    transactionGateway,
    transactionQueue,
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
      | UserRejectedError
      | WalletConnectionError
    >();
    const gateway = new FollowProfileGateway(apolloClient, transactionFactory);

    const signedFollow = new SubsidizeOnChain(
      activeWallet,
      transactionGateway,
      gateway,
      onChainRelayer,
      transactionQueue,
      presenter,
    );

    const delegableFollow = new DelegableSigning(
      signedFollow,
      gateway,
      transactionQueue,
      presenter,
    );

    const followProfile = new FollowProfile(
      tokenAvailability,
      signedFollow,
      delegableFollow,
      presenter,
    );

    await followProfile.execute(request);

    const result = presenter.asResult();

    if (result.isSuccess()) {
      return result.value.waitForCompletion();
    }
    return result;
  };
}
