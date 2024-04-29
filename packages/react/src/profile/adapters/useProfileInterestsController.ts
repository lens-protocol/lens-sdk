import { ManageProfileInterests } from '@lens-protocol/domain/use-cases/profile';
import { invariant } from '@lens-protocol/shared-kernel';

import { SessionType, useSession } from '../../authentication';
import { useSharedDependencies } from '../../shared';
import { ProfileInterestsGateway, ProfileInterestsRequest } from './ProfileInterestsGateway';
import { ProfileInterestsPresenter } from './ProfileInterestsPresenter';

export function useProfileInterestsController() {
  const { apolloClient, profileCacheManager } = useSharedDependencies();
  const { data: session } = useSession();

  const add = async (request: ProfileInterestsRequest) => {
    invariant(
      session?.type === SessionType.WithProfile,
      'You must be authenticated with a profile to use this hook. Use `useLogin` hook to authenticate.',
    );

    const presenter = new ProfileInterestsPresenter(profileCacheManager, session.profile.id);
    const gateway = new ProfileInterestsGateway(apolloClient);
    const manageInterests = new ManageProfileInterests(gateway, presenter);

    await manageInterests.add(request);
  };

  const remove = async (request: ProfileInterestsRequest) => {
    invariant(
      session?.type === SessionType.WithProfile,
      'You must be authenticated with a profile to use this hook. Use `useLogin` hook to authenticate.',
    );

    const presenter = new ProfileInterestsPresenter(profileCacheManager, session.profile.id);
    const gateway = new ProfileInterestsGateway(apolloClient);
    const manageInterests = new ManageProfileInterests(gateway, presenter);

    await manageInterests.remove(request);
  };

  return {
    add,
    remove,
  };
}
