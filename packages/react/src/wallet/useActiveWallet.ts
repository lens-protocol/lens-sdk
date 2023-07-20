import { useSessionVar } from '@lens-protocol/api-bindings';
import { WalletData } from '@lens-protocol/domain/use-cases/lifecycle';

import { ReadResult } from '../helpers/reads';

export type { WalletData };

/**
 * `useActiveWallet` returns the active wallet, if any. Use this to determine if the user is logged in or not.
 *
 * @category Wallet
 * @group Hooks
 *
 * @example
 * ```tsx
 * import { useActiveWallet } from '@lens-protocol/react-web';
 *
 * function WalletStatus() {
 *   const { data: wallet, loading } = useActiveWallet();
 *
 *   if (loading) return <p>Loading...</p>;
 *
 *   if (!wallet) return <p>Not logged in</p>;
 *
 *   return <p>Logged in as {wallet.address}</p>;
 * }
 * ```
 */
export function useActiveWallet(): ReadResult<WalletData | null, void> {
  const session = useSessionVar();

  if (session === null) {
    return {
      data: undefined,
      loading: true,
    };
  }

  if (session.isNotAuthenticated()) {
    return {
      data: null,
      loading: false,
    };
  }

  return {
    data: session.wallet,
    loading: false,
  };
}
