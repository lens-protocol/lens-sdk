import { mock } from 'jest-mock-extended';
import { when } from 'jest-when';

import { Profile } from '../../../entities';
import { mockProfile } from '../../../mocks';
import { IActiveProfileGateway } from '../IActiveProfileGateway';
import { IActiveProfilePresenter } from '../IActiveProfilePresenter';
import { IProfileGateway } from '../IProfileGateway';
import { SwitchActiveProfile } from '../SwitchActiveProfile';

function setupTestScenario({ profile }: { profile: Profile }) {
  const profileGateway = mock<IProfileGateway>();
  const activeProfileGateway = mock<IActiveProfileGateway>();
  const activeProfilePresenter = mock<IActiveProfilePresenter>();

  when(profileGateway.getProfileById).calledWith(profile.id).mockResolvedValue(profile);

  const switchActiveProfile = new SwitchActiveProfile(
    profileGateway,
    activeProfileGateway,
    activeProfilePresenter,
  );

  return { activeProfileGateway, activeProfilePresenter, switchActiveProfile };
}

describe(`Given an instance of the ${SwitchActiveProfile.name} interactor`, () => {
  describe(`when invoking the ${SwitchActiveProfile.prototype.switch.name} method`, () => {
    it(`should:
        - retrieve the profile by id
        - store it as active profile
        - present the active profile`, async () => {
      const profile = mockProfile();
      const { activeProfileGateway, activeProfilePresenter, switchActiveProfile } =
        setupTestScenario({ profile });

      await switchActiveProfile.switch({ profileId: profile.id });

      expect(activeProfileGateway.setActiveProfile).toHaveBeenCalledWith(profile);
      expect(activeProfilePresenter.presentActiveProfile).toHaveBeenCalledWith(profile);
    });
  });
});
