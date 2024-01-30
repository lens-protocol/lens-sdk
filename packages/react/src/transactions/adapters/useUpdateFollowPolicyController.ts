import {
  InsufficientGasError,
  PendingSigningRequestError,
  TransactionError,
  UserRejectedError,
  WalletConnectionError,
} from '@lens-protocol/domain/entities';
import {
  UpdateFollowPolicy,
  UpdateFollowPolicyRequest,
} from '@lens-protocol/domain/use-cases/profile';
import {
  BroadcastingError,
  DelegableSigning,
  PaidTransaction,
  SignedOnChain,
} from '@lens-protocol/domain/use-cases/transactions';
import { PromiseResult } from '@lens-protocol/shared-kernel';

import { useSharedDependencies } from '../../shared';
import { TransactionResultPresenter } from './TransactionResultPresenter';
import { UpdateFollowPolicyGateway } from './profiles/UpdateFollowPolicyGateway';
import { validateUpdateFollowPolicyRequest } from './schemas/validators';

export function useUpdateFollowPolicyController() {
  const {
    activeWallet,
    apolloClient,
    config,
    onChainRelayer,
    providerFactory,
    transactionFactory,
    transactionGateway,
    transactionQueue,
  } = useSharedDependencies();

  return async (
    request: UpdateFollowPolicyRequest,
  ): PromiseResult<
    void,
    | BroadcastingError
    | PendingSigningRequestError
    | TransactionError
    | UserRejectedError
    | WalletConnectionError
    | InsufficientGasError
  > => {
    validateUpdateFollowPolicyRequest(request);

    const presenter = new TransactionResultPresenter<
      UpdateFollowPolicyRequest,
      | BroadcastingError
      | PendingSigningRequestError
      | TransactionError
      | UserRejectedError
      | WalletConnectionError
      | InsufficientGasError
    >();

    const gateway = new UpdateFollowPolicyGateway(
      config,
      providerFactory,
      apolloClient,
      transactionFactory,
    );

    const signedExecution = new SignedOnChain<UpdateFollowPolicyRequest>(
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

    const updateFollowPolicy = new UpdateFollowPolicy(delegableExecution, paidExecution);

    await updateFollowPolicy.execute(request);

    const result = presenter.asResult();

    if (result.isSuccess()) {
      return result.value.waitForCompletion();
    }
    return result;
  };
}
