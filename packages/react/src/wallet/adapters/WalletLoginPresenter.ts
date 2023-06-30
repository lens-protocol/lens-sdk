import { Profile } from '@lens-protocol/api-bindings';
import { ProfileIdentifier } from '@lens-protocol/domain/use-cases/lifecycle';
import { IWalletLoginPresenter, LoginError } from '@lens-protocol/domain/use-cases/wallets';
import { Result, success } from '@lens-protocol/shared-kernel';

import { IProfileCacheManager } from '../../transactions/adapters/IProfileCacheManager';
import { PromiseResultPresenter } from '../../transactions/adapters/PromiseResultPresenter';

export class WalletLoginPresenter
  extends PromiseResultPresenter<Profile | null, LoginError>
  implements IWalletLoginPresenter
{
  constructor(private readonly profileCacheManager: IProfileCacheManager) {
    super();
  }

  override async present(result: Result<ProfileIdentifier | null, LoginError>) {
    if (result.isSuccess()) {
      if (result.value === null) {
        return super.present(success(null));
      }
      const { id } = result.value;
      const profile = await this.profileCacheManager.fetchProfile({ id });

      return super.present(success(profile));
    }

    return super.present(result);
  }
}
