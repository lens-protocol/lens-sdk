import { TriStateValue } from '@lens-protocol/api-bindings';
import { FollowRequest } from '@lens-protocol/domain/use-cases/profile';
import {
  ITransactionResponder,
  TransactionData,
} from '@lens-protocol/domain/use-cases/transactions';

import { IProfileCacheManager } from '../../../profile/adapters/IProfileCacheManager';

export class FollowProfileResponder implements ITransactionResponder<FollowRequest> {
  constructor(private readonly profileCacheManager: IProfileCacheManager) {}

  async prepare({ request }: TransactionData<FollowRequest>) {
    this.profileCacheManager.updateProfile(request.profileId, (current) => {
      return {
        ...current,
        stats: {
          ...current.stats,
          followers: current.stats.followers + 1,
        },
        operations: {
          ...current.operations,
          canFollow: TriStateValue.No,
          isFollowedByMe: {
            __typename: 'OptimisticStatusResult',
            value: true,
            isFinalisedOnchain: false,
          },
        },
      };
    });
  }

  async commit({ request }: TransactionData<FollowRequest>) {
    await this.profileCacheManager.fetchProfileById(request.profileId);
  }

  async rollback({ request }: TransactionData<FollowRequest>) {
    await this.profileCacheManager.fetchProfileById(request.profileId);
  }
}
