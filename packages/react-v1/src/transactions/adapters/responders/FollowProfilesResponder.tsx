import { ApolloCache, NormalizedCacheObject } from '@apollo/client';
import { Profile, FragmentProfile } from '@lens-protocol/api-bindings';
import { FollowRequest } from '@lens-protocol/domain/use-cases/profile';
import {
  ITransactionResponder,
  TransactionData,
} from '@lens-protocol/domain/use-cases/transactions';

export class FollowProfilesResponder implements ITransactionResponder<FollowRequest> {
  constructor(private apolloCache: ApolloCache<NormalizedCacheObject>) {}

  async prepare({ request }: TransactionData<FollowRequest>) {
    const profileIdentifier = this.apolloCache.identify({
      __typename: 'Profile',
      id: request.profileId,
    });

    const snapshot = this.apolloCache.readFragment<Profile>({
      id: profileIdentifier,
      fragmentName: 'Profile',
      fragment: FragmentProfile,
    });

    if (snapshot) {
      this.apolloCache.writeFragment({
        id: profileIdentifier,
        fragmentName: 'Profile',
        fragment: FragmentProfile,
        data: {
          ...snapshot,
          stats: {
            ...snapshot.stats,
            totalFollowers: snapshot.stats.totalFollowers + 1,
          },
        },
      });
    }
  }

  async commit({ request }: TransactionData<FollowRequest>) {
    const profileIdentifier = this.apolloCache.identify({
      __typename: 'Profile',
      id: request.profileId,
    });

    const snapshot = this.apolloCache.readFragment<Profile>({
      id: profileIdentifier,
      fragmentName: 'Profile',
      fragment: FragmentProfile,
    });

    if (snapshot) {
      this.apolloCache.writeFragment({
        id: profileIdentifier,
        fragmentName: 'Profile',
        fragment: FragmentProfile,
        data: {
          ...snapshot,
          isFollowedByMe: true,
          stats: {
            ...snapshot.stats,
            totalFollowers: snapshot.stats.totalFollowers + 1,
          },
        },
      });
    }
  }

  async rollback({ request }: TransactionData<FollowRequest>) {
    const profileIdentifier = this.apolloCache.identify({
      __typename: 'Profile',
      id: request.profileId,
    });

    const snapshot = this.apolloCache.readFragment<Profile>({
      id: profileIdentifier,
      fragmentName: 'Profile',
      fragment: FragmentProfile,
    });

    if (snapshot) {
      this.apolloCache.writeFragment({
        id: profileIdentifier,
        fragmentName: 'Profile',
        fragment: FragmentProfile,
        data: {
          ...snapshot,
          stats: {
            ...snapshot.stats,
            totalFollowers: snapshot.stats.totalFollowers - 1,
          },
        },
      });
    }
  }
}
