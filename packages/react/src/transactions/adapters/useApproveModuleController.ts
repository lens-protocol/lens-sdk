import {
  InsufficientGasError,
  PendingSigningRequestError,
  UserRejectedError,
  WalletConnectionError,
} from '@lens-protocol/domain/entities';
import { TokenAllowance, TokenAllowanceRequest } from '@lens-protocol/domain/use-cases/wallets';

import { ApproveTransactionGateway } from './ApproveTransactionGateway';
import { PromiseResultPresenter } from './PromiseResultPresenter';
import { useSharedDependencies } from '../../shared';

export function useApproveModuleController() {
  const { providerFactory, activeWallet, transactionQueue } = useSharedDependencies();

  return async (request: TokenAllowanceRequest) => {
    const presenter = new PromiseResultPresenter<
      void,
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

    return presenter.asResult();
  };
}
