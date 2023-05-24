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
  SignlessSubsidizeOnChain,
  SubsidizeOnChain,
} from '@lens-protocol/domain/use-cases/transactions';
import {
  InsufficientAllowanceError,
  InsufficientFundsError,
} from '@lens-protocol/domain/use-cases/wallets';

import { useSharedDependencies } from '../../shared';
import { FollowProfilesCallGateway } from './FollowProfilesCallGateway';
import { PromiseResultPresenter } from './PromiseResultPresenter';

export function useFollowController() {
  const {
    activeWallet,
    apolloClient,
    logger,
    onChainRelayer,
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

    const followProfilesCallGateway = new FollowProfilesCallGateway(
      apolloClient,
      transactionFactory,
      logger,
    );

    const signedFollow = new SubsidizeOnChain<FollowRequest>(
      activeWallet,
      transactionGateway,
      followProfilesCallGateway,
      onChainRelayer,
      transactionQueue,
      presenter,
    );

    const signlessFollow = new SignlessSubsidizeOnChain<UnconstrainedFollowRequest>(
      followProfilesCallGateway,
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
