import { LogoutReason } from '@lens-protocol/domain/use-cases/wallets';
import { PromiseResult, success } from '@lens-protocol/shared-kernel';

import { useSharedDependencies } from '../../shared';

export function useWalletLogoutController() {
  const { walletLogout } = useSharedDependencies();

  return async (reason: LogoutReason): PromiseResult<void, never> => {
    await walletLogout.logout(reason);

    return success();
  };
}
