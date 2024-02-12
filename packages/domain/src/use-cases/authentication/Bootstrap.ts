import { PromiseResult } from '@lens-protocol/shared-kernel';

import { AnyTransactionRequestModel, Credentials } from '../../entities';
import { TransactionQueue } from '../transactions';
import { ICredentialsReader } from './ActiveWallet';
import { ICredentialsWriter } from './ICredentialsWriter';
import { Logout, LogoutReason } from './Logout';
import {
  SessionData,
  anonymousSessionData,
  profileSessionData,
  walletOnlySessionData,
} from './SessionData';

export class CredentialsExpiredError extends Error {
  name = 'CredentialsExpiredError' as const;
  message = 'Auth credentials are expired';
}

export interface ICredentialsGateway extends ICredentialsReader, ICredentialsWriter {}

export interface ICredentialsRenewer {
  renewCredentials(credentials: Credentials): PromiseResult<Credentials, CredentialsExpiredError>;
}

export interface IBootstrapPresenter {
  present(session: SessionData): void;
}

export class Bootstrap {
  constructor(
    private readonly credentialsGateway: ICredentialsGateway,
    private readonly credentialsRenewer: ICredentialsRenewer,
    private readonly transactionQueue: TransactionQueue<AnyTransactionRequestModel>,
    private readonly logout: Logout,
    private readonly presenter: IBootstrapPresenter,
  ) {}

  async execute() {
    const credentials = await this.credentialsGateway.getCredentials();

    if (!credentials) {
      this.presenter.present(anonymousSessionData());
      return;
    }

    const result = await this.credentialsRenewer.renewCredentials(credentials);

    if (result.isFailure()) {
      await this.logout.execute(LogoutReason.CREDENTIALS_EXPIRED);
      return;
    }

    await this.credentialsGateway.save(result.value);

    await this.transactionQueue.resume();

    this.presenter.present(
      credentials.profileId
        ? profileSessionData({
            address: credentials.address,
            profileId: credentials.profileId,
          })
        : walletOnlySessionData(credentials),
    );
  }
}
