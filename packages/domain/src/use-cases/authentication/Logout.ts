import { never } from '@lens-protocol/shared-kernel';

import { ICredentials } from '../../entities';

/**
 * The reason for logging out
 */
export enum LogoutReason {
  CREDENTIALS_EXPIRED = 'credentials-expired',
  USER_INITIATED = 'user-initiated',
}

export type RevokeSessionRequest = {
  authorizationId: string;
};

export interface IRevokeSessionGateway {
  revoke(request: RevokeSessionRequest): Promise<void>;
}

export interface IResettableCredentialsGateway {
  getCredentials(): Promise<ICredentials | null>;
  invalidate(): Promise<void>;
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
    private sessionGateway: IRevokeSessionGateway,
    private walletGateway: IResettableWalletGateway,
    private credentialsGateway: IResettableCredentialsGateway,
    private transactionGateway: IResettableTransactionGateway,
    private conversationsGateway: IConversationsGateway,
    private presenter: ILogoutPresenter,
  ) {}

  async execute(reason: LogoutReason): Promise<void> {
    const credentials = await this.credentialsGateway.getCredentials();

    if (!credentials) {
      never('User is not authenticated');
    }

    await this.sessionGateway.revoke({ authorizationId: credentials.authorizationId });
    await this.walletGateway.reset();
    await this.conversationsGateway.reset();
    await this.transactionGateway.reset();
    await this.credentialsGateway.invalidate();

    this.presenter.logout(reason);
  }
}
