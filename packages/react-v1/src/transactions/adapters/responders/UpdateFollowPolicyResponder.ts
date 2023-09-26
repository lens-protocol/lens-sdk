import { FollowPolicy } from '@lens-protocol/api-bindings';
import { UpdateFollowPolicyRequest } from '@lens-protocol/domain/use-cases/profile';
import {
  ITransactionResponder,
  TransactionData,
} from '@lens-protocol/domain/use-cases/transactions';

import { IProfileCacheManager } from '../IProfileCacheManager';

export class UpdateFollowPolicyResponder
  implements ITransactionResponder<UpdateFollowPolicyRequest>
{
  constructor(private readonly profileCacheManager: IProfileCacheManager) {}

  async prepare({ request }: TransactionData<UpdateFollowPolicyRequest>) {
    this.profileCacheManager.updateProfile(request.profileId, (current) => ({
      ...current,
      followPolicy: request.policy as FollowPolicy, // TODO sort discrepancy with contractAddress missing from request model
    }));
  }

  async commit({ request }: TransactionData<UpdateFollowPolicyRequest>) {
    await this.profileCacheManager.refreshProfile(request.profileId);
  }

  async rollback({ request }: TransactionData<UpdateFollowPolicyRequest>) {
    await this.profileCacheManager.refreshProfile(request.profileId);
  }
}
