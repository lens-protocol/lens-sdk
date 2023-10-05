import { authenticated, Profile, updateSession } from '@lens-protocol/api-bindings';
import {
  ILoginPresenter,
  LoginError,
  SessionData,
} from '@lens-protocol/domain/use-cases/authentication';
import {
  Deferred,
  failure,
  invariant,
  PromiseResult,
  Result,
  success,
} from '@lens-protocol/shared-kernel';

import { IProfileCacheManager } from '../../profile/adapters/IProfileCacheManager';

export class LoginPresenter implements ILoginPresenter {
  private deferredResult = new Deferred<Result<Profile, LoginError>>();

  constructor(private readonly profileCacheManager: IProfileCacheManager) {}

  async present(result: Result<SessionData, LoginError>) {
    if (result.isFailure()) {
      this.deferredResult.resolve(failure(result.error));
      return;
    }

    const { profileId } = result.value;
    const profile = await this.profileCacheManager.fetchProfile(profileId);

    invariant(profile, 'Profile not found');

    updateSession(authenticated(result.value));

    this.deferredResult.resolve(success(profile));
    return;
  }

  asResult(): PromiseResult<Profile, LoginError> {
    return this.deferredResult.promise;
  }
}
