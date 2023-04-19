import { makeVar, useReactiveVar } from '@apollo/client';
import { Profile } from '@lens-protocol/api-bindings';
import { CreateProfileRequest } from '@lens-protocol/domain/use-cases/profile';
import {
  TransactionData,
  ITransactionResponder,
} from '@lens-protocol/domain/use-cases/transactions';

import { ProfileHandleResolver } from '../../../environments';
import { IProfileCacheManager } from '../IProfileCacheManager';

const recentProfilesVar = makeVar<Profile[]>([]);

export class CreateProfileResponder implements ITransactionResponder<CreateProfileRequest> {
  constructor(
    private readonly profileCacheManager: IProfileCacheManager,
    private readonly handleResolver: ProfileHandleResolver,
  ) {}

  async commit({ request }: TransactionData<CreateProfileRequest>) {
    const profile = await this.profileCacheManager.fetchProfile({
      handle: this.handleResolver(request.handle),
    });

    if (profile) {
      recentProfilesVar([...recentProfilesVar(), profile]);
    }
  }
}

export function useRecentProfiles() {
  return useReactiveVar(recentProfilesVar);
}
