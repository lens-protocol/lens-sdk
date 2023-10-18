import {
  InsufficientGasError,
  PendingSigningRequestError,
  TransactionError,
  UserRejectedError,
  WalletConnectionError,
} from '@lens-protocol/domain/entities';
import {
  TokenAllowance,
  TokenAllowanceRequest,
} from '@lens-protocol/domain/use-cases/transactions';
import { PromiseResult } from '@lens-protocol/shared-kernel';

import { useSharedDependencies } from '../../shared';
import { ApproveTransactionGateway } from './ApproveTransactionGateway';
import { TransactionResultPresenter } from './TransactionResultPresenter';

export function useTokenAllowanceController() {
  const { providerFactory, activeWallet, transactionQueue } = useSharedDependencies();

  return async (
    request: TokenAllowanceRequest,
  ): PromiseResult<
    void,
    | InsufficientGasError
    | PendingSigningRequestError
    | TransactionError
    | UserRejectedError
    | WalletConnectionError
  > => {
    const presenter = new TransactionResultPresenter<
      TokenAllowanceRequest,
      InsufficientGasError | PendingSigningRequestError | UserRejectedError | WalletConnectionError
    >();
    const approveTransactionGateway = new ApproveTransactionGateway(providerFactory);

    const tokenAllowance = new TokenAllowance(
      activeWallet,
      approveTransactionGateway,
      presenter,
      transactionQueue,
    );

    await tokenAllowance.increaseAllowance(request);

    const result = presenter.asResult();

    if (result.isSuccess()) {
      return result.value.waitForCompletion();
    }
    return result;
  };
}
