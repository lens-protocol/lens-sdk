import {
  PendingSigningRequestError,
  TransactionError,
  UserRejectedError,
  WalletConnectionError,
} from '@lens-protocol/domain/entities';
import { ActiveWallet } from '@lens-protocol/domain/use-cases/authentication';
import {
  UpdateFollowPolicy,
  UpdateFollowPolicyRequest,
} from '@lens-protocol/domain/use-cases/profile';
import { BroadcastingError } from '@lens-protocol/domain/use-cases/transactions';
import { PromiseResult } from '@lens-protocol/shared-kernel';

import { useSharedDependencies } from '../../shared';
import { OnChainRelayer } from './OnChainRelayer';
import { TransactionResultPresenter } from './TransactionResultPresenter';
import { UpdateFollowPolicyCallGateway } from './UpdateFollowPolicyCallGateway';
import { validateUpdateFollowPolicyRequest } from './schemas/validators';

export function useUpdateFollowPolicyController() {
  const {
    apolloClient,
    credentialsGateway,
    logger,
    transactionFactory,
    transactionGateway,
    transactionQueue,
    walletGateway,
  } = useSharedDependencies();

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
    const activeWallet = new ActiveWallet(credentialsGateway, walletGateway);
    const onChainRelayer = new OnChainRelayer(apolloClient, transactionFactory, logger);

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
