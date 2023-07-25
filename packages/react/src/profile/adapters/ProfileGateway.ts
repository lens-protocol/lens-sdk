import {
  GetProfileData,
  GetProfileVariables,
  GetProfileDocument,
  SafeApolloClient,
  GetAllProfilesData,
  GetAllProfilesVariables,
  GetAllProfilesDocument,
} from '@lens-protocol/api-bindings';
import { Profile, ProfileId } from '@lens-protocol/domain/entities';
import { IProfileGateway } from '@lens-protocol/domain/use-cases/profile';

import { MediaTransformsConfig, mediaTransformConfigToQueryVariables } from '../../mediaTransforms';

export class ProfileGateway implements IProfileGateway {
  constructor(
    private readonly apolloClient: SafeApolloClient,
    private readonly mediaTransforms: MediaTransformsConfig,
  ) {}

  async getAllProfilesByOwnerAddress(address: string): Promise<Profile[]> {
    const { data } = await this.apolloClient.query<GetAllProfilesData, GetAllProfilesVariables>({
      query: GetAllProfilesDocument,
      // 'sources' and 'observerId' are not needed. We just use 'id' and 'handle' for now.
      variables: {
        byOwnerAddresses: [address],
        limit: 10,
        ...mediaTransformConfigToQueryVariables(this.mediaTransforms),
      },
    });

    return data.result.items.map(({ id, handle }) => Profile.create({ id, handle }));
  }

  async getProfileByHandle(handle: string): Promise<Profile | null> {
    const { data } = await this.apolloClient.query<GetProfileData, GetProfileVariables>({
      query: GetProfileDocument,
      // 'sources' and 'observerId' are not needed. We just use 'id' and 'handle' for now.
      variables: {
        request: { handle },
        ...mediaTransformConfigToQueryVariables(this.mediaTransforms),
      },
    });

    if (data.result === null) {
      return null;
    }
    return Profile.create({
      id: data.result.id,
      handle: data.result.handle,
    });
  }

  async getProfileById(profileId: ProfileId): Promise<Profile | null> {
    const { data } = await this.apolloClient.query<GetProfileData, GetProfileVariables>({
      query: GetProfileDocument,
      // 'sources' and 'observerId' are not needed. We just use 'id' and 'handle' for now.
      variables: {
        request: { profileId },
        ...mediaTransformConfigToQueryVariables(this.mediaTransforms),
      },
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
