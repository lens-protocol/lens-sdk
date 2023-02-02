import {
  GetProfileDocument,
  GetProfileQuery,
  GetProfileQueryVariables,
  LensApolloClient,
} from '@lens-protocol/api-bindings';
import { UpdateDispatcherConfigRequest } from '@lens-protocol/domain/use-cases/profile';
import {
  BroadcastedTransactionData,
  ITransactionResponder,
} from '@lens-protocol/domain/use-cases/transactions';

export class UpdateDispatcherConfigResponder
  implements ITransactionResponder<UpdateDispatcherConfigRequest>
{
  constructor(private readonly apolloClient: LensApolloClient) {}

  async commit({ request }: BroadcastedTransactionData<UpdateDispatcherConfigRequest>) {
    // cache update not possible given we need information from the server
    // whether given dispatcher address can use relayer
    await this.apolloClient.query<GetProfileQuery, GetProfileQueryVariables>({
      query: GetProfileDocument,
      variables: {
        request: {
          profileId: request.profileId,
        },
      },
      fetchPolicy: 'network-only',
    });
  }
}
