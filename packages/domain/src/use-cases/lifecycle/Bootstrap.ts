import { PromiseResult } from '@lens-protocol/shared-kernel';

import { ICredentials, AnyTransactionRequestModel, Wallet } from '../../entities';
import { ActiveProfileLoader } from '../profile';
import { TransactionQueue } from '../transactions';
import { ActiveWallet, ICredentialsReader, ICredentialsWriter, LogoutReason } from '../wallets';
import { ISessionPresenter } from './ISessionPresenter';

export class CredentialsExpiredError extends Error {
  name = 'CredentialsExpiredError' as const;
  message = 'Auth credentials are expired';
}

export interface ICredentialsGateway extends ICredentialsReader, ICredentialsWriter {}

export interface ICredentialsRenewer {
  renewCredentials(credentials: ICredentials): PromiseResult<ICredentials, CredentialsExpiredError>;
}

export class Bootstrap<T extends AnyTransactionRequestModel> {
  constructor(
    private readonly activeWallet: ActiveWallet,
    private readonly credentialsGateway: ICredentialsGateway,
    private readonly credentialsRenewer: ICredentialsRenewer,
    private readonly activeProfileLoader: ActiveProfileLoader,
    private readonly transactionQueue: TransactionQueue<T>,
    private readonly sessionPresenter: ISessionPresenter,
  ) {}

  async execute() {
    const wallet = await this.activeWallet.getActiveWallet();

    if (!wallet) {
      this.sessionPresenter.anonymous();
      return;
    }

    const credentials = await this.credentialsGateway.getCredentials();
    if (!credentials) {
      await this.startWithExpCredentials(wallet);
      return;
    }

    const result = await this.credentialsRenewer.renewCredentials(credentials);

    if (result.isFailure()) {
      await this.startWithExpCredentials(wallet);

      return;
    }

    const newCredentials = result.unwrap();
    await this.credentialsGateway.save(newCredentials);

    await this.startWithCredentials(wallet);
  }

  private async startWithCredentials(wallet: Wallet) {
    const profile = await this.activeProfileLoader.loadActiveProfileByOwnerAddress(wallet.address);

    this.sessionPresenter.authenticated(wallet, profile);

    await this.transactionQueue.init();
  }

  private async startWithExpCredentials(wallet: Wallet) {
    this.sessionPresenter.logout({
      lastLoggedInWallet: wallet,
      logoutReason: LogoutReason.CREDENTIALS_EXPIRED,
    });
  }
}
