import { Result } from '@lens-protocol/shared-kernel';

import { ProfileId, Wallet } from '../../entities';
import { ConversationWithMessages, ConversationsDisabledError } from '../../entities/Conversation';
import { ActiveWallet } from '../wallets';

export type GetAllConversationsRequest = {
  profileId?: ProfileId;
};

export type GetAllConversationsResult = Result<
  ConversationWithMessages[],
  ConversationsDisabledError
>;

export interface IGetAllConversationsGateway {
  fetchConversationsWithLastMessage(
    wallet: Wallet,
    request: GetAllConversationsRequest,
  ): Promise<GetAllConversationsResult>;
}

interface IGetAllConversationsPresenter {
  present(conversations: GetAllConversationsResult): void;
}

export class GetAllConversations {
  constructor(
    private readonly activeWallet: ActiveWallet,
    private readonly gateway: IGetAllConversationsGateway,
    private readonly presenter: IGetAllConversationsPresenter,
  ) {}

  async execute(request: GetAllConversationsRequest): Promise<void> {
    const wallet = await this.activeWallet.requireActiveWallet();
    const conversationsResult = await this.gateway.fetchConversationsWithLastMessage(
      wallet,
      request,
    );
    this.presenter.present(conversationsResult);
  }
}
