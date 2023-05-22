import { Wallet } from '@lens-protocol/domain/entities';
import {
  EnableConversationsRequest,
  EnableConversationsResult,
  IEnableConversationsGateway,
} from '@lens-protocol/domain/use-cases/inbox';

import { IConversationProvider } from './IConversationProvider';

export class EnableConversationsGateway implements IEnableConversationsGateway {
  constructor(private readonly provider: IConversationProvider) {}

  async enableConversations(
    wallet: Wallet,
    request: EnableConversationsRequest,
  ): Promise<EnableConversationsResult> {
    return this.provider.enableConversations(wallet, {
      participant: {
        profileId: request.profileId,
        address: wallet.address,
      },
    });
  }
}
