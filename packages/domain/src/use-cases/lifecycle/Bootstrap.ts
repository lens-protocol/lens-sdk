import { PromiseResult } from '@lens-protocol/shared-kernel';

import { ICredentials, TransactionRequestModel, Wallet } from '../../entities';
import { ActiveProfile } from '../profile/ActiveProfile';
import { TransactionQueue } from '../transactions/TransactionQueue';
import { ActiveWallet } from '../wallets/ActiveWallet';
import { IActiveWalletPresenter } from '../wallets/IActiveWalletPresenter';
import { ILoginPresenter } from '../wallets/ILoginPresenter';

export class CredentialsExpiredError extends Error {
  name = 'CredentialsExpiredError' as const;
  message = 'Auth credentials are expired';
}

export interface IApplicationPresenter {
  signalReady(): void;
}

export interface ICredentialsGateway {
  getCredentials(wallet: Wallet): Promise<ICredentials | null>;
  save(credentials: ICredentials): Promise<void>;
}

export interface ICredentialsRenewer {
  renewCredentials(credentials: ICredentials): PromiseResult<ICredentials, CredentialsExpiredError>
}

export class Bootstrap<T extends TransactionRequestModel> {
  constructor(
    private readonly activeWallet: ActiveWallet,
    private readonly credentialsGateway: ICredentialsGateway,
    private readonly credentialsRenewer: ICredentialsRenewer,
    private readonly activeWalletPresenter: IActiveWalletPresenter,
    private readonly applicationPresenter: IApplicationPresenter,
    private readonly loginPresenter: ILoginPresenter,
    private readonly activeProfile: ActiveProfile,
    private readonly transactionQueue: TransactionQueue<T>,
  ) {}

  async start() {
    const wallet = await this.activeWallet.getActiveWallet();

    if (!wallet) {
      this.applicationPresenter.signalReady();
      return;
    }

    const credentials = await this.credentialsGateway.getCredentials(wallet);
    if(!credentials) {
      await this.startWithExpCredentials(wallet);
      return;
    }

    const result = await this.credentialsRenewer.renewCredentials(credentials);

    if (result.isFailure()) {
      await this.startWithExpCredentials(wallet);

      return;
    }

    const newCredentials = result.unwrap()
    await this.credentialsGateway.save(newCredentials)

    await this.startWithCredentials(wallet);
  }

  private async startWithCredentials(wallet: Wallet) {
    this.activeWalletPresenter.presentActiveWallet(wallet);

    await this.activeProfile.loadActiveProfileByOwnerAddress(wallet.address);

    await this.transactionQueue.init();
    this.applicationPresenter.signalReady();
  }

  private async startWithExpCredentials(wallet: Wallet) {
    this.loginPresenter.presentLoginOptions(wallet);

    this.applicationPresenter.signalReady();
  }
}
