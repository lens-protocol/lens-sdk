// Leveraging structural typing to avoid to create a DTO
// now that the Wallet entity is pretty simple.

export type WalletData = {
  address: string;
};

export interface IActiveWalletPresenter {
  presentActiveWallet(wallet: WalletData | null): void;
}
