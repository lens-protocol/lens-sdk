import { PromiseResult } from '@lens-protocol/shared-kernel';

import { ICredentials, TransactionRequestModel, Wallet } from '../../entities';
import { ActiveWallet } from '../wallets/ActiveWallet';
import { ActiveProfile } from '../profile/ActiveProfile';
import { IActiveWalletPresenter } from '../wallets/IActiveWalletPresenter';
import { ILoginPresenter } from '../wallets/ILoginPresenter';
import { TransactionQueue } from '../transactions/TransactionQueue';

export class CredentialsExpiredError extends Error {
  name = 'CredentialsExpiredError' as const;
  message = 'Auth credentials are expired';
}

export interface IAuthorizationGateway {
  authorize(wallet: Wallet): PromiseResult<ICredentials, CredentialsExpiredError>;
}

export interface IApplicationPresenter {
  signalReady(): void;
}

export class Bootstrap<T extends TransactionRequestModel> {
  constructor(
    private readonly activeWallet: ActiveWallet,
    private readonly authGateway: IAuthorizationGateway,
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

    const result = await this.authGateway.authorize(wallet);

    if (result.isFailure()) {
      await this.startWithExpCredentials(wallet);

      return;
    }

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
