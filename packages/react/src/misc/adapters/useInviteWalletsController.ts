import {
  InviteWallets,
  InviteWalletsRequest,
  WalletAlreadyInvitedError,
} from '@lens-protocol/domain/use-cases/wallets';
import { PromiseResult } from '@lens-protocol/shared-kernel';

import { useSharedDependencies } from '../../shared';
import { InviteWalletsGateway } from './InviteWalletsGateway';
import { InviteWalletsPresenter } from './InviteWalletsPresenter';

export function useInviteWalletsController() {
  const { apolloClient, profileCacheManager } = useSharedDependencies();

  return async (request: InviteWalletsRequest): PromiseResult<void, WalletAlreadyInvitedError> => {
    const presenter = new InviteWalletsPresenter(apolloClient, profileCacheManager);
    const gateway = new InviteWalletsGateway(apolloClient);
    const inviteWallets = new InviteWallets(gateway, gateway, presenter);

    await inviteWallets.invite(request);

    return presenter.asResult();
  };
}
