import { invariant } from '@lens-protocol/shared-kernel';

import { ICredentials, Wallet } from '../../entities';

export interface ICredentialsGateway {
  getCredentials(): Promise<ICredentials | null>;
}

export interface IWalletGateway {
  getByAddress(address: string): Promise<Wallet | null>;
}

export class ActiveWallet {
  constructor(
    private credentialsGateway: ICredentialsGateway,
    private walletGateway: IWalletGateway,
  ) {}

  async getActiveWallet(): Promise<Wallet | null> {
    const credentials = await this.credentialsGateway.getCredentials();

    if (!credentials) {
      return null;
    }

    const wallet = await this.walletGateway.getByAddress(credentials.address);

    invariant(wallet, 'Active wallet should exist when credentials are present');

    return wallet;
  }

  async requireActiveWallet(): Promise<Wallet> {
    const wallet = await this.getActiveWallet();

    invariant(wallet, 'Active wallet should be defined');

    return wallet;
  }
}
