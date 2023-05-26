import {
  EnableConversationsResult,
  IEnableConversationsGateway,
} from '@lens-protocol/domain/use-cases/inbox';

import { ConcreteWallet } from '../../wallet/adapters/ConcreteWallet';
import { IConversationProvider } from './IConversationProvider';

export class EnableConversationsGateway implements IEnableConversationsGateway {
  constructor(private readonly provider: IConversationProvider) {}

  async enableConversations(wallet: ConcreteWallet): Promise<EnableConversationsResult> {
    return this.provider.enableConversations(wallet);
  }
}
