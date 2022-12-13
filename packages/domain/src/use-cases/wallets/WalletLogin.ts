import { ChainType, PromiseResult } from '@lens-protocol/shared-kernel';

import {
  Wallet,
  WalletType,
  WalletConnectionError,
  UserRejectedError,
  PendingSigningRequestError,
  ICredentials,
} from '../../entities';
import { ActiveProfile } from '../profile/ActiveProfile';
import { IActiveWalletPresenter } from './IActiveWalletPresenter';

export interface IExternalWalletGateway {
  connect(
    walletType: WalletType,
    chainType: ChainType,
  ): PromiseResult<Wallet, WalletConnectionError>;
}

export interface IConnectionErrorPresenter {
  presentConnectionError(
    error: PendingSigningRequestError | UserRejectedError | WalletConnectionError,
  ): void;
}

export interface ICredentialsIssuer {
  issueCredentials(
    wallet: Wallet,
  ): PromiseResult<
    ICredentials,
    PendingSigningRequestError | UserRejectedError | WalletConnectionError
  >;
}

export interface ICredentialsWriter {
  save(
    credentials: ICredentials,
  ): Promise<void>
}

export class WalletLogin {
  constructor(
    private readonly walletGateway: IExternalWalletGateway,
    private readonly credentialsIssuer: ICredentialsIssuer,
    private readonly credentialsWriter: ICredentialsWriter,
    private readonly activeWalletPresenter: IActiveWalletPresenter,
    private readonly connectionErrorPresenter: IConnectionErrorPresenter,
    private readonly activeProfile: ActiveProfile,
  ) {}

  async login(type: WalletType): Promise<void> {
    const walletResult = await this.walletGateway.connect(type, ChainType.POLYGON);

    if (walletResult.isFailure()) {
      this.connectionErrorPresenter.presentConnectionError(walletResult.error);
      return;
    }

    const wallet = walletResult.value;
    const result = await this.credentialsIssuer.issueCredentials(wallet);

    if (result.isFailure()) {
      this.connectionErrorPresenter.presentConnectionError(result.error);
      return;
    }
    const credentials = result.unwrap()
    await this.credentialsWriter.save(credentials)

    this.activeWalletPresenter.presentActiveWallet(wallet);
    await this.activeProfile.loadActiveProfileByOwnerAddress(wallet.address);
  }
}
