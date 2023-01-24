import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import {
  GetProfileDocument,
  GetProfileQuery,
  GetProfileQueryVariables,
} from '@lens-protocol/api-bindings';
import { UpdateFollowPolicyRequest } from '@lens-protocol/domain/use-cases/profile';
import {
  BroadcastedTransactionData,
  ITransactionResponder,
  TransactionData,
} from '@lens-protocol/domain/use-cases/transactions';

export class UpdateFollowPolicyResponder
  implements ITransactionResponder<UpdateFollowPolicyRequest>
{
  constructor(private apolloClient: ApolloClient<NormalizedCacheObject>) {}

  async prepare({ request }: TransactionData<UpdateFollowPolicyRequest>) {
    const profileIdentifier = this.apolloClient.cache.identify({
      __typename: 'Profile',
      id: request.profileId,
    });

    this.apolloClient.cache.modify({
      id: profileIdentifier,
      fields: {
        followPolicy() {
          return request.policy;
        },
      },
    });
  }

  async commit({ request }: BroadcastedTransactionData<UpdateFollowPolicyRequest>) {
    await this.refreshProfile(request.profileId);
  }

  async rollback({ request }: BroadcastedTransactionData<UpdateFollowPolicyRequest>) {
    await this.refreshProfile(request.profileId);
  }

  private async refreshProfile(profileId: string) {
    await this.apolloClient.query<GetProfileQuery, GetProfileQueryVariables>({
      query: GetProfileDocument,
      variables: {
        request: {
          profileId,
        },
      },
      fetchPolicy: 'network-only',
    });
  }
}
