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

export interface IAuthenticationGateway {
  authenticate(
    wallet: Wallet,
  ): PromiseResult<
    ICredentials,
    PendingSigningRequestError | UserRejectedError | WalletConnectionError
  >;
}

export class WalletLogin {
  constructor(
    private readonly walletGateway: IExternalWalletGateway,
    private readonly authGateway: IAuthenticationGateway,
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
    const authResult = await this.authGateway.authenticate(wallet);

    if (authResult.isFailure()) {
      this.connectionErrorPresenter.presentConnectionError(authResult.error);
      return;
    }

    this.activeWalletPresenter.presentActiveWallet(wallet);
    await this.activeProfile.loadActiveProfileByOwnerAddress(wallet.address);
  }
}
