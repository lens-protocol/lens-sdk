import { assertNever } from '@lens-protocol/shared-kernel';

import { IActiveProfilePresenter } from '../profile';
import { ActiveWallet } from './ActiveWallet';
import { IActiveWalletPresenter } from './IActiveWalletPresenter';
import { ILoginPresenter } from './ILoginPresenter';

export interface IResettableCredentialsGateway {
  invalidate(): Promise<void>;
}

export interface IResettableWalletGateway {
  reset(): Promise<void>;
}

export enum LogoutReason {
  TOKEN_EXPIRED = 'token_expired',
  USER_INITIATED = 'user_initiated',
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
    private loginPresenter: ILoginPresenter,
  ) {}

  async logout(reason: LogoutReason): Promise<void> {
    const activeWallet = await this.activeWallet.requireActiveWallet();

    await this.walletGateway.reset();
    await this.activeProfileGateway.reset();

    this.activeWalletPresenter.presentActiveWallet(null);
    await this.activeProfilePresenter.presentActiveProfile(null);

    await this.credentialsGateway.invalidate();

    switch (reason) {
      case LogoutReason.TOKEN_EXPIRED:
        // TODO pass a DTO to the presenter, not the entity
        this.loginPresenter.presentLoginOptions(activeWallet);
        break;
      case LogoutReason.USER_INITIATED:
        // Stay on the same page and remove all parts that require connected wallet
        // which is done by just removing active wallet from presenter
        break;
      default:
        assertNever(reason, `Logout reason not handled. Reason "${String(reason)}".`);
    }
  }
}
