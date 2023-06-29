import { LogoutReason } from '@lens-protocol/domain/use-cases/wallets';

import { Operation, useOperation } from '../helpers/operations';
import { useWalletLogoutController } from './adapters/useWalletLogoutController';

export type WalletLogoutOperation = Operation<void>;

/**
 * `useWalletLogout` is an hook logs out the user and clears all local data.
 *
 * @category Wallet
 * @group Hooks
 *
 * @example
 * ```tsx
 * function LogoutButton() {
 *   const { execute: logout, isPending } = useWalletLogout();
 *
 *   return (
 *     <button disabled={isPending} onClick={logout>Logout</button>
 *   );
 * }
 * ```
 */
export function useWalletLogout() {
  const logout = useWalletLogoutController();
  return useOperation(async () => logout(LogoutReason.USER_INITIATED));
}
