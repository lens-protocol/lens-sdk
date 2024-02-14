import { never } from '@lens-protocol/shared-kernel';

import { Credentials, Wallet } from '../../entities';
import { IWalletGateway } from '../wallets/IWalletGateway';

export interface ICredentialsReader {
  getCredentials(): Promise<Credentials | null>;
}

export class ActiveWallet {
  constructor(
    private credentialsReader: ICredentialsReader,
    private walletGateway: IWalletGateway,
  ) {}

  async requireActiveWallet(): Promise<Wallet> {
    const credentials = await this.credentialsReader.getCredentials();

    if (!credentials) {
      never('User is not authenticated');
    }

    return this.walletGateway.getByAddress(credentials.address);
  }
}
