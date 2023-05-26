import { EthereumAddress } from '@lens-protocol/shared-kernel';

import { ProfileId } from '../../entities';
import {
  Conversation,
  ConversationId,
  Markdown,
  Message,
  Participant,
} from '../../entities/Conversation';

export type GetAllConversationsRequest = {
  profileId?: ProfileId;
  address: EthereumAddress;
};

export interface IGetConversationsGateway {
  fetchConversations(request: GetAllConversationsRequest): Promise<Conversation[]>;
  fetchLastMessageForEach(conversations: Conversation[]): Promise<Message[]>;
}

export interface IGetConversationsPresenter {
  presentConversations(conversations: ConversationData[]): void;
}

export type LastMessageData = {
  id: string;
  content: Markdown;
  sentAt: Date;
};

export type ConversationData = {
  id: ConversationId;
  lastMessage: LastMessageData;
  peer: Participant;
};

export class GetAllConversations {
  constructor(
    private readonly gateway: IGetConversationsGateway,
    private readonly presenter: IGetConversationsPresenter,
  ) {}

  async execute(request: GetAllConversationsRequest): Promise<void> {
    const conversations = await this.gateway.fetchConversations(request);
    const messages = await this.gateway.fetchLastMessageForEach(conversations); // TODO pass also request
    const data = this.assembleConversationData(conversations, messages);
    this.presenter.presentConversations(data);
  }

  private assembleConversationData(
    conversations: Conversation[],
    messages: Message[],
  ): ConversationData[] {
    return conversations.map((conversation) => {
      const lastMessage = messages.find((message) => message.conversationId === conversation.id);

      if (!lastMessage) {
        throw new Error(`No last message found for conversationId:${conversation.id}`);
      }

      return {
        id: conversation.id,
        lastMessage: {
          id: lastMessage.id,
          content: lastMessage.content,
          sentAt: lastMessage.sentAt,
        },
        peer: conversation.peer,
      };
    });
  }
}
