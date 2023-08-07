import { IConversationsGateway } from '@lens-protocol/domain/use-cases/wallets';
import { IStorage } from '@lens-protocol/storage';

export class DisableConversationsGateway implements IConversationsGateway {
  constructor(private readonly storage: IStorage<string>) {}

  async reset(): Promise<void> {
    return this.storage.reset();
  }
}
