import { Result } from '@lens-protocol/shared-kernel';

import { ProfileId, Wallet } from '../../entities';
import {
  ConversationId,
  ConversationNotFoundError,
  ConversationsDisabledError,
  Markdown,
  Message,
} from '../../entities/Conversation';
import { ActiveWallet } from '../wallets';

export type SendMessageRequest = {
  conversationId: ConversationId;
  content: Markdown;
  profileId?: ProfileId;
};

export type SendMessageResult = Result<
  Message,
  ConversationsDisabledError | ConversationNotFoundError
>;

export interface ISendMessageGateway {
  sendMessage(wallet: Wallet, request: SendMessageRequest): Promise<SendMessageResult>;
}

interface ISendMessagePresenter {
  present(message: SendMessageResult): void;
}

export class SendMessage {
  constructor(
    private readonly activeWallet: ActiveWallet,
    private readonly gateway: ISendMessageGateway,
    private readonly presenter: ISendMessagePresenter,
  ) {}

  async execute(request: SendMessageRequest): Promise<void> {
    const wallet = await this.activeWallet.requireActiveWallet();
    const message = await this.gateway.sendMessage(wallet, request);
    this.presenter.present(message);
  }
}
