import {
  DismissRecommendedProfiles,
  DismissRecommendedProfilesRequest,
} from '@lens-protocol/domain/use-cases/profile';

import { useSharedDependencies } from '../../shared';
import { DismissRecommendedProfilesGateway } from './DismissRecommendedProfilesGateway';
import { DismissRecommendedProfilesPresenter } from './DismissRecommendedProfilesPresenter';

export function useDismissRecommendedProfilesController() {
  const { apolloClient } = useSharedDependencies();

  return async (request: DismissRecommendedProfilesRequest) => {
    const presenter = new DismissRecommendedProfilesPresenter(apolloClient);
    const gateway = new DismissRecommendedProfilesGateway(apolloClient);
    const dismiss = new DismissRecommendedProfiles(gateway, presenter);
    await dismiss.execute(request);
  };
}
