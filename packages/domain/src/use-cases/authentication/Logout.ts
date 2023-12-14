/**
 * The reason for logging out
 */
export enum LogoutReason {
  CREDENTIALS_EXPIRED = 'credentials-expired',
  USER_INITIATED = 'user-initiated',
}

export interface IResettableCredentialsGateway {
  invalidate(reason: LogoutReason): Promise<void>;
}

export interface IResettableWalletGateway {
  reset(): Promise<void>;
}

export interface IResettableTransactionGateway {
  reset(): Promise<void>;
}

export interface IConversationsGateway {
  reset(): Promise<void>;
}

export interface ILogoutPresenter {
  logout(reason: LogoutReason): void;
}

export class Logout {
  constructor(
    private walletGateway: IResettableWalletGateway,
    private credentialsGateway: IResettableCredentialsGateway,
    private transactionGateway: IResettableTransactionGateway,
    private conversationsGateway: IConversationsGateway,
    private presenter: ILogoutPresenter,
  ) {}

  async execute(reason: LogoutReason): Promise<void> {
    await this.walletGateway.reset();
    await this.conversationsGateway.reset();
    await this.transactionGateway.reset();
    await this.credentialsGateway.invalidate(reason);

    this.presenter.logout(reason);
  }
}
