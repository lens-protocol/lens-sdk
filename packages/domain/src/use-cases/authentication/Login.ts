import { EvmAddress, PromiseResult, Result, success } from '@lens-protocol/shared-kernel';

import {
  ICredentials,
  PendingSigningRequestError,
  ProfileId,
  UserRejectedError,
  Wallet,
  WalletConnectionError,
} from '../../entities';
import { ICredentialsWriter } from './ICredentialsWriter';
import { SessionData, profileSessionData, walletOnlySessionData } from './SessionData';

/**
 * The details required to authenticate the session.
 */
export type LoginRequest = {
  /**
   * The user's wallet. Could be an EOA or EIP-1271 compliant Smart Wallet (e.g. ERC-6551).
   *
   * If a Profile ID is also provide the address MUST be the Profile Owner or a Profile Manager for it.
   */
  address: EvmAddress;
  /**
   * The Profile ID to login with.
   *
   * If not provided the authenticated session will be of {@link SessionType.JustWallet} type.
   * This has a limited set of features available. Namely, it can be used to claim a Profile handle (if eligible)
   * and execute Open Actions on publications (e.g Collect Open Action).
   */
  profileId?: ProfileId;
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
  issueCredentials(signer: Wallet, using?: ProfileId): PromiseResult<ICredentials, LoginError>;
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
    const result = await this.credentialsIssuer.issueCredentials(wallet, request.profileId);

    if (result.isFailure()) {
      this.presenter.present(result);
      return;
    }

    await this.walletGateway.save(wallet);
    await this.credentialsWriter.save(result.value);

    if (request.profileId) {
      this.presenter.present(
        success(profileSessionData({ address: wallet.address, profileId: request.profileId })),
      );
      return;
    }

    this.presenter.present(success(walletOnlySessionData({ address: wallet.address })));
  }
}
