import { Wallet } from '@lens-protocol/domain/entities';
import {
  GetAllConversationsRequest,
  GetAllConversationsResult,
  IGetConversationsGateway,
} from '@lens-protocol/domain/use-cases/inbox';

import { IConversationProvider } from './IConversationProvider';

export class GetAllConversationsGateway implements IGetConversationsGateway {
  constructor(private readonly provider: IConversationProvider) {}

  async fetchConversations(
    wallet: Wallet,
    request: GetAllConversationsRequest,
  ): Promise<GetAllConversationsResult> {
    return this.provider.fetchConversations({
      participant: {
        profileId: request.profileId,
        address: wallet.address,
      },
    });
  }
}
