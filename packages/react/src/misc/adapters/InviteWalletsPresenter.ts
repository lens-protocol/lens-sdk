import { InvitedProfilesDocument, SafeApolloClient } from '@lens-protocol/api-bindings';
import { IGenericResultPresenter } from '@lens-protocol/domain/use-cases/transactions';
import { WalletAlreadyInvitedError } from '@lens-protocol/domain/use-cases/wallets';
import { Deferred, PromiseResult, Result, success } from '@lens-protocol/shared-kernel';

import { IProfileCacheManager } from '../../profile/adapters/IProfileCacheManager';

export class InviteWalletsPresenter
  implements IGenericResultPresenter<void, WalletAlreadyInvitedError>
{
  constructor(
    private readonly apolloClient: SafeApolloClient,
    private readonly profileCacheManager: IProfileCacheManager,
  ) {}

  private deferredResult = new Deferred<Result<void, WalletAlreadyInvitedError>>();

  async present(
    result: Result<void, WalletAlreadyInvitedError>,
  ): PromiseResult<void, WalletAlreadyInvitedError> {
    this.deferredResult.resolve(result);

    if (result.isFailure()) {
      return result;
    }

    await Promise.all([
      this.profileCacheManager.refreshCurrentProfile(),
      this.apolloClient.refetchQueries({
        include: [InvitedProfilesDocument],
      }),
    ]);

    return success();
  }

  asResult(): PromiseResult<void, WalletAlreadyInvitedError> {
    return this.deferredResult.promise;
  }
}
