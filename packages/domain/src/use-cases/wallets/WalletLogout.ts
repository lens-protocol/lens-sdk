import { success } from '@lens-protocol/shared-kernel';

import { ActiveWallet } from './ActiveWallet';
import { IActiveWalletPresenter } from './IActiveWalletPresenter';
import { ILogoutPresenter, LogoutReason } from './ILogoutPresenter';
import { IActiveProfilePresenter } from '../profile';

export interface IResettableCredentialsGateway {
  invalidate(): Promise<void>;
}

export interface IResettableWalletGateway {
  reset(): Promise<void>;
}

export interface IActiveProfileGateway {
  reset(): Promise<void>;
}

export class WalletLogout {
  constructor(
    private walletGateway: IResettableWalletGateway,
    private credentialsGateway: IResettableCredentialsGateway,
    private activeWallet: ActiveWallet,
    private activeProfileGateway: IActiveProfileGateway,
    private activeProfilePresenter: IActiveProfilePresenter,
    private activeWalletPresenter: IActiveWalletPresenter,
    private logoutPresenter: ILogoutPresenter,
  ) {}

  async logout(reason: LogoutReason): Promise<void> {
    const activeWallet = await this.activeWallet.requireActiveWallet();

    await this.walletGateway.reset();
    await this.activeProfileGateway.reset();

    this.activeWalletPresenter.presentActiveWallet(null);
    await this.activeProfilePresenter.presentActiveProfile(null);

    await this.credentialsGateway.invalidate();

    this.logoutPresenter.present(
      success({ lastLoggedInWallet: activeWallet, logoutReason: reason }),
    );
  }
}
