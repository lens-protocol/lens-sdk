import { OwnedHandlesDocument, SafeApolloClient } from '@lens-protocol/api-bindings';
import { AnyTransactionRequestModel } from '@lens-protocol/domain/entities';
import { ITransactionResponder } from '@lens-protocol/domain/use-cases/transactions';

import { IProfileCacheManager } from '../../../profile/adapters/IProfileCacheManager';

export class LinkHandleResponder implements ITransactionResponder<AnyTransactionRequestModel> {
  constructor(
    private readonly apolloClient: SafeApolloClient,
    private readonly profileCacheManager: IProfileCacheManager,
  ) {}

  async commit() {
    await Promise.all([
      this.profileCacheManager.refreshCurrentProfile(),
      this.apolloClient.refetchQueries({
        include: [OwnedHandlesDocument],
      }),
    ]);
  }
}
