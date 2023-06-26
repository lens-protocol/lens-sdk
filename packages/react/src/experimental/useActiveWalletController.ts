import { ActiveWallet } from '@lens-protocol/domain/use-cases/wallets';

import { useSharedDependencies } from '../shared';

/**
 * Returns the internal active wallet interactor.
 *
 * @internal
 */
export function useActiveWalletController(): ActiveWallet {
  const { activeWallet } = useSharedDependencies();

  return activeWallet;
}
