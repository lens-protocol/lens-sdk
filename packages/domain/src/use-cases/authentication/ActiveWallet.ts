import { invariant, never } from '@lens-protocol/shared-kernel';

import { ICredentials, Wallet } from '../../entities';

export interface ICredentialsReader {
  getCredentials(): Promise<ICredentials | null>;
}

export interface IReadableWalletGateway {
  getByAddress(address: string): Promise<Wallet | null>;
}

export class ActiveWallet {
  constructor(
    private credentialsReader: ICredentialsReader,
    private walletGateway: IReadableWalletGateway,
  ) {}

  async requireActiveWallet(): Promise<Wallet> {
    const credentials = await this.credentialsReader.getCredentials();

    if (!credentials) {
      never('User is not authenticated');
    }

    const wallet = await this.walletGateway.getByAddress(credentials.address);

    invariant(wallet, 'Active wallet should exist when credentials are present');

    return wallet;
  }
}
