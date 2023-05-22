import { ConversationId, Markdown, Message } from '../../entities/Conversation';

export interface ISendMessageGateway {
  sendMessage(request: SendMessageRequest): Promise<Message>;
}

export interface ISendMessagePresenter {
  presentNewMessage(message: Message): void;
}

export type SendMessageRequest = {
  conversationId: ConversationId;
  message: Markdown;
};

export class SendMessage {
  constructor(
    private readonly gateway: ISendMessageGateway,
    private readonly presenter: ISendMessagePresenter,
  ) {}

  async execute(request: SendMessageRequest): Promise<void> {
    const message = await this.gateway.sendMessage(request);

    this.presenter.presentNewMessage(message);
  }
}
