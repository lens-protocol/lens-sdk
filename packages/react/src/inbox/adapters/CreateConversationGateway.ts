import { Wallet } from '@lens-protocol/domain/entities';
import {
  CreateConversationRequest,
  CreateConversationResult,
  ICreateConversationGateway,
} from '@lens-protocol/domain/use-cases/inbox';

import { IConversationProvider } from './IConversationProvider';

export class CreateConversationGateway implements ICreateConversationGateway {
  constructor(private readonly provider: IConversationProvider) {}

  async createConversation(
    wallet: Wallet,
    request: CreateConversationRequest,
  ): Promise<CreateConversationResult> {
    return this.provider.createConversation({
      creator: {
        profileId: request.creatorProfileId,
        address: wallet.address,
      },
      peer: request.peer,
    });
  }
}
