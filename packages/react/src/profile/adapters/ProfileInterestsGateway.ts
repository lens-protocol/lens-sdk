import {
  AddProfileInterestsData,
  AddProfileInterestsDocument,
  AddProfileInterestsVariables,
  ProfileInterestTypes,
  RemoveProfileInterestsData,
  RemoveProfileInterestsDocument,
  RemoveProfileInterestsVariables,
  SafeApolloClient,
} from '@lens-protocol/api-bindings';
import { ProfileId } from '@lens-protocol/domain/entities';
import { IProfileInterestsGateway } from '@lens-protocol/domain/use-cases/profile';

export type ProfileInterestsRequest = {
  profileId: ProfileId;
  interests: ProfileInterestTypes[];
};

export class ProfileInterestsGateway implements IProfileInterestsGateway {
  constructor(private apolloClient: SafeApolloClient) {}

  async add(request: ProfileInterestsRequest) {
    await this.apolloClient.mutate<AddProfileInterestsData, AddProfileInterestsVariables>({
      mutation: AddProfileInterestsDocument,
      variables: {
        request: {
          interests: request.interests,
        },
      },
    });
  }

  async remove(request: ProfileInterestsRequest) {
    await this.apolloClient.mutate<RemoveProfileInterestsData, RemoveProfileInterestsVariables>({
      mutation: RemoveProfileInterestsDocument,
      variables: {
        request: {
          interests: request.interests,
        },
      },
    });
  }
}
