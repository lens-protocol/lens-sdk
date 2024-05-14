import { FollowingDocument, SafeApolloClient } from '@lens-protocol/api-bindings';
import { UnfollowRequest } from '@lens-protocol/domain/use-cases/profile';
import {
  TransactionData,
  ITransactionResponder,
} from '@lens-protocol/domain/use-cases/transactions';

import { IProfileCacheManager } from '../../../profile/adapters/IProfileCacheManager';

export class UnfollowProfileResponder implements ITransactionResponder<UnfollowRequest> {
  constructor(
    private readonly apolloClient: SafeApolloClient,
    private readonly profileCacheManager: IProfileCacheManager,
  ) {}

  async commit({ request }: TransactionData<UnfollowRequest>) {
    await Promise.all([
      this.profileCacheManager.fetchProfileById(request.profileId),
      this.apolloClient.refetchQueries({
        include: [FollowingDocument],
      }),
    ]);
  }
}
