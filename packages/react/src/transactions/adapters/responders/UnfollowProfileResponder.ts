import { UnfollowRequest } from '@lens-protocol/domain/use-cases/profile';
import {
  TransactionData,
  ITransactionResponder,
} from '@lens-protocol/domain/use-cases/transactions';

import { IProfileCacheManager } from '../../../profile/adapters/IProfileCacheManager';

export class UnfollowProfileResponder implements ITransactionResponder<UnfollowRequest> {
  constructor(private readonly profileCacheManager: IProfileCacheManager) {}

  async prepare({ request }: TransactionData<UnfollowRequest>) {
    this.profileCacheManager.updateProfile(request.profileId, (current) => {
      return {
        ...current,
        stats: {
          ...current.stats,
          followers: current.stats.followers - 1,
        },
        operations: {
          ...current.operations,
          canUnfollow: false,
          isFollowedByMe: {
            __typename: 'OptimisticStatusResult',
            value: false,
            isFinalisedOnchain: false,
          },
        },
      };
    });
  }

  async commit({ request }: TransactionData<UnfollowRequest>) {
    await this.profileCacheManager.fetchProfile(request.profileId);
  }

  async rollback({ request }: TransactionData<UnfollowRequest>) {
    await this.profileCacheManager.fetchProfile(request.profileId);
  }
}
