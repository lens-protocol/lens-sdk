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
import { validateTokenAllowanceRequest } from './schemas/validators';

export function useApproveModuleController() {
  const { providerFactory, activeWallet, transactionQueue } = useSharedDependencies();

  return async (request: TokenAllowanceRequest) => {
    validateTokenAllowanceRequest(request);

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
