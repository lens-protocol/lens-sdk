import { WalletData } from '@lens-protocol/domain/use-cases/wallets';

import { useActiveWalletVar } from './adapters/ActiveWalletPresenter';
import { ReadResult } from '../helpers';
import { ApplicationsState, useAppState } from '../lifecycle/adapters/ApplicationPresenter';

export type { WalletData };

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
