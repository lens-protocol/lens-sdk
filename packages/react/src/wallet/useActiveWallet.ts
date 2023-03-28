import { WalletData } from '@lens-protocol/domain/use-cases/wallets';

import { ReadResult } from '../helpers/reads';
import { ApplicationsState, useAppState } from '../lifecycle/adapters/ApplicationPresenter';
import { useActiveWalletVar } from './adapters/ActiveWalletPresenter';

export type { WalletData };

/**
 * @category Wallet
 * @group Hooks
 */
export function useActiveWallet(): ReadResult<WalletData | null, void> {
  const state = useAppState();

  const wallet = useActiveWalletVar();

  if (state === ApplicationsState.LOADING) {
    return {
      data: undefined,
      loading: true,
    };
  }

  if (!wallet) {
    return {
      data: null,
      loading: false,
    };
  }

  return {
    data: wallet,
    loading: false,
  };
}
