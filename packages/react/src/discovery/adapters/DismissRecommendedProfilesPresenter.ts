import { ProfileRecommendationsDocument, SafeApolloClient } from '@lens-protocol/api-bindings';
import { IDismissRecommendedProfilesPresenter } from '@lens-protocol/domain/use-cases/profile';

export class DismissRecommendedProfilesPresenter implements IDismissRecommendedProfilesPresenter {
  constructor(private readonly apolloClient: SafeApolloClient) {}

  async present() {
    await this.apolloClient.refetchQueries({
      include: [ProfileRecommendationsDocument],
    });
  }
}
