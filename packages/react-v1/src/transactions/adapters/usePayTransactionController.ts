import {
  InsufficientGasError,
  PendingSigningRequestError,
  UserRejectedError,
  WalletConnectionError,
} from '@lens-protocol/domain/entities';
import {
  AnyTransactionRequest,
  PayTransaction,
  ProtocolTransactionRequest,
} from '@lens-protocol/domain/use-cases/transactions';

import { useSharedDependencies } from '../../shared';
import { SelfFundedProtocolCallGateway } from './SelfFundedProtocolCallGateway';
import { SelfFundedProtocolTransactionRequest } from './SelfFundedProtocolTransactionRequest';
import { TransactionResultPresenter } from './TransactionResultPresenter';

export function usePayTransactionController<T extends ProtocolTransactionRequest>() {
  const { activeWallet, providerFactory, transactionQueue } = useSharedDependencies();

  return async (request: SelfFundedProtocolTransactionRequest<T>) => {
    const gateway = new SelfFundedProtocolCallGateway(providerFactory);

    const presenter = new TransactionResultPresenter<
      AnyTransactionRequest,
      InsufficientGasError | PendingSigningRequestError | WalletConnectionError | UserRejectedError
    >();

    const payTransaction = new PayTransaction(activeWallet, gateway, presenter, transactionQueue);

    await payTransaction.execute(request);

    return presenter.asResult();
  };
}
