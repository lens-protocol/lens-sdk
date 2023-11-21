import {
  PendingSigningRequestError,
  UserRejectedError,
  WalletConnectionError,
} from '@lens-protocol/domain/entities';
import {
  UpdateFollowPolicy,
  UpdateFollowPolicyRequest,
} from '@lens-protocol/domain/use-cases/profile';
import { BroadcastingError } from '@lens-protocol/domain/use-cases/transactions';

import { useSharedDependencies } from '../../shared';
import { TransactionResultPresenter } from './TransactionResultPresenter';
import { validateUpdateFollowPolicyRequest } from './schemas/validators';

export function useUpdateFollowPolicyController() {
  const {
    activeWallet,
    transactionGateway,
    followPolicyCallGateway,
    onChainRelayer,
    transactionQueue,
  } = useSharedDependencies();

  return async (request: UpdateFollowPolicyRequest) => {
    validateUpdateFollowPolicyRequest(request);

    const presenter = new TransactionResultPresenter<
      UpdateFollowPolicyRequest,
      BroadcastingError | PendingSigningRequestError | UserRejectedError | WalletConnectionError
    >();
    const updateFollowPolicy = new UpdateFollowPolicy(
      activeWallet,
      transactionGateway,
      followPolicyCallGateway,
      onChainRelayer,
      transactionQueue,
      presenter,
    );

    await updateFollowPolicy.execute(request);

    return presenter.asResult();
  };
}
