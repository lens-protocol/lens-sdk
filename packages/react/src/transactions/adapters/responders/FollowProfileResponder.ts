import { FollowRequest } from '@lens-protocol/domain/use-cases/profile';
import {
  ITransactionResponder,
  TransactionData,
} from '@lens-protocol/domain/use-cases/transactions';

import { IProfileCacheManager } from '../../../profile/adapters/IProfileCacheManager';

export class FollowProfileResponder implements ITransactionResponder<FollowRequest> {
  constructor(private readonly profileCacheManager: IProfileCacheManager) {}

  async commit({ request }: TransactionData<FollowRequest>) {
    await this.profileCacheManager.fetchProfileById(request.profileId);
  }
}
