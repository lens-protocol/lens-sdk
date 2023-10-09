import { EvmAddress, PromiseResult, Result, success } from '@lens-protocol/shared-kernel';

import {
  ICredentials,
  PendingSigningRequestError,
  ProfileId,
  UserRejectedError,
  Wallet,
  WalletConnectionError,
} from '../../entities';
import { profileSessionData, SessionData } from './SessionData';

/**
 * The details required to authenticate the session.
 */
export type LoginRequest = {
  /**
   * The Profile Owner or an authorized Profile Manager.
   */
  address: EvmAddress;
  /**
   * The authenticated Profile ID.
   */
  profileId: ProfileId;
};

export interface IWalletFactory {
  create(address: EvmAddress): Promise<Wallet>;
}

export interface IWritableWalletGateway {
  save(wallet: Wallet): Promise<void>;
}

export type LoginError = PendingSigningRequestError | UserRejectedError | WalletConnectionError;

export interface ILoginPresenter {
  present(result: Result<SessionData, LoginError>): void;
}

export interface ICredentialsIssuer {
  issueCredentials(
    forProfile: ProfileId,
    signedBy: Wallet,
  ): PromiseResult<ICredentials, LoginError>;
}

export interface ICredentialsWriter {
  save(credentials: ICredentials): Promise<void>;
}

export class Login {
  constructor(
    private readonly walletFactory: IWalletFactory,
    private readonly walletGateway: IWritableWalletGateway,
    private readonly credentialsIssuer: ICredentialsIssuer,
    private readonly credentialsWriter: ICredentialsWriter,
    private readonly presenter: ILoginPresenter,
  ) {}

  async execute(request: LoginRequest): Promise<void> {
    const wallet = await this.walletFactory.create(request.address);
    const result = await this.credentialsIssuer.issueCredentials(request.profileId, wallet);

    if (result.isFailure()) {
      this.presenter.present(result);
      return;
    }

    await this.walletGateway.save(wallet);
    await this.credentialsWriter.save(result.value);

    this.presenter.present(success(profileSessionData(request)));
  }
}
