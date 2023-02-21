import {
  GetProfileDocument,
  GetProfileQuery,
  GetProfileQueryVariables,
  LensApolloClient,
  Sources,
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
  constructor(private apolloClient: LensApolloClient, private readonly sources: Sources) {}

  async prepare({ request }: TransactionData<UpdateFollowPolicyRequest>) {
    const profileIdentifier = this.apolloClient.cache.identify({
      __typename: 'Profile',
      id: request.profileId,
    });

    this.apolloClient.cache.modify({
      id: profileIdentifier,
      fields: {
        followPolicy() {
          // Apollo types makes this operation unsafe
          // make sure the shape is correct with a test
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
        sources: this.sources,
      },
      fetchPolicy: 'network-only',
    });
  }
}
