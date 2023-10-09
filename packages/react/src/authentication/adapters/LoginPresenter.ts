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
  private deferredResult = new Deferred<Result<Profile, LoginError>>();

  constructor(private readonly profileCacheManager: IProfileCacheManager) {}

  async present(result: Result<SessionData, LoginError>) {
    if (result.isFailure()) {
      this.deferredResult.resolve(result);
      return;
    }

    invariant(
      result.value.type === SessionType.WithProfile,
      `At the moment we only support ${SessionType.WithProfile} sessions`,
    );

    const { profileId } = result.value;
    const profile = await this.profileCacheManager.fetchProfile(profileId);

    invariant(profile, 'Profile not found');

    updateSessionData(result.value);

    this.deferredResult.resolve(success(profile));
    return;
  }

  asResult(): PromiseResult<Profile, LoginError> {
    return this.deferredResult.promise;
  }
}
