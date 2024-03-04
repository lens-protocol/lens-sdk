import {
  PeerToPeerRecommendData,
  PeerToPeerRecommendDocument,
  PeerToPeerRecommendVariables,
  PeerToPeerUnrecommendData,
  PeerToPeerUnrecommendDocument,
  PeerToPeerUnrecommendVariables,
  SafeApolloClient,
} from '@lens-protocol/api-bindings';
import {
  ITogglableProfilePropertyGateway,
  ToggleProfilePropertyRequest,
} from '@lens-protocol/domain/use-cases/profile';

export type RecommendProfileRequest = ToggleProfilePropertyRequest;

export class RecommendProfileGateway implements ITogglableProfilePropertyGateway {
  constructor(private apolloClient: SafeApolloClient) {}

  // recommend
  async on({ id }: RecommendProfileRequest): Promise<void> {
    await this.apolloClient.mutate<PeerToPeerRecommendData, PeerToPeerRecommendVariables>({
      mutation: PeerToPeerRecommendDocument,
      variables: {
        request: {
          profileId: id,
        },
      },
    });
  }

  // unrecommend
  async off({ id }: RecommendProfileRequest): Promise<void> {
    await this.apolloClient.mutate<PeerToPeerUnrecommendData, PeerToPeerUnrecommendVariables>({
      mutation: PeerToPeerUnrecommendDocument,
      variables: {
        request: {
          profileId: id,
        },
      },
    });
  }
}
