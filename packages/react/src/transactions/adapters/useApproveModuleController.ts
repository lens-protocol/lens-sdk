import {
  InsufficientGasError,
  PendingSigningRequestError,
  UserRejectedError,
  WalletConnectionError,
} from '@lens-protocol/domain/entities';
import { TokenAllowance, TokenAllowanceRequest } from '@lens-protocol/domain/use-cases/wallets';

import { useSharedDependencies } from '../../shared';
import { ApproveTransactionGateway } from './ApproveTransactionGateway';
import { PromiseResultPresenter } from './PromiseResultPresenter';

export function useApproveModuleController() {
  const { providerFactory, gasEstimator, activeWallet, transactionQueue } = useSharedDependencies();

  return async (request: TokenAllowanceRequest) => {
    const presenter = new PromiseResultPresenter<
      void,
      InsufficientGasError | PendingSigningRequestError | UserRejectedError | WalletConnectionError
    >();
    const approveTransactionGateway = new ApproveTransactionGateway(providerFactory, gasEstimator);

    const tokenAllowance = new TokenAllowance(
      activeWallet,
      approveTransactionGateway,
      presenter,
      transactionQueue,
    );

    void tokenAllowance.increaseAllowance(request);

    return presenter.asResult();
  };
}
