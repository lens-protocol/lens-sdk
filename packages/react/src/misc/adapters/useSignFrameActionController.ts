import { CreateFrameEip712TypedData, FrameEip712Request } from '@lens-protocol/api-bindings';
import {
  PendingSigningRequestError,
  SignedFrameAction,
  UserRejectedError,
  WalletConnectionError,
} from '@lens-protocol/domain/entities';
import { SignFrameAction, SignFrameActionRequest } from '@lens-protocol/domain/use-cases/wallets';
import { PromiseResult } from '@lens-protocol/shared-kernel';

import { useSharedDependencies } from '../../shared';
import { PromiseResultPresenter } from '../../transactions/adapters/PromiseResultPresenter';
import { SignFrameActionGateway } from './SignFrameActionGateway';

export function useSignFrameActionController() {
  const { activeWallet, apolloClient } = useSharedDependencies();

  return async (
    request: SignFrameActionRequest<FrameEip712Request>,
  ): PromiseResult<
    SignedFrameAction<CreateFrameEip712TypedData>,
    PendingSigningRequestError | UserRejectedError | WalletConnectionError
  > => {
    const presenter = new PromiseResultPresenter<
      SignedFrameAction<CreateFrameEip712TypedData>,
      PendingSigningRequestError | UserRejectedError | WalletConnectionError
    >();
    const gateway = new SignFrameActionGateway(apolloClient);
    const frameAction = new SignFrameAction(activeWallet, gateway, presenter);

    await frameAction.execute(request);

    return presenter.asResult();
  };
}
