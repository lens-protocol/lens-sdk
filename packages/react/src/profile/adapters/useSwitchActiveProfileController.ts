import {
  SwitchActiveProfile,
  SwitchActiveProfileRequest,
} from '@lens-protocol/domain/use-cases/profile';

import { useSharedDependencies } from '../../shared';

export function useSwitchActiveProfileController() {
  const { activeProfileGateway, activeProfilePresenter, profileGateway } = useSharedDependencies();

  return async (request: SwitchActiveProfileRequest) => {
    const activeProfileLoader = new SwitchActiveProfile(
      profileGateway,
      activeProfileGateway,
      activeProfilePresenter,
    );

    await activeProfileLoader.switch(request);
  };
}
