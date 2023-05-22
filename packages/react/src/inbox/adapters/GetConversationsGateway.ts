import { Conversation, ConversationId, Message } from '@lens-protocol/domain/entities';
import {
  GetAllConversationsRequest,
  IGetConversationsGateway,
} from '@lens-protocol/domain/use-cases/inbox';
import { invariant } from '@lens-protocol/shared-kernel';

import { notEmpty } from '../helpers';
import { IConversationProvider } from './IConversationProvider';

type MessagesTuple = [ConversationId, Message[]];

export class GetConversationsGateway implements IGetConversationsGateway {
  constructor(private readonly provider: IConversationProvider) {}

  async fetchConversations(request: GetAllConversationsRequest): Promise<Conversation[]> {
    return this.provider.fetchConversations({
      participant: {
        profileId: request.profileId,
        address: request.address,
      },
    });
  }

  async fetchLastMessageForEach(conversations: Conversation[]): Promise<Message[]> {
    const conversationIds = conversations.map((conversation) => conversation.id);

    const messagesTuples = await Promise.all(
      conversationIds.map((conversationId) => this._getMessages(conversationId)),
    );

    const messagesTuplesFiltered = messagesTuples.filter(notEmpty);

    return messagesTuplesFiltered.map(([_, messages]) => {
      const lastMessage = messages[0];

      invariant(lastMessage, 'There should be at least one message at this point');

      return lastMessage;
    });
  }

  private async _getMessages(conversationId: ConversationId): Promise<MessagesTuple | null> {
    const messages = await this.provider.fetchMessages({
      conversationId,
    });
    if (messages.length === 0) {
      return null;
    }
    return [conversationId, messages];
  }
}
