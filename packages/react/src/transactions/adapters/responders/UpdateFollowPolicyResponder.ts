import { UpdateFollowPolicyRequest } from '@lens-protocol/domain/use-cases/profile';
import { ITransactionResponder } from '@lens-protocol/domain/use-cases/transactions';

import { IProfileCacheManager } from '../../../profile/adapters/IProfileCacheManager';

export class UpdateFollowPolicyResponder
  implements ITransactionResponder<UpdateFollowPolicyRequest>
{
  constructor(private readonly profileCacheManager: IProfileCacheManager) {}

  async commit() {
    await this.profileCacheManager.refreshCurrentProfile();
  }
}
