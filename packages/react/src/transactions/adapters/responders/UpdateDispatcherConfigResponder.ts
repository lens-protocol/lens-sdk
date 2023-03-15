import { UpdateDispatcherConfigRequest } from '@lens-protocol/domain/use-cases/profile';
import {
  BroadcastedTransactionData,
  ITransactionResponder,
} from '@lens-protocol/domain/use-cases/transactions';

import { IProfileCacheManager } from '../IProfileCacheManager';

export class UpdateDispatcherConfigResponder
  implements ITransactionResponder<UpdateDispatcherConfigRequest>
{
  constructor(private readonly profileCacheManager: IProfileCacheManager) {}

  async commit({ request }: BroadcastedTransactionData<UpdateDispatcherConfigRequest>) {
    await this.profileCacheManager.refreshProfile(request.profileId);
  }
}
