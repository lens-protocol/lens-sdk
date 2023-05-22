import { Result } from '@lens-protocol/shared-kernel';

import { ProfileId, Wallet } from '../../entities';
import { Conversation, ConversationsDisabledError } from '../../entities/Conversation';
import { ActiveWallet } from '../wallets';

export type GetAllConversationsRequest = {
  profileId?: ProfileId;
};

export type GetAllConversationsResult = Result<Conversation[], ConversationsDisabledError>;

export interface IGetConversationsGateway {
  fetchConversations(
    wallet: Wallet,
    request: GetAllConversationsRequest,
  ): Promise<GetAllConversationsResult>;
}

export interface IGetConversationsPresenter {
  present(conversations: GetAllConversationsResult): void;
}

export class GetAllConversations {
  constructor(
    private readonly activeWallet: ActiveWallet,
    private readonly gateway: IGetConversationsGateway,
    private readonly presenter: IGetConversationsPresenter,
  ) {}

  async execute(request: GetAllConversationsRequest): Promise<void> {
    const wallet = await this.activeWallet.requireActiveWallet();
    const conversationsResult = await this.gateway.fetchConversations(wallet, request);
    this.presenter.present(conversationsResult);
  }
}
