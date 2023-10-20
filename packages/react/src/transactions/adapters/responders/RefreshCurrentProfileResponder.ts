import { AnyTransactionRequestModel } from '@lens-protocol/domain/entities';
import { ITransactionResponder } from '@lens-protocol/domain/use-cases/transactions';

import { IProfileCacheManager } from '../../../profile/adapters/IProfileCacheManager';

export class RefreshCurrentProfileResponder
  implements ITransactionResponder<AnyTransactionRequestModel>
{
  constructor(private readonly profileCacheManager: IProfileCacheManager) {}

  async commit() {
    await this.profileCacheManager.refreshCurrentProfile();
  }
}
