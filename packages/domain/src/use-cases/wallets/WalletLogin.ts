import { EthereumAddress, failure, PromiseResult, success } from '@lens-protocol/shared-kernel';

import {
  ICredentials,
  PendingSigningRequestError,
  UserRejectedError,
  Wallet,
  WalletConnectionError,
} from '../../entities';
import { IActiveProfilePresenter, ActiveProfileLoader, ProfileIdentifier } from '../profile';
import { IGenericResultPresenter } from '../transactions';
import { IActiveWalletPresenter } from './IActiveWalletPresenter';

export interface IWalletFactory {
  create(request: WalletLoginRequest): Promise<Wallet>;
}

export interface IWritableWalletGateway {
  save(wallet: Wallet): Promise<void>;
}

export type WalletLoginResult = ProfileIdentifier | null;

export type IWalletLoginPresenter = IGenericResultPresenter<
  WalletLoginResult,
  PendingSigningRequestError | UserRejectedError | WalletConnectionError
>;

export interface ICredentialsIssuer {
  issueCredentials(
    wallet: Wallet,
  ): PromiseResult<
    ICredentials,
    PendingSigningRequestError | UserRejectedError | WalletConnectionError
  >;
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
    private readonly activeWalletPresenter: IActiveWalletPresenter,
    private readonly walletLoginPresenter: IWalletLoginPresenter,
    private readonly activeProfileLoader: ActiveProfileLoader,
    private readonly activeProfilePresenter: IActiveProfilePresenter,
  ) {}

  async login(request: WalletLoginRequest): Promise<void> {
    const wallet = await this.walletFactory.create(request);
    const result = await this.credentialsIssuer.issueCredentials(wallet);

    if (result.isFailure()) {
      this.walletLoginPresenter.present(failure(result.error));
      return;
    }

    await this.walletGateway.save(wallet);
    await this.credentialsWriter.save(result.value);

    const profile = await this.activeProfileLoader.loadActiveProfileByOwnerAddress(
      wallet.address,
      request.handle,
    );

    this.activeWalletPresenter.presentActiveWallet(wallet);
    this.activeProfilePresenter.presentActiveProfile(profile);

    this.walletLoginPresenter.present(success(profile));
  }
}
