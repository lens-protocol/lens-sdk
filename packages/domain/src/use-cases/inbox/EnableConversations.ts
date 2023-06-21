import { Result } from '@lens-protocol/shared-kernel';

import {
  Participant,
  PendingSigningRequestError,
  ProfileId,
  UserRejectedError,
  Wallet,
  WalletConnectionError,
} from '../../entities';
import { ActiveWallet } from '../wallets';

export type EnableConversationsRequest = {
  profileId?: ProfileId;
};

export type EnableConversationsResult = Result<
  Participant,
  PendingSigningRequestError | UserRejectedError | WalletConnectionError
>;

export interface IEnableConversationsGateway {
  enableConversations(
    wallet: Wallet,
    request: EnableConversationsRequest,
  ): Promise<EnableConversationsResult>;
}

interface IEnableConversationsPresenter {
  present(result: EnableConversationsResult): void;
}

export class EnableConversations {
  constructor(
    private readonly activeWallet: ActiveWallet,
    private readonly gateway: IEnableConversationsGateway,
    private readonly presenter: IEnableConversationsPresenter,
  ) {}

  async execute(request: EnableConversationsRequest): Promise<void> {
    const wallet = await this.activeWallet.requireActiveWallet();
    const result = await this.gateway.enableConversations(wallet, request);
    this.presenter.present(result);
  }
}
