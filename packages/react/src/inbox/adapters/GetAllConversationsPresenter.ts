import {
  ConversationData,
  IGetConversationsPresenter,
} from '@lens-protocol/domain/use-cases/inbox';

export class GetAllConversationsPresenter implements IGetConversationsPresenter {
  private result: ConversationData[] = [];

  presentConversations(conversations: ConversationData[]) {
    this.result = conversations;
  }

  asResult(): ConversationData[] {
    return this.result;
  }
}
