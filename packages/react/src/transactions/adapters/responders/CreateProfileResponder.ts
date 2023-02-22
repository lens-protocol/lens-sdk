import { makeVar } from '@apollo/client';
import {
  GetAllProfilesByOwnerAddressDocument,
  GetProfileDocument,
  GetProfileQuery,
  GetProfileQueryVariables,
  LensApolloClient,
  ProfileFragment,
  SearchProfilesDocument,
  SearchProfilesQuery,
  SearchProfilesQueryVariables,
} from '@lens-protocol/api-bindings';
import { CreateProfileRequest } from '@lens-protocol/domain/use-cases/profile';
import {
  BroadcastedTransactionData,
  ITransactionResponder,
} from '@lens-protocol/domain/use-cases/transactions';

export const createdProfilesVar = makeVar<ProfileFragment[]>([]);

export class CreateProfileResponder implements ITransactionResponder<CreateProfileRequest> {
  constructor(private readonly client: LensApolloClient) {}

  async commit({ request }: BroadcastedTransactionData<CreateProfileRequest>) {
    const res = await this.client.query<SearchProfilesQuery, SearchProfilesQueryVariables>({
      query: SearchProfilesDocument,
      variables: {
        query: request.handle,
        limit: 1,
      },
      fetchPolicy: 'network-only',
    });

    const item = res.data.result.items[0];

    if (item?.handle.split('.')[0] === request.handle) {
      createdProfilesVar([...createdProfilesVar(), item]);
    }
  }
}
