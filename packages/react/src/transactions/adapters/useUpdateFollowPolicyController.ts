import {
  PendingSigningRequestError,
  UserRejectedError,
  WalletConnectionError,
} from '@lens-protocol/domain/entities';
import {
  UpdateFollowPolicy,
  UpdateFollowPolicyRequest,
} from '@lens-protocol/domain/use-cases/profile';

import { PromiseResultPresenter } from './PromiseResultPresenter';
import { useSharedDependencies } from '../../shared';

export function useUpdateFollowPolicyController() {
  const {
    activeWallet,
    transactionGateway,
    followPolicyCallGateway,
    protocolCallRelayer,
    transactionQueue,
  } = useSharedDependencies();

  return async (args: UpdateFollowPolicyRequest) => {
    const presenter = new PromiseResultPresenter<
      void,
      PendingSigningRequestError | UserRejectedError | WalletConnectionError
    >();
    const updateFollowPolicy = new UpdateFollowPolicy(
      activeWallet,
      transactionGateway,
      followPolicyCallGateway,
      protocolCallRelayer,
      transactionQueue,
      presenter,
    );

    await updateFollowPolicy.execute(args);

    return presenter.asResult();
  };
}
