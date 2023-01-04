import { UnfollowProfile, UnfollowRequest } from '@lens-protocol/domain/dist/esm/use-cases/profile';
import {
  PendingSigningRequestError,
  WalletConnectionError,
  UserRejectedError,
} from '@lens-protocol/domain/entities';
import { IEquatableError } from '@lens-protocol/shared-kernel';

import { useSharedDependencies } from '../../shared';
import { PromiseResultPresenter } from './PromiseResultPresenter';
import { UnfollowProfileCallGateway } from './UnfollowProfileCallGateway';

export function useUnfollowController() {
  const { activeWallet, apolloClient, transactionGateway, protocolCallRelayer, transactionQueue } =
    useSharedDependencies();

  return async (request: UnfollowRequest) => {
    const presenter = new PromiseResultPresenter<
      void,
      PendingSigningRequestError | WalletConnectionError | UserRejectedError | IEquatableError
    >();

    const unfollowProfileCallGateway = new UnfollowProfileCallGateway(apolloClient);

    const unfollowProfiles = new UnfollowProfile(
      activeWallet,
      transactionGateway,
      unfollowProfileCallGateway,
      protocolCallRelayer,
      transactionQueue,
      presenter,
    );

    void unfollowProfiles.execute(request);

    return presenter.asResult();
  };
}
