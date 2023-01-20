import { WalletData } from '@lens-protocol/domain/use-cases/wallets';

import { ReadResult } from '../helpers';
import { ApplicationsState, useAppState } from '../lifecycle/adapters/ApplicationPresenter';
import { useActiveWalletVar } from './adapters/ActiveWalletPresenter';

export type { WalletData };

export function useActiveWallet(): ReadResult<WalletData | null> {
  const state = useAppState();

  const wallet = useActiveWalletVar();

  if (state === ApplicationsState.LOADING) {
    return {
      loading: true,
      data: undefined,
    };
  }

  if (!wallet) {
    return {
      loading: false,
      data: null,
    };
  }

  return {
    loading: false,
    data: wallet,
  };
}
