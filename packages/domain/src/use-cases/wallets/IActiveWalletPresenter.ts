// Leveraging structural typing to avoid to create a DTO
// now that the Wallet entity is pretty simple.

import { WalletType } from '../../entities';

export type WalletData = {
  address: string;
  type: WalletType;
};

export interface IActiveWalletPresenter {
  presentActiveWallet(wallet: WalletData | null): void;
}
