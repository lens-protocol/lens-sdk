import {
  UpdateFollowPolicy,
  UpdateFollowPolicyRequest,
} from '@lens-protocol/domain/dist/use-cases/profile';

import { useSharedDependencies } from '../../shared';
import { PromiseResultPresenter } from './PromiseResultPresenter';

export function useUpdateFollowPolicyController() {
  const {
    activeWallet,
    transactionGateway,
    followPolicyCallGateway,
    protocolCallRelayer,
    transactionQueue,
  } = useSharedDependencies();

  return async (args: UpdateFollowPolicyRequest) => {
    const presenter = new PromiseResultPresenter<void, never>();
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
