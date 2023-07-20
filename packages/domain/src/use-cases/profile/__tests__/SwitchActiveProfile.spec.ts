import { mock } from 'jest-mock-extended';
import { when } from 'jest-when';

import { Profile } from '../../../entities';
import { mockProfile } from '../../../mocks';
import { ISessionPresenter } from '../../lifecycle';
import { IActiveProfileGateway } from '../IActiveProfileGateway';
import { IProfileGateway } from '../IProfileGateway';
import { SwitchActiveProfile } from '../SwitchActiveProfile';

function setupTestScenario({ profile }: { profile: Profile }) {
  const profileGateway = mock<IProfileGateway>();
  const activeProfileGateway = mock<IActiveProfileGateway>();
  const sessionPresenter = mock<ISessionPresenter>();

  when(profileGateway.getProfileById).calledWith(profile.id).mockResolvedValue(profile);

  const switchActiveProfile = new SwitchActiveProfile(
    profileGateway,
    activeProfileGateway,
    sessionPresenter,
  );

  return { activeProfileGateway, sessionPresenter, switchActiveProfile };
}

describe(`Given an instance of the ${SwitchActiveProfile.name} interactor`, () => {
  describe(`when invoking the ${SwitchActiveProfile.prototype.switch.name} method`, () => {
    it(`should:
        - retrieve the Profile entity by id
        - store it as Active Profile
        - update the authenticated session with new Active Profile`, async () => {
      const profile = mockProfile();
      const { activeProfileGateway, sessionPresenter, switchActiveProfile } = setupTestScenario({
        profile,
      });

      await switchActiveProfile.switch({ profileId: profile.id });

      expect(activeProfileGateway.setActiveProfile).toHaveBeenCalledWith(profile);
      expect(sessionPresenter.switchProfile).toHaveBeenCalledWith(profile);
    });
  });
});
