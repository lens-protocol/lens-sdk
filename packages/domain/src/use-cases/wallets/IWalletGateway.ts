import { Wallet } from '../../entities';

export interface IWalletGateway {
  getByAddress(address: string): Promise<Wallet>;
}
