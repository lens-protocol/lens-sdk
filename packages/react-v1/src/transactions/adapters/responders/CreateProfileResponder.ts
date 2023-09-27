import { makeVar, useReactiveVar } from '@apollo/client';
import { Profile } from '@lens-protocol/api-bindings';
import { CreateProfileRequest } from '@lens-protocol/domain/use-cases/profile';
import {
  TransactionData,
  ITransactionResponder,
} from '@lens-protocol/domain/use-cases/transactions';

import { IProfileCacheManager } from '../IProfileCacheManager';

const recentProfilesVar = makeVar<Profile[]>([]);

export class CreateProfileResponder implements ITransactionResponder<CreateProfileRequest> {
  constructor(private readonly profileCacheManager: IProfileCacheManager) {}

  async commit({ request }: TransactionData<CreateProfileRequest>) {
    const profile = await this.profileCacheManager.fetchNewProfile(request.handle);

    recentProfilesVar([...recentProfilesVar(), profile]);
  }
}

export function useRecentProfiles() {
  return useReactiveVar(recentProfilesVar);
}
