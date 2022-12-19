import { LogoutReason } from '@lens-protocol/domain/use-cases/wallets';

import { useWalletLogoutController } from './adapters/useWalletLogoutController';

export function useWalletLogout() {
  const logout = useWalletLogoutController();

  return () => {
    logout(LogoutReason.USER_INITIATED);
  };
}
