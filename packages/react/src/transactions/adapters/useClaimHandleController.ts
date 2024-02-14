import { ClaimProfileWithHandleErrorReasonType, Profile } from '@lens-protocol/api-bindings';
import { TransactionError } from '@lens-protocol/domain/entities';
import {
  ClaimHandle,
  ClaimHandleError,
  ClaimHandleRequest,
} from '@lens-protocol/domain/use-cases/profile';
import { PromiseResult } from '@lens-protocol/shared-kernel';

import { useSharedDependencies } from '../../shared';
import { ClaimProfilePresenter } from './ClaimProfilePresenter';
import { ClaimProfileGateway } from './profiles/ClaimProfileGateway';

export function useClaimHandleController() {
  const { apolloClient, config, profileCacheManager, transactionFactory, transactionQueue } =
    useSharedDependencies();

  return async (
    request: ClaimHandleRequest,
  ): PromiseResult<
    Profile,
    ClaimHandleError<ClaimProfileWithHandleErrorReasonType> | TransactionError
  > => {
    const gateway = new ClaimProfileGateway(apolloClient, transactionFactory);
    const presenter = new ClaimProfilePresenter(
      profileCacheManager,
      config.environment.handleResolver,
    );

    const claimHandle = new ClaimHandle(gateway, transactionQueue, presenter);

    await claimHandle.execute(request);

    const result = presenter.asResult();

    if (result.isSuccess()) {
      return result.value.waitForCompletion();
    }
    return result;
  };
}
