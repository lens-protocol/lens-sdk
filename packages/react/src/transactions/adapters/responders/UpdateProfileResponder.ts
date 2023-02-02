import {
  GetProfileDocument,
  GetProfileQuery,
  GetProfileQueryVariables,
  LensApolloClient,
} from '@lens-protocol/api-bindings';
import {
  UpdateFollowPolicyRequest,
  UpdateProfileImageRequest,
} from '@lens-protocol/domain/use-cases/profile';
import {
  BroadcastedTransactionData,
  ITransactionResponder,
} from '@lens-protocol/domain/use-cases/transactions';

export class UpdateProfileResponder
  implements ITransactionResponder<UpdateProfileImageRequest | UpdateFollowPolicyRequest>
{
  constructor(private readonly apolloClient: LensApolloClient) {}

  async commit({
    request,
  }: BroadcastedTransactionData<UpdateProfileImageRequest | UpdateFollowPolicyRequest>) {
    await this.refreshProfile(request.profileId);
  }

  private async refreshProfile(profileId: string) {
    // updates Profile in cache
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
