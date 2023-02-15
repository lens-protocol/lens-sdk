import { LogoutReason } from '@lens-protocol/domain/use-cases/wallets';

import { useWalletLogoutController } from './adapters/useWalletLogoutController';
import { Operation, useOperation } from '../helpers';

export type WalletLogoutOperation = Operation<void>;

export function useWalletLogout() {
  const logout = useWalletLogoutController();
  return useOperation(async () => logout(LogoutReason.USER_INITIATED));
}
