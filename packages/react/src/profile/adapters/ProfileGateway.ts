import {
  GetProfileQuery,
  GetProfileQueryVariables,
  GetProfileDocument,
  GetAllProfilesByOwnerAddressDocument,
  GetAllProfilesByOwnerAddressQuery,
  GetAllProfilesByOwnerAddressQueryVariables,
  LensApolloClient,
  Sources,
} from '@lens-protocol/api-bindings';
import { Profile } from '@lens-protocol/domain/entities';
import { IProfileGateway } from '@lens-protocol/domain/use-cases/profile';

export class ProfileGateway implements IProfileGateway {
  constructor(private readonly apolloClient: LensApolloClient, private readonly sources: Sources) {}

  async getAllProfilesByOwnerAddress(address: string): Promise<Profile[]> {
    const { data } = await this.apolloClient.query<
      GetAllProfilesByOwnerAddressQuery,
      GetAllProfilesByOwnerAddressQueryVariables
    >({
      query: GetAllProfilesByOwnerAddressDocument,
      variables: { address, limit: 10, sources: this.sources },
    });

    return data.result.items.map(({ id, handle }) => Profile.create({ id, handle }));
  }

  async getProfileByHandle(handle: string): Promise<Profile | null> {
    const { data } = await this.apolloClient.query<GetProfileQuery, GetProfileQueryVariables>({
      query: GetProfileDocument,
      variables: { request: { handle }, sources: this.sources },
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
      variables: { request: { profileId }, sources: this.sources },
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
