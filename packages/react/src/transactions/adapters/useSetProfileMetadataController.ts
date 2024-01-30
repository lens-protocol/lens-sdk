import {
  InsufficientGasError,
  PendingSigningRequestError,
  UserRejectedError,
  WalletConnectionError,
} from '@lens-protocol/domain/entities';
import {
  SetProfileMetadata,
  SetProfileMetadataRequest,
} from '@lens-protocol/domain/use-cases/profile';
import {
  BroadcastingError,
  DelegableSigning,
  PaidTransaction,
  SignedOnChain,
} from '@lens-protocol/domain/use-cases/transactions';

import { useSharedDependencies } from '../../shared';
import { TransactionResultPresenter } from './TransactionResultPresenter';
import { ProfileMetadataGateway } from './profiles/ProfileMetadataGateway';

export function useSetProfileMetadataController() {
  const {
    activeWallet,
    apolloClient,
    config,
    onChainRelayer,
    providerFactory,
    transactionGateway,
    transactionQueue,
    transactionFactory,
  } = useSharedDependencies();

  return async (request: SetProfileMetadataRequest) => {
    const presenter = new TransactionResultPresenter<
      SetProfileMetadataRequest,
      | BroadcastingError
      | InsufficientGasError
      | PendingSigningRequestError
      | UserRejectedError
      | WalletConnectionError
    >();

    const gateway = new ProfileMetadataGateway(
      config,
      providerFactory,
      apolloClient,
      transactionFactory,
    );

    const signedExecution = new SignedOnChain<SetProfileMetadataRequest>(
      activeWallet,
      transactionGateway,
      gateway,
      onChainRelayer,
      transactionQueue,
      presenter,
    );

    const delegableExecution = new DelegableSigning(
      signedExecution,
      gateway,
      transactionQueue,
      presenter,
    );

    const paidExecution = new PaidTransaction(activeWallet, gateway, presenter, transactionQueue);

    const setProfileMetadata = new SetProfileMetadata(delegableExecution, paidExecution);

    await setProfileMetadata.execute(request);

    return presenter.asResult();
  };
}
