import { ProfileManagersDocument, SafeApolloClient } from '@lens-protocol/api-bindings';
import { UpdateProfileManagersRequest } from '@lens-protocol/domain/use-cases/profile';
import { ITransactionResponder } from '@lens-protocol/domain/use-cases/transactions';

import { IProfileCacheManager } from '../../../profile/adapters/IProfileCacheManager';

export class UpdateProfileManagersResponder
  implements ITransactionResponder<UpdateProfileManagersRequest>
{
  constructor(
    private readonly apolloClient: SafeApolloClient,
    private readonly profileCacheManager: IProfileCacheManager,
  ) {}

  async commit() {
    await Promise.all([
      this.profileCacheManager.refreshCurrentProfile(),
      this.apolloClient.refetchQueries({
        include: [ProfileManagersDocument],
      }),
    ]);
  }
}
