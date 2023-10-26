import { Profile, updateSessionData } from '@lens-protocol/api-bindings';
import {
  ILoginPresenter,
  LoginError,
  SessionData,
  SessionType,
} from '@lens-protocol/domain/use-cases/authentication';
import { Deferred, invariant, PromiseResult, Result, success } from '@lens-protocol/shared-kernel';

import { IProfileCacheManager } from '../../profile/adapters/IProfileCacheManager';

export class LoginPresenter implements ILoginPresenter {
  private deferredResult = new Deferred<Result<Profile | null, LoginError>>();

  constructor(private readonly profileCacheManager: IProfileCacheManager) {}

  async present(result: Result<SessionData, LoginError>) {
    if (result.isFailure()) {
      this.deferredResult.resolve(result);
      return;
    }

    const session = result.value;

    invariant(session.type !== SessionType.Anonymous, 'Unexpected anonymous session type');

    if (session.type === SessionType.JustWallet) {
      updateSessionData(session);

      this.deferredResult.resolve(success(null));
      return;
    }

    const profile = await this.profileCacheManager.fetchProfileById(session.profileId);

    invariant(profile, 'Profile not found');

    updateSessionData(session);

    this.deferredResult.resolve(success(profile));
    return;
  }

  asResult(): PromiseResult<Profile | null, LoginError> {
    return this.deferredResult.promise;
  }
}
