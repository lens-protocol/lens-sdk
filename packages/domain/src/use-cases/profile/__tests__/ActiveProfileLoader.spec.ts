import { mock } from 'jest-mock-extended';
import { when } from 'jest-when';

import { mockProfile, mockWallet } from '../../../entities/__helpers__/mocks';
import { ActiveProfileLoader } from '../ActiveProfileLoader';
import { IActiveProfileGateway } from '../IActiveProfileGateway';
import { IActiveProfilePresenter } from '../IActiveProfilePresenter';
import { IProfileGateway } from '../IProfileGateway';

describe(`Given the ${ActiveProfileLoader.name} interactor`, () => {
  describe(`when "${ActiveProfileLoader.prototype.loadActiveProfileByOwnerAddress.name}" method is invoked`, () => {
    it(`should:
        - retrieve the list of profiles owned by the provided address
        - store the first one as active profile
        - present the active profile`, async () => {
      const wallet = mockWallet();
      const firstProfile = mockProfile();
      const profileGateway = mock<IProfileGateway>();
      const activeProfileGateway = mock<IActiveProfileGateway>();
      const activeProfilePresenter = mock<IActiveProfilePresenter>();

      when(profileGateway.getAllProfilesByOwnerAddress)
        .calledWith(wallet.address)
        .mockResolvedValue([firstProfile, mockProfile()]);

      const activeProfile = new ActiveProfileLoader(
        profileGateway,
        activeProfileGateway,
        activeProfilePresenter,
      );

      await activeProfile.loadActiveProfileByOwnerAddress(wallet.address);

      expect(activeProfileGateway.setActiveProfile).toHaveBeenCalledWith(firstProfile);
      expect(activeProfilePresenter.presentActiveProfile).toHaveBeenCalledWith(firstProfile);
    });

    it('should just present the profile already loaded into the ActiveProfileGateway', async () => {
      const wallet = mockWallet();
      const profile = mockProfile();
      const profileGateway = mock<IProfileGateway>();
      const activeProfileGateway = mock<IActiveProfileGateway>();
      const activeProfilePresenter = mock<IActiveProfilePresenter>();

      when(activeProfileGateway.getActiveProfile).mockResolvedValue(profile);

      const activeProfile = new ActiveProfileLoader(
        profileGateway,
        activeProfileGateway,
        activeProfilePresenter,
      );

      await activeProfile.loadActiveProfileByOwnerAddress(wallet.address);

      expect(profileGateway.getAllProfilesByOwnerAddress).not.toHaveBeenCalled();
      expect(activeProfileGateway.setActiveProfile).not.toHaveBeenCalled();
      expect(activeProfilePresenter.presentActiveProfile).toHaveBeenCalledWith(profile);
    });

    it('should bail out if not active profile is present and the wallet does not own any profile', async () => {
      const wallet = mockWallet();
      const profileGateway = mock<IProfileGateway>();
      const activeProfileGateway = mock<IActiveProfileGateway>();
      const activeProfilePresenter = mock<IActiveProfilePresenter>();

      when(profileGateway.getAllProfilesByOwnerAddress)
        .calledWith(wallet.address)
        .mockResolvedValue([]);

      const activeProfile = new ActiveProfileLoader(
        profileGateway,
        activeProfileGateway,
        activeProfilePresenter,
      );

      await activeProfile.loadActiveProfileByOwnerAddress(wallet.address);

      expect(activeProfileGateway.setActiveProfile).not.toHaveBeenCalled();
      expect(activeProfilePresenter.presentActiveProfile).not.toHaveBeenCalled();
    });
  });

  describe(`when "${ActiveProfileLoader.prototype.loadActiveProfileByHandle.name}" method is invoked`, () => {
    it(`should:
          - retrieve the profile details
          - store it as active profile
          - present the active profile`, async () => {
      const profile = mockProfile();
      const profileGateway = mock<IProfileGateway>();
      const activeProfileGateway = mock<IActiveProfileGateway>();
      const activeProfilePresenter = mock<IActiveProfilePresenter>();

      when(activeProfileGateway.getActiveProfile).mockResolvedValue(null);
      when(profileGateway.getProfileByHandle).calledWith(profile.handle).mockResolvedValue(profile);

      const activeProfile = new ActiveProfileLoader(
        profileGateway,
        activeProfileGateway,
        activeProfilePresenter,
      );

      await activeProfile.loadActiveProfileByHandle(profile.handle);

      expect(activeProfileGateway.setActiveProfile).toHaveBeenCalledWith(profile);
      expect(activeProfilePresenter.presentActiveProfile).toHaveBeenCalledWith(profile);
    });

    it('should just present the active profile if the profile handle matches with the one provided', async () => {
      const profile = mockProfile();
      const profileGateway = mock<IProfileGateway>();
      const activeProfileGateway = mock<IActiveProfileGateway>();
      const activeProfilePresenter = mock<IActiveProfilePresenter>();

      when(activeProfileGateway.getActiveProfile).mockResolvedValue(profile);

      const activeProfile = new ActiveProfileLoader(
        profileGateway,
        activeProfileGateway,
        activeProfilePresenter,
      );

      await activeProfile.loadActiveProfileByHandle(profile.handle);

      expect(profileGateway.getProfileByHandle).not.toHaveBeenCalled();
      expect(activeProfileGateway.setActiveProfile).not.toHaveBeenCalled();
      expect(activeProfilePresenter.presentActiveProfile).toHaveBeenCalledWith(profile);
    });
  });
});
