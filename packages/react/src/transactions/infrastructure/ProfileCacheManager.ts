import { FetchPolicy } from '@apollo/client';
import {
  GetProfileDocument,
  GetProfileQuery,
  GetProfileQueryVariables,
  LensApolloClient,
  ProfileFragment,
  ProfileFragmentDoc,
  Sources,
} from '@lens-protocol/api-bindings';
import { never } from '@lens-protocol/shared-kernel';

import { activeProfileIdentifierVar } from '../../profile/adapters/ActiveProfilePresenter';
import { FetchProfileArgs, IProfileCacheManager } from '../adapters/IProfileCacheManager';

export class ProfileCacheManager implements IProfileCacheManager {
  constructor(private readonly client: LensApolloClient, private readonly sources: Sources) {}

  async fetchProfile(args: FetchProfileArgs) {
    return this.request(args, 'cache-first');
  }

  async refreshProfile(id: string) {
    const profile = await this.request({ id }, 'network-only');

    return profile ?? never();
  }

  private async request(args: FetchProfileArgs, fetchPolicy: FetchPolicy) {
    const activeProfile = activeProfileIdentifierVar();

    const { data } = await this.client.query<GetProfileQuery, GetProfileQueryVariables>({
      query: GetProfileDocument,
      variables: {
        request: {
          profileId: args.id,
          handle: args.handle,
        },
        observerId: activeProfile?.id,
        sources: this.sources,
      },
      fetchPolicy,
    });

    return data.result;
  }

  updateProfile(id: string, updateFn: (current: ProfileFragment) => ProfileFragment): void {
    const identifier =
      this.client.cache.identify({ __typename: 'Profile', id }) ??
      never('Profile identifier not found');

    const profile = this.client.cache.readFragment<ProfileFragment>({
      id: identifier,
      fragmentName: 'Profile',
      fragment: ProfileFragmentDoc,
    });

    if (profile) {
      const updated = updateFn(profile);

      this.client.cache.writeFragment<ProfileFragment>({
        id: identifier,
        fragmentName: 'Profile',
        fragment: ProfileFragmentDoc,
        data: updated,
      });
    }
  }
}
