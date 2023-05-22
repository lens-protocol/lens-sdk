import { Result } from '@lens-protocol/shared-kernel';

import { ProfileId, Wallet } from '../../entities';
import {
  ConversationId,
  ConversationWithMessages,
  ConversationsDisabledError,
} from '../../entities/Conversation';
import { ActiveWallet } from '../wallets';

export type GetConversationRequest = {
  conversationId: ConversationId;
  profileId?: ProfileId;
};

export type GetConversationResult = Result<
  ConversationWithMessages | null,
  ConversationsDisabledError
>;

export interface IGetConversationGateway {
  fetchConversationWithMessages(
    wallet: Wallet,
    request: GetConversationRequest,
  ): Promise<GetConversationResult>;
}

export interface IGetConversationPresenter {
  present(conversation: GetConversationResult): void;
}

export class GetConversation {
  constructor(
    private readonly activeWallet: ActiveWallet,
    private readonly gateway: IGetConversationGateway,
    private readonly presenter: IGetConversationPresenter,
  ) {}

  async execute(request: GetConversationRequest): Promise<void> {
    const wallet = await this.activeWallet.requireActiveWallet();
    const result = await this.gateway.fetchConversationWithMessages(wallet, request);
    this.presenter.present(result);
  }
}
