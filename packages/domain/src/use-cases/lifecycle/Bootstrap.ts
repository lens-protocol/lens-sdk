import { PromiseResult, success } from '@lens-protocol/shared-kernel';

import { ICredentials, TransactionRequestModel, Wallet } from '../../entities';
import { ActiveProfileLoader, IProfileGateway } from '../profile';
import { TransactionQueue } from '../transactions';
import {
  ActiveWallet,
  ICredentialsReader,
  IActiveWalletPresenter,
  ILogoutPresenter,
  LogoutReason,
  ICredentialsWriter,
} from '../wallets';

export class CredentialsExpiredError extends Error {
  name = 'CredentialsExpiredError' as const;
  message = 'Auth credentials are expired';
}

export interface IApplicationPresenter {
  signalReady(): void;
}

export interface ICredentialsGateway extends ICredentialsReader, ICredentialsWriter {}

export interface ICredentialsRenewer {
  renewCredentials(credentials: ICredentials): PromiseResult<ICredentials, CredentialsExpiredError>;
}

export class Bootstrap<T extends TransactionRequestModel> {
  constructor(
    private readonly activeWallet: ActiveWallet,
    private readonly credentialsGateway: ICredentialsGateway,
    private readonly credentialsRenewer: ICredentialsRenewer,
    private readonly activeWalletPresenter: IActiveWalletPresenter,
    private readonly applicationPresenter: IApplicationPresenter,
    private readonly logoutPresenter: ILogoutPresenter,
    private readonly activeProfileLoader: ActiveProfileLoader,
    private readonly transactionQueue: TransactionQueue<T>,
    private readonly profileGateway: IProfileGateway,
  ) {}

  async start() {
    const wallet = await this.activeWallet.getActiveWallet();

    if (!wallet) {
      this.applicationPresenter.signalReady();
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
    this.activeWalletPresenter.presentActiveWallet(wallet);

    const profiles = await this.profileGateway.getAllProfilesByOwnerAddress(wallet.address);

    await this.activeProfileLoader.loadActiveProfileByHandle(profiles[0].handle);

    await this.transactionQueue.init();
    this.applicationPresenter.signalReady();
  }

  private async startWithExpCredentials(wallet: Wallet) {
    this.logoutPresenter.present(
      success({
        lastLoggedInWallet: wallet,
        logoutReason: LogoutReason.CREDENTIALS_EXPIRED,
      }),
    );

    this.applicationPresenter.signalReady();
  }
}
