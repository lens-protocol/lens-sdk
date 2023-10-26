import { FetchPolicy } from '@apollo/client';
import {
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
import { invariant, never } from '@lens-protocol/shared-kernel';

import { IProfileCacheManager } from '../adapters/IProfileCacheManager';

export class ProfileCacheManager implements IProfileCacheManager {
  constructor(private readonly client: SafeApolloClient) {}

  async fetchProfileById(id: ProfileId) {
    return this.fetch({ forProfileId: id }, 'cache-first');
  }

  async fetchProfileByHandle(fullHandle: string) {
    return this.fetch({ forHandle: fullHandle }, 'cache-first');
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

  // TODO no longer need to accept a profile id, only authenticated profile can be used
  updateProfile(id: string, updateFn: (current: Profile) => Profile): void {
    const identifier =
      this.client.cache.identify({ __typename: 'Profile', id }) ??
      never('Profile identifier not found');

    const profile = this.client.cache.readFragment<Profile>({
      id: identifier,
      fragmentName: 'Profile',
      fragment: FragmentProfile,
    });

    if (profile) {
      const updated = updateFn(profile);

      this.client.cache.writeFragment<Profile>({
        id: identifier,
        fragmentName: 'Profile',
        fragment: FragmentProfile,
        data: updated,
      });
    }
  }

  private async fetch(request: ProfileRequest, fetchPolicy: FetchPolicy) {
    const { data } = await this.client.query<ProfileData, ProfileVariables>({
      query: ProfileDocument,
      variables: { request },
      fetchPolicy,
    });

    return data.result;
  }
}
