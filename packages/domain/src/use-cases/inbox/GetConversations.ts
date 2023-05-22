import {
  Conversation,
  ConversationId,
  Markdown,
  Message,
  Participant,
} from '../../entities/Conversation';
import { Wallet } from '../../entities/Wallet';
import { ActiveWallet } from '../wallets/ActiveWallet';

export type FetchConversationsRequest = {
  for: Wallet;
};

export interface IGetConversationsGateway {
  fetchConversations(request: FetchConversationsRequest): Promise<Conversation[]>;
}

export interface IGetConversationsMessageGateway {
  fetchLastMessagesForEach(conversations: Conversation[]): Promise<Message[]>;
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
    private readonly activeWallet: ActiveWallet,
    private readonly conversationGateway: IGetConversationsGateway,
    private readonly messageGateway: IGetConversationsMessageGateway,
    private readonly presenter: IGetConversationsPresenter,
  ) {}

  async execute(): Promise<void> {
    const wallet = await this.activeWallet.requireActiveWallet();

    const conversations = await this.conversationGateway.fetchConversations({
      for: wallet,
    });
    const messages = await this.messageGateway.fetchLastMessagesForEach(conversations);

    const data = this._assembleConversationData(conversations, messages);

    this.presenter.presentConversations(data);
  }

  private _assembleConversationData(
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
