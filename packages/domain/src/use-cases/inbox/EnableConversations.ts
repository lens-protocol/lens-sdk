import { EthereumAddress, Result, invariant } from '@lens-protocol/shared-kernel';

import {
  PendingSigningRequestError,
  ProfileId,
  UserRejectedError,
  Wallet,
  WalletConnectionError,
} from '../../entities';
import { ActiveWallet } from '../wallets';

export type EnableConversationsRequest = {
  profileId?: ProfileId;
  address: EthereumAddress;
};

export type EnableConversationsResult = Result<
  void,
  PendingSigningRequestError | UserRejectedError | WalletConnectionError
>;

export interface IEnableConversationsGateway {
  enableConversations(wallet: Wallet): Promise<EnableConversationsResult>;
}

export interface IEnableConversationsPresenter {
  presentEnableResult(result: EnableConversationsResult): void;
}

export class EnableConversations {
  constructor(
    private readonly activeWallet: ActiveWallet,
    private readonly gateway: IEnableConversationsGateway,
    private readonly presenter: IEnableConversationsPresenter,
  ) {}

  async execute(request: EnableConversationsRequest): Promise<void> {
    const wallet = await this.activeWallet.requireActiveWallet();

    invariant(
      wallet.address === request.address,
      'Active wallet address does not match request address',
    );

    const enableResult = await this.gateway.enableConversations(wallet);
    this.presenter.presentEnableResult(enableResult);
  }
}
