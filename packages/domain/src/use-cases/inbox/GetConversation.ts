import {
  Conversation,
  ConversationId,
  Markdown,
  Message,
  Participant,
} from '../../entities/Conversation';

export interface IGetConversationGateway {
  fetchConversation(request: GetConversationRequest): Promise<Conversation | null>;
}

export interface IGetConversationMessageGateway {
  fetchMessagesFor(conversation: Conversation): Promise<Message[]>;
}

export interface IGetConversationPresenter {
  presentConversation(conversation: GetConversationData | null): void;
}

export type GetConversationMessageData = {
  id: string;
  content: Markdown;
  sentAt: Date;
};

export type GetConversationData = {
  id: ConversationId;
  messages: GetConversationMessageData[];
  peer: Participant;
};

export type GetConversationRequest = {
  conversationId: ConversationId;
};

export class GetConversation {
  constructor(
    private readonly conversationGateway: IGetConversationGateway,
    private readonly messageGateway: IGetConversationMessageGateway,
    private readonly presenter: IGetConversationPresenter,
  ) {}

  async execute(request: GetConversationRequest): Promise<void> {
    const conversation = await this.conversationGateway.fetchConversation({
      conversationId: request.conversationId,
    });

    if (!conversation) {
      this.presenter.presentConversation(null);
      return;
    }

    const messages = await this.messageGateway.fetchMessagesFor(conversation);

    const data = this.assembleConversationData(conversation, messages);

    this.presenter.presentConversation(data);
  }

  private assembleConversationData(
    conversation: Conversation,
    messages: Message[],
  ): GetConversationData {
    return {
      id: conversation.id,
      messages,
      peer: conversation.peer,
    };
  }
}
