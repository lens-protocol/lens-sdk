import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import {
  GetProfileQuery,
  GetProfileQueryVariables,
  GetProfileDocument,
  GetAllProfilesByOwnerAddressDocument,
  GetAllProfilesByOwnerAddressQuery,
  GetAllProfilesByOwnerAddressQueryVariables,
} from '@lens-protocol/api-bindings';
import { Profile } from '@lens-protocol/domain/entities';
import { IProfileGateway } from '@lens-protocol/domain/use-cases/profile';
import { invariant } from '@lens-protocol/shared-kernel';

export class ProfileGateway implements IProfileGateway {
  constructor(private readonly apolloClient: ApolloClient<NormalizedCacheObject>) {}

  async getAllProfilesByOwnerAddress(address: string): Promise<Profile[]> {
    const { data } = await this.apolloClient.query<
      GetAllProfilesByOwnerAddressQuery,
      GetAllProfilesByOwnerAddressQueryVariables
    >({
      query: GetAllProfilesByOwnerAddressDocument,
      variables: { address, limit: 10 },
    });

    invariant(data, `Could not query profiles by owner address: ${address}`);

    return data.result.items.map(({ id, handle }) => Profile.create({ id, handle }));
  }

  async getProfileByHandle(handle: string): Promise<Profile | null> {
    const { data } = await this.apolloClient.query<GetProfileQuery, GetProfileQueryVariables>({
      query: GetProfileDocument,
      variables: { request: { handle } },
    });

    invariant(data, `Could not query profiles by handle: ${handle}`);

    if (data.result === null) {
      return null;
    }
    return Profile.create({
      id: data.result.id,
      handle: data.result.handle,
    });
  }
}
