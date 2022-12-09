import { Wallet } from '../../entities';

export interface ILoginPresenter {
  presentLoginOptions(previousWallet: Wallet | null): void;
}
