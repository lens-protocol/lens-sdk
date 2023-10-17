import {
  PendingSigningRequestError,
  TransactionError,
  UserRejectedError,
  WalletConnectionError,
} from '@lens-protocol/domain/entities';
import {
  UpdateFollowPolicy,
  UpdateFollowPolicyRequest,
} from '@lens-protocol/domain/use-cases/profile';
import { BroadcastingError, SubsidizeOnChain } from '@lens-protocol/domain/use-cases/transactions';
import { PromiseResult } from '@lens-protocol/shared-kernel';

import { useSharedDependencies } from '../../shared';
import { TransactionResultPresenter } from './TransactionResultPresenter';
import { UpdateFollowPolicyGateway } from './profiles/UpdateFollowPolicyGateway';
import { validateUpdateFollowPolicyRequest } from './schemas/validators';

export function useUpdateFollowPolicyController() {
  const {
    activeWallet,
    apolloClient,
    onChainRelayer,
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
  > => {
    validateUpdateFollowPolicyRequest(request);

    const presenter = new TransactionResultPresenter<
      UpdateFollowPolicyRequest,
      | BroadcastingError
      | PendingSigningRequestError
      | TransactionError
      | UserRejectedError
      | WalletConnectionError
    >();

    const gateway = new UpdateFollowPolicyGateway(apolloClient, transactionFactory);

    const signedFollow = new SubsidizeOnChain(
      activeWallet,
      transactionGateway,
      gateway,
      onChainRelayer,
      transactionQueue,
      presenter,
    );

    const updateFollowPolicy = new UpdateFollowPolicy(
      signedFollow,
      gateway,
      transactionQueue,
      presenter,
    );

    await updateFollowPolicy.execute(request);

    const result = presenter.asResult();

    if (result.isSuccess()) {
      return result.value.waitForCompletion();
    }
    return result;
  };
}
