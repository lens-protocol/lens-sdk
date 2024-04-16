import { ManageProfileInterests } from '@lens-protocol/domain/use-cases/profile';

import { useSharedDependencies } from '../../shared';
import { ProfileInterestsGateway, ProfileInterestsRequest } from './ProfileInterestsGateway';
import { ProfileInterestsPresenter } from './ProfileInterestsPresenter';

export function useProfileInterestsController() {
  const { apolloClient, profileCacheManager } = useSharedDependencies();

  const add = async (request: ProfileInterestsRequest) => {
    const presenter = new ProfileInterestsPresenter(profileCacheManager);
    const gateway = new ProfileInterestsGateway(apolloClient);
    const manageInterests = new ManageProfileInterests(gateway, presenter);

    await manageInterests.add(request);
  };

  const remove = async (request: ProfileInterestsRequest) => {
    const presenter = new ProfileInterestsPresenter(profileCacheManager);
    const gateway = new ProfileInterestsGateway(apolloClient);
    const manageInterests = new ManageProfileInterests(gateway, presenter);

    await manageInterests.remove(request);
  };

  return {
    add,
    remove,
  };
}
