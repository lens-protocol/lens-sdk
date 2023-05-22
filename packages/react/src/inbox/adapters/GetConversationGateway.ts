import { Wallet } from '@lens-protocol/domain/entities';
import {
  GetConversationRequest,
  GetConversationResult,
  IGetConversationGateway,
} from '@lens-protocol/domain/use-cases/inbox';

import { IConversationProvider } from './IConversationProvider';

export class GetConversationGateway implements IGetConversationGateway {
  constructor(private readonly provider: IConversationProvider) {}

  async fetchConversationWithMessages(
    wallet: Wallet,
    request: GetConversationRequest,
  ): Promise<GetConversationResult> {
    return this.provider.fetchConversation({
      conversationId: request.conversationId,
      participant: {
        profileId: request.profileId,
        address: wallet.address,
      },
    });
  }
}
