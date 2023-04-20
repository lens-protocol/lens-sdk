import {
  PendingSigningRequestError,
  UserRejectedError,
  WalletConnectionError,
} from '@lens-protocol/domain/entities';
import {
  FollowProfiles,
  FollowRequest,
  UnconstrainedFollowRequest,
} from '@lens-protocol/domain/use-cases/profile';
import {
  BroadcastingError,
  SubsidizedCall,
  SignlessProtocolCallUseCase,
} from '@lens-protocol/domain/use-cases/transactions';
import {
  InsufficientAllowanceError,
  InsufficientFundsError,
} from '@lens-protocol/domain/use-cases/wallets';

import { useSharedDependencies } from '../../shared';
import { FollowProfilesCallGateway } from './FollowProfilesCallGateway';
import { FollowProxyActionRelayer } from './FollowProxyActionRelayer';
import { PromiseResultPresenter } from './PromiseResultPresenter';

export function useFollowController() {
  const {
    activeWallet,
    apolloClient,
    logger,
    protocolCallRelayer,
    tokenAvailability,
    transactionFactory,
    transactionGateway,
    transactionQueue,
  } = useSharedDependencies();

  return async (request: FollowRequest) => {
    const presenter = new PromiseResultPresenter<
      void,
      | BroadcastingError
      | InsufficientAllowanceError
      | InsufficientFundsError
      | PendingSigningRequestError
      | UserRejectedError
      | WalletConnectionError
    >();

    const followProfilesCallGateway = new FollowProfilesCallGateway(apolloClient);

    const signedFollow = new SubsidizedCall<FollowRequest>(
      activeWallet,
      transactionGateway,
      followProfilesCallGateway,
      protocolCallRelayer,
      transactionQueue,
      presenter,
    );

    const followProxyActionRelayer = new FollowProxyActionRelayer(
      apolloClient,
      transactionFactory,
      logger,
    );
    const signlessFollow = new SignlessProtocolCallUseCase<UnconstrainedFollowRequest>(
      followProxyActionRelayer,
      transactionQueue,
      presenter,
    );

    const followProfiles = new FollowProfiles(
      tokenAvailability,
      signedFollow,
      signlessFollow,
      presenter,
    );

    void followProfiles.execute(request);

    return presenter.asResult();
  };
}
