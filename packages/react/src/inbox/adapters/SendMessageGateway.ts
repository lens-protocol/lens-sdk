import { Wallet } from '@lens-protocol/domain/entities';
import {
  SendMessageRequest,
  SendMessageResult,
  ISendMessageGateway,
} from '@lens-protocol/domain/use-cases/inbox';

import { IConversationProvider } from './IConversationProvider';

export class SendMessageGateway implements ISendMessageGateway {
  constructor(private readonly provider: IConversationProvider) {}

  async sendMessage(wallet: Wallet, request: SendMessageRequest): Promise<SendMessageResult> {
    return this.provider.sendMessage({
      participant: {
        profileId: request.profileId,
        address: wallet.address,
      },
      conversationId: request.conversationId,
      content: request.content,
    });
  }
}
