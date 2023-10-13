import { UpdateProfileDetailsRequest } from '@lens-protocol/domain/use-cases/profile';
import { ITransactionResponder } from '@lens-protocol/domain/use-cases/transactions';

import { IProfileCacheManager } from '../../../profile/adapters/IProfileCacheManager';

export class SetProfileMetadataResponder
  implements ITransactionResponder<UpdateProfileDetailsRequest>
{
  constructor(private readonly profileCacheManager: IProfileCacheManager) {}

  async commit() {
    await Promise.all([this.profileCacheManager.refreshCurrentProfile()]);
  }
}
