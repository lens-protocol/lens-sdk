import { EthereumAddress, failure, PromiseResult, success } from '@lens-protocol/shared-kernel';

import {
  ICredentials,
  PendingSigningRequestError,
  UserRejectedError,
  Wallet,
  WalletConnectionError,
} from '../../entities';
import type { ISessionPresenter, ProfileIdentifier } from '../lifecycle/ISessionPresenter';
import { ActiveProfileLoader } from '../profile';
import { IGenericResultPresenter } from '../transactions';

export interface IWalletFactory {
  create(request: WalletLoginRequest): Promise<Wallet>;
}

export interface IWritableWalletGateway {
  save(wallet: Wallet): Promise<void>;
}

export type LoginError = PendingSigningRequestError | UserRejectedError | WalletConnectionError;

export type IWalletLoginPresenter = IGenericResultPresenter<ProfileIdentifier | null, LoginError>;

export interface ICredentialsIssuer {
  issueCredentials(wallet: Wallet): PromiseResult<ICredentials, LoginError>;
}

export interface ICredentialsWriter {
  save(credentials: ICredentials): Promise<void>;
}

export type WalletLoginRequest = {
  address: EthereumAddress;
  handle?: string;
};

export class WalletLogin {
  constructor(
    private readonly walletFactory: IWalletFactory,
    private readonly walletGateway: IWritableWalletGateway,
    private readonly credentialsIssuer: ICredentialsIssuer,
    private readonly credentialsWriter: ICredentialsWriter,
    private readonly loginPresenter: IWalletLoginPresenter,
    private readonly activeProfileLoader: ActiveProfileLoader,
    private readonly sessionPresenter: ISessionPresenter,
  ) {}

  async login(request: WalletLoginRequest): Promise<void> {
    const wallet = await this.walletFactory.create(request);
    const result = await this.credentialsIssuer.issueCredentials(wallet);

    if (result.isFailure()) {
      this.loginPresenter.present(failure(result.error));
      return;
    }

    await this.walletGateway.save(wallet);
    await this.credentialsWriter.save(result.value);

    const profile = await this.activeProfileLoader.loadActiveProfileByOwnerAddress(
      wallet.address,
      request.handle,
    );

    this.sessionPresenter.authenticated(wallet, profile);
    this.loginPresenter.present(success(profile));
  }
}
