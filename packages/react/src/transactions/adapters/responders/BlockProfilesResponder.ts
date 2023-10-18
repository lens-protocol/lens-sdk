import { BlockProfilesRequest } from '@lens-protocol/domain/src/use-cases/profile/BlockProfiles';
import { ITransactionResponder } from '@lens-protocol/domain/use-cases/transactions';

import { IProfileCacheManager } from '../../../profile/adapters/IProfileCacheManager';

export class BlockProfilesResponder implements ITransactionResponder<BlockProfilesRequest> {
  constructor(private readonly profileCacheManager: IProfileCacheManager) {}

  async commit() {
    await this.profileCacheManager.refreshCurrentProfile();
    // TODO: invalidate related queries
  }
}
