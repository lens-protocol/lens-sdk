import type { ISessionPresenter } from '../lifecycle/ISessionPresenter';
import { ActiveWallet } from './ActiveWallet';

/**
 * The reason for logging out
 */
export enum LogoutReason {
  CREDENTIALS_EXPIRED = 'credentials-expired',
  USER_INITIATED = 'user-initiated',
}

export interface IResettableCredentialsGateway {
  invalidate(): Promise<void>;
}

export interface IResettableWalletGateway {
  reset(): Promise<void>;
}

export interface IActiveProfileGateway {
  reset(): Promise<void>;
}

export interface IConversationsGateway {
  reset(): Promise<void>;
}

export class WalletLogout {
  constructor(
    private walletGateway: IResettableWalletGateway,
    private credentialsGateway: IResettableCredentialsGateway,
    private activeWallet: ActiveWallet,
    private activeProfileGateway: IActiveProfileGateway,
    private conversationsGateway: IConversationsGateway,
    private sessionPresenter: ISessionPresenter,
  ) {}

  async logout(reason: LogoutReason): Promise<void> {
    const activeWallet = await this.activeWallet.requireActiveWallet();

    await this.walletGateway.reset();
    await this.activeProfileGateway.reset();
    await this.conversationsGateway.reset();

    await this.credentialsGateway.invalidate();

    this.sessionPresenter.logout({ lastLoggedInWallet: activeWallet, logoutReason: reason });
  }
}
