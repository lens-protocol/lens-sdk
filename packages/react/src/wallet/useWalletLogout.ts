import { LogoutReason } from '@lens-protocol/domain/dist/use-cases/wallets';

import { useOperation } from '../helpers';
import { useWalletLogoutController } from './adapters/useWalletLogoutController';

export function useWalletLogout() {
  const logout = useWalletLogoutController();
  return useOperation(async () => logout(LogoutReason.USER_INITIATED));
}
