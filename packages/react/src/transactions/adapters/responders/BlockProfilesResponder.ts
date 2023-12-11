import { BlockProfilesRequest } from '@lens-protocol/domain/use-cases/profile';
import {
  ITransactionResponder,
  TransactionData,
} from '@lens-protocol/domain/use-cases/transactions';

import { IProfileCacheManager } from '../../../profile/adapters/IProfileCacheManager';

export class BlockProfilesResponder implements ITransactionResponder<BlockProfilesRequest> {
  constructor(private readonly profileCacheManager: IProfileCacheManager) {}

  async commit({ request }: TransactionData<BlockProfilesRequest>) {
    await Promise.all(
      request.profileIds.map(async (profileId) =>
        this.profileCacheManager.fetchProfileById(profileId),
      ),
    );
  }
}
