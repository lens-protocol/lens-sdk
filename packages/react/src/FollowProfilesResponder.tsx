import { ApolloCache, NormalizedCacheObject } from '@apollo/client';
import { ProfileFieldsFragment, ProfileFieldsFragmentDoc } from '@lens-protocol/api-bindings';
import { FollowRequest } from '@lens-protocol/domain/use-cases/profile';
import {
  BroadcastedTransactionData,
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

    const snapshot = this.apolloCache.readFragment<ProfileFieldsFragment>({
      id: profileIdentifier,
      fragmentName: 'ProfileFields',
      fragment: ProfileFieldsFragmentDoc,
    });

    if (snapshot) {
      this.apolloCache.writeFragment({
        id: profileIdentifier,
        fragmentName: 'ProfileFields',
        fragment: ProfileFieldsFragmentDoc,
        data: {
          ...snapshot,
          isOptimisticFollowedByMe: true,
          stats: {
            ...snapshot.stats,
            totalFollowers: snapshot.stats.totalFollowers + 1,
          },
        },
      });
    }
  }

  async commit({ request }: BroadcastedTransactionData<FollowRequest>) {
    const profileIdentifier = this.apolloCache.identify({
      __typename: 'Profile',
      id: request.profileId,
    });

    const snapshot = this.apolloCache.readFragment<ProfileFieldsFragment>({
      id: profileIdentifier,
      fragmentName: 'ProfileFields',
      fragment: ProfileFieldsFragmentDoc,
    });

    if (snapshot) {
      this.apolloCache.writeFragment({
        id: profileIdentifier,
        fragmentName: 'ProfileFields',
        fragment: ProfileFieldsFragmentDoc,
        data: {
          ...snapshot,
          isFollowedByMe: true,
        },
      });
    }
  }

  async rollback({ request }: TransactionData<FollowRequest>) {
    const profileIdentifier = this.apolloCache.identify({
      __typename: 'Profile',
      id: request.profileId,
    });

    const snapshot = this.apolloCache.readFragment<ProfileFieldsFragment>({
      id: profileIdentifier,
      fragmentName: 'ProfileFields',
      fragment: ProfileFieldsFragmentDoc,
    });

    if (snapshot) {
      this.apolloCache.writeFragment({
        id: profileIdentifier,
        fragmentName: 'ProfileFields',
        fragment: ProfileFieldsFragmentDoc,
        data: {
          ...snapshot,
          isOptimisticFollowedByMe: false,
          stats: {
            ...snapshot.stats,
            totalFollowers: snapshot.stats.totalFollowers - 1,
          },
        },
      });
    }
  }
}
