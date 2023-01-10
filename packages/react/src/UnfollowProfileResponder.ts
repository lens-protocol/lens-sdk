import { ApolloCache, NormalizedCacheObject } from '@apollo/client';
import { Profile } from '@lens-protocol/api-bindings';
import { UnfollowRequest } from '@lens-protocol/domain/use-cases/profile';
import {
  BroadcastedTransactionData,
  ITransactionResponder,
} from '@lens-protocol/domain/use-cases/transactions';

export class UnfollowProfileResponder implements ITransactionResponder<UnfollowRequest> {
  constructor(private apolloCache: ApolloCache<NormalizedCacheObject>) {}

  async commit({ request }: BroadcastedTransactionData<UnfollowRequest>) {
    const profileIdentifier = this.apolloCache.identify({
      __typename: 'Profile',
      id: request.profileId,
    });
    this.apolloCache.modify({
      id: profileIdentifier,
      fields: {
        isFollowedByMe: () => false,
        stats(oldStats: Profile['stats']) {
          return {
            ...oldStats,
            totalFollowers: oldStats.totalFollowers - 1,
          };
        },
      },
    });
  }
}
