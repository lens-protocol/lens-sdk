import {
  PendingSigningRequestError,
  UserRejectedError,
  WalletConnectionError,
} from '@lens-protocol/domain/dist/esm/entities';
import {
  InsufficientAllowanceError,
  InsufficientFundsError,
} from '@lens-protocol/domain/dist/esm/use-cases/wallets';
import {
  FollowProfiles,
  FollowRequest,
  UnconstrainedFollowRequest,
} from '@lens-protocol/domain/use-cases/profile';
import {
  ProtocolCallUseCase,
  SignlessProtocolCallUseCase,
} from '@lens-protocol/domain/use-cases/transactions';

import { useSharedDependencies } from '../../shared';
import { FollowProfilesCallGateway } from './FollowProfilesCallGateway';
import { PromiseResultPresenter } from './PromiseResultPresenter';

export function useFollowController() {
  const {
    activeWallet,
    apolloClient,
    tokenAvailability,
    transactionGateway,
    protocolCallRelayer,
    transactionQueue,
    signlessProtocolCallRelayer,
  } = useSharedDependencies();

  return async (request: FollowRequest) => {
    const presenter = new PromiseResultPresenter<
      void,
      | InsufficientAllowanceError
      | InsufficientFundsError
      | PendingSigningRequestError
      | UserRejectedError
      | WalletConnectionError
    >();

    const followProfilesCallGateway = new FollowProfilesCallGateway(apolloClient);

    const signedFollow = new ProtocolCallUseCase<FollowRequest>(
      activeWallet,
      transactionGateway,
      followProfilesCallGateway,
      protocolCallRelayer,
      transactionQueue,
      presenter,
    );

    const signlessFollow = new SignlessProtocolCallUseCase<UnconstrainedFollowRequest>(
      signlessProtocolCallRelayer,
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
