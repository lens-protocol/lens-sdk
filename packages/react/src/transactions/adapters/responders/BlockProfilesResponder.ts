import { BlockProfilesRequest } from '@lens-protocol/domain/src/use-cases/profile/BlockProfiles';
import {
  ITransactionResponder,
  TransactionData,
} from '@lens-protocol/domain/use-cases/transactions';

import { IProfileCacheManager } from '../../../profile/adapters/IProfileCacheManager';

export class BlockProfilesResponder implements ITransactionResponder<BlockProfilesRequest> {
  constructor(private readonly profileCacheManager: IProfileCacheManager) {}

  async prepare({ request }: TransactionData<BlockProfilesRequest>) {
    request.profileIds.forEach(async (profileId) => {
      this.profileCacheManager.updateProfile(profileId, (current) => ({
        ...current,
        operations: {
          ...current.operations,
          canBlock: false,
          isBlockedByMe: {
            __typename: 'OptimisticStatusResult',
            isFinalisedOnchain: false,
            value: true,
          },
        },
      }));
    });
  }

  async commit({ request }: TransactionData<BlockProfilesRequest>) {
    request.profileIds.forEach(async (profileId) => {
      await this.profileCacheManager.fetchProfile(profileId);
    });
  }

  async rollback({ request }: TransactionData<BlockProfilesRequest>) {
    request.profileIds.forEach(async (profileId) => {
      await this.profileCacheManager.fetchProfile(profileId);
    });
  }
}
