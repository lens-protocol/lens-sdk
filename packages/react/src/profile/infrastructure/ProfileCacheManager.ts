import {
  AllFragmentVariables,
  FragmentProfile,
  getSessionData,
  Profile,
  ProfileData,
  ProfileDocument,
  ProfileRequest,
  ProfileVariables,
  SafeApolloClient,
} from '@lens-protocol/api-bindings';
import { ProfileId } from '@lens-protocol/domain/entities';
import { SessionType } from '@lens-protocol/domain/use-cases/authentication';
import { invariant } from '@lens-protocol/shared-kernel';

import { IProfileCacheManager } from '../adapters/IProfileCacheManager';

export class ProfileCacheManager implements IProfileCacheManager {
  constructor(
    private readonly client: SafeApolloClient,
    private readonly variables: AllFragmentVariables,
  ) {}

  async fetchProfileById(id: ProfileId) {
    return this.fetch({ forProfileId: id });
  }

  async fetchProfileByHandle(fullHandle: string) {
    return this.fetch({ forHandle: fullHandle });
  }

  async refreshCurrentProfile() {
    const session = getSessionData();

    if (!session) {
      // fail-safe in case the event leading to this cache update happened after logout
      return;
    }

    invariant(
      session.type === SessionType.WithProfile,
      `It's not possible to refresh a profile without a profile session`,
    );

    await this.client.refetchQueries({
      updateCache: (cache) => {
        cache.evict({
          id: cache.identify({ __typename: 'Profile', id: session.profileId }),
        });
      },
    });
  }

  update(
    profileId: ProfileId,
    updateFn: <TProfile extends Profile>(current: TProfile) => TProfile,
  ) {
    this.client.cache.updateFragment(
      {
        id: this.client.cache.identify({ __typename: 'Profile', id: profileId }),
        fragment: FragmentProfile,
        fragmentName: 'Profile',
        variables: this.variables,
      },
      (data: Profile | null) => {
        if (data) {
          return updateFn(data);
        }
        return data;
      },
    );
  }

  private async fetch(request: ProfileRequest) {
    const { data } = await this.client.query<ProfileData, ProfileVariables>({
      query: ProfileDocument,
      variables: {
        request,
        ...this.variables,
      },
      fetchPolicy: 'network-only',
    });

    return data.result;
  }
}
