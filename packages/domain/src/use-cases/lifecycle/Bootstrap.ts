import { PromiseResult } from '@lens-protocol/shared-kernel';

import { ICredentials, AnyTransactionRequestModel, Wallet } from '../../entities';
import { ActiveProfileLoader } from '../profile';
import { TransactionQueue } from '../transactions';
import {
  ActiveWallet,
  ICredentialsReader,
  ICredentialsWriter,
  LogoutReason,
  WalletLogout,
} from '../wallets';
import { ISessionPresenter } from './ISessionPresenter';

export class CredentialsExpiredError extends Error {
  name = 'CredentialsExpiredError' as const;
  message = 'Auth credentials are expired';
}

export interface ICredentialsGateway extends ICredentialsReader, ICredentialsWriter {}

export interface ICredentialsRenewer {
  renewCredentials(credentials: ICredentials): PromiseResult<ICredentials, CredentialsExpiredError>;
}

export class Bootstrap {
  constructor(
    private readonly activeWallet: ActiveWallet,
    private readonly credentialsGateway: ICredentialsGateway,
    private readonly credentialsRenewer: ICredentialsRenewer,
    private readonly activeProfileLoader: ActiveProfileLoader,
    private readonly transactionQueue: TransactionQueue<AnyTransactionRequestModel>,
    private readonly sessionPresenter: ISessionPresenter,
    private readonly walletLogout: WalletLogout,
  ) {}

  async execute() {
    const wallet = await this.activeWallet.getActiveWallet();

    if (!wallet) {
      this.sessionPresenter.anonymous();
      return;
    }

    const credentials = await this.credentialsGateway.getCredentials();
    if (!credentials) {
      await this.logout();
      return;
    }

    const result = await this.credentialsRenewer.renewCredentials(credentials);

    if (result.isFailure()) {
      await this.logout();
      return;
    }

    await this.credentialsGateway.save(result.value);

    await this.authenticated(wallet);
  }

  private async authenticated(wallet: Wallet) {
    const profile = await this.activeProfileLoader.loadActiveProfileByOwnerAddress(wallet.address);

    this.sessionPresenter.authenticated(wallet, profile);

    await this.transactionQueue.resume();
  }

  private async logout() {
    await this.walletLogout.logout(LogoutReason.CREDENTIALS_EXPIRED);
  }
}
