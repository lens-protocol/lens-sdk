import { ToggleProfileProperty } from '@lens-protocol/domain/use-cases/profile';

import { useSharedDependencies } from '../../shared';
import { RecommendProfileGateway, RecommendProfileRequest } from './RecommendProfileGateway';
import { RecommendProfilePresenter } from './RecommendProfilePresenter';

export function useRecommendProfileController() {
  const { apolloClient, profileCacheManager } = useSharedDependencies();

  const recommend = async (request: RecommendProfileRequest) => {
    const presenter = new RecommendProfilePresenter(profileCacheManager);
    const gateway = new RecommendProfileGateway(apolloClient);
    const toggle = new ToggleProfileProperty(gateway, presenter);

    await toggle.on(request);
  };

  const unrecommend = async (request: RecommendProfileRequest) => {
    const presenter = new RecommendProfilePresenter(profileCacheManager);
    const gateway = new RecommendProfileGateway(apolloClient);
    const toggle = new ToggleProfileProperty(gateway, presenter);

    await toggle.off(request);
  };

  return {
    recommend,
    unrecommend,
  };
}
