import {
  GetProfileQuery,
  GetProfileQueryVariables,
  GetProfileDocument,
  GetAllProfilesByOwnerAddressDocument,
  GetAllProfilesByOwnerAddressQuery,
  GetAllProfilesByOwnerAddressQueryVariables,
  LensApolloClient,
} from '@lens-protocol/api-bindings';
import { Profile } from '@lens-protocol/domain/entities';
import { IProfileGateway } from '@lens-protocol/domain/use-cases/profile';

export class ProfileGateway implements IProfileGateway {
  constructor(private readonly apolloClient: LensApolloClient) {}

  async getAllProfilesByOwnerAddress(address: string): Promise<Profile[]> {
    const { data } = await this.apolloClient.query<
      GetAllProfilesByOwnerAddressQuery,
      GetAllProfilesByOwnerAddressQueryVariables
    >({
      query: GetAllProfilesByOwnerAddressDocument,
      // 'sources' asn 'observerId' are not needed. We just use 'id' and 'handle' for now.
      variables: { address, limit: 10 },
    });

    return data.result.items.map(({ id, handle }) => Profile.create({ id, handle }));
  }

  async getProfileByHandle(handle: string): Promise<Profile | null> {
    const { data } = await this.apolloClient.query<GetProfileQuery, GetProfileQueryVariables>({
      query: GetProfileDocument,
      // 'sources' asn 'observerId' are not needed. We just use 'id' and 'handle' for now.
      variables: { request: { handle } },
    });

    if (data.result === null) {
      return null;
    }
    return Profile.create({
      id: data.result.id,
      handle: data.result.handle,
    });
  }

  async getProfileById(profileId: string): Promise<Profile | null> {
    const { data } = await this.apolloClient.query<GetProfileQuery, GetProfileQueryVariables>({
      query: GetProfileDocument,
      // 'sources' asn 'observerId' are not needed. We just use 'id' and 'handle' for now.
      variables: { request: { profileId } },
    });

    if (data.result === null) {
      return null;
    }
    return Profile.create({
      id: data.result.id,
      handle: data.result.handle,
    });
  }
}
