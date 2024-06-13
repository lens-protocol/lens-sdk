import { FollowingDocument, SafeApolloClient } from '@lens-protocol/api-bindings';
import { FollowRequest } from '@lens-protocol/domain/use-cases/profile';
import {
  ITransactionResponder,
  TransactionData,
} from '@lens-protocol/domain/use-cases/transactions';

import { IProfileCacheManager } from '../../../profile/adapters/IProfileCacheManager';

export class FollowProfileResponder implements ITransactionResponder<FollowRequest> {
  constructor(
    private readonly apolloClient: SafeApolloClient,
    private readonly profileCacheManager: IProfileCacheManager,
  ) {}

  async commit({ request }: TransactionData<FollowRequest>) {
    await Promise.all([
      this.profileCacheManager.fetchProfileById(request.profileId),
      this.apolloClient.refetchQueries({
        include: [FollowingDocument],
      }),
    ]);
  }
}
