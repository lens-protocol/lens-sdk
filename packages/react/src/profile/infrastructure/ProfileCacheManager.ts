import { FetchPolicy } from '@apollo/client';
import {
  FragmentProfile,
  Profile,
  ProfileData,
  ProfileDocument,
  ProfileVariables,
  SafeApolloClient,
} from '@lens-protocol/api-bindings';
import { ProfileId } from '@lens-protocol/domain/entities';
import { never } from '@lens-protocol/shared-kernel';

import { IProfileCacheManager } from '../adapters/IProfileCacheManager';

export class ProfileCacheManager implements IProfileCacheManager {
  constructor(private readonly client: SafeApolloClient) {}

  async fetchProfile(id: ProfileId) {
    return this.request(id, 'cache-first');
  }

  async refreshProfile(id: ProfileId) {
    const profile = await this.request(id, 'network-only');

    return profile ?? never();
  }

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

  private async request(id: ProfileId, fetchPolicy: FetchPolicy) {
    const { data } = await this.client.query<ProfileData, ProfileVariables>({
      query: ProfileDocument,
      variables: {
        request: {
          forProfileId: id,
        },
      },
      fetchPolicy,
    });

    return data.result;
  }
}
