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
import { BroadcastingError } from '@lens-protocol/domain/use-cases/transactions';
import { PromiseResult } from '@lens-protocol/shared-kernel';

import { useSharedDependencies } from '../../shared';
import { TransactionResultPresenter } from './TransactionResultPresenter';
import { UpdateFollowPolicyCallGateway } from './UpdateFollowPolicyCallGateway';
import { validateUpdateFollowPolicyRequest } from './schemas/validators';

export function useUpdateFollowPolicyController() {
  const { activeWallet, apolloClient, onChainRelayer, transactionGateway, transactionQueue } =
    useSharedDependencies();

  return async (
    request: UpdateFollowPolicyRequest,
  ): PromiseResult<
    void,
    | BroadcastingError
    | PendingSigningRequestError
    | UserRejectedError
    | WalletConnectionError
    | TransactionError
  > => {
    validateUpdateFollowPolicyRequest(request);

    const presenter = new TransactionResultPresenter<
      UpdateFollowPolicyRequest,
      BroadcastingError | PendingSigningRequestError | UserRejectedError | WalletConnectionError
    >();
    const gateway = new UpdateFollowPolicyCallGateway(apolloClient);

    const updateFollowPolicy = new UpdateFollowPolicy(
      activeWallet,
      transactionGateway,
      gateway,
      onChainRelayer,
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
