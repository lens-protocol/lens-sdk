import {
  SwitchActiveProfile,
  SwitchActiveProfileRequest,
} from '@lens-protocol/domain/use-cases/profile';

import { useSharedDependencies } from '../../shared';

export function useSwitchActiveProfileController() {
  const { activeProfileGateway, profileGateway, sessionPresenter } = useSharedDependencies();

  return async (request: SwitchActiveProfileRequest) => {
    const activeProfileLoader = new SwitchActiveProfile(
      profileGateway,
      activeProfileGateway,
      sessionPresenter,
    );

    await activeProfileLoader.switch(request);
  };
}
