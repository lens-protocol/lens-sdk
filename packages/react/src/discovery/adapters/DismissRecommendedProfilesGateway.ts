import {
  SafeApolloClient,
  DismissRecommendedProfilesData,
  DismissRecommendedProfilesVariables,
  DismissRecommendedProfilesDocument,
} from '@lens-protocol/api-bindings';
import {
  DismissRecommendedProfilesRequest,
  IDismissRecommendedProfilesGateway,
} from '@lens-protocol/domain/use-cases/profile';

export class DismissRecommendedProfilesGateway implements IDismissRecommendedProfilesGateway {
  constructor(private apolloClient: SafeApolloClient) {}

  async dismiss(request: DismissRecommendedProfilesRequest) {
    await this.apolloClient.mutate<
      DismissRecommendedProfilesData,
      DismissRecommendedProfilesVariables
    >({
      mutation: DismissRecommendedProfilesDocument,
      variables: {
        request: {
          dismiss: request.profileIds,
        },
      },
    });
  }
}
