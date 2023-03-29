import { LogoutReason } from '@lens-protocol/domain/use-cases/wallets';

import { Operation, useOperation } from '../helpers/operations';
import { useWalletLogoutController } from './adapters/useWalletLogoutController';

export type WalletLogoutOperation = Operation<void>;

/**
 * @category Wallet
 * @group Hooks
 */
export function useWalletLogout() {
  const logout = useWalletLogoutController();
  return useOperation(async () => logout(LogoutReason.USER_INITIATED));
}
