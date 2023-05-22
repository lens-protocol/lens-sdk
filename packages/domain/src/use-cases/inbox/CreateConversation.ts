import { Conversation, ConversationId, Participant } from '../../entities/Conversation';

export interface ICreateConversationGateway {
  createConversation(request: CreateConversationRequest): Promise<Conversation>;
}

export interface ICreateConversationPresenter {
  presentNewConversation(conversation: Conversation): void;
}

export type CreateConversationData = {
  id: ConversationId;
  messages: [];
  peer: Participant;
};

export type CreateConversationRequest = {
  creator: Participant;
  peer: Participant;
};

export class CreateConversation {
  constructor(
    private readonly conversationGateway: ICreateConversationGateway,
    private readonly presenter: ICreateConversationPresenter,
  ) {}

  async execute(request: CreateConversationRequest): Promise<void> {
    const conversation = await this.conversationGateway.createConversation(request);

    this.presenter.presentNewConversation(conversation);
  }
}
