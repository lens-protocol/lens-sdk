import { makeVar, useReactiveVar } from '@apollo/client';
import { IActiveWalletPresenter, WalletData } from '@lens-protocol/domain/use-cases/wallets';

export const activeWalletVar = makeVar<WalletData | null>(null);

export class ActiveWalletPresenter implements IActiveWalletPresenter {
  presentActiveWallet(wallet: WalletData | null): void {
    activeWalletVar(wallet);
  }
}

export const useActiveWallet = () => {
  return useReactiveVar(activeWalletVar);
};
