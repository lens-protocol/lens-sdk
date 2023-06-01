import { mock } from 'jest-mock-extended';
import { when } from 'jest-when';

import { mockProfile, mockWallet } from '../../../entities/__helpers__/mocks';
import { ActiveProfileLoader } from '../ActiveProfileLoader';
import { IActiveProfileGateway } from '../IActiveProfileGateway';
import { IProfileGateway } from '../IProfileGateway';

describe(`Given the ${ActiveProfileLoader.name} interactor`, () => {
  describe(`when "${ActiveProfileLoader.prototype.loadActiveProfileByOwnerAddress.name}" method is invoked`, () => {
    it(`should:
        - retrieve the list of profiles owned by the provided address
        - store the first one as active profile
        - return the active profile`, async () => {
      const wallet = mockWallet();
      const firstProfile = mockProfile();
      const profileGateway = mock<IProfileGateway>();
      const activeProfileGateway = mock<IActiveProfileGateway>();

      when(profileGateway.getAllProfilesByOwnerAddress)
        .calledWith(wallet.address)
        .mockResolvedValue([firstProfile, mockProfile()]);

      const activeProfileLoader = new ActiveProfileLoader(profileGateway, activeProfileGateway);

      const activeProfile = await activeProfileLoader.loadActiveProfileByOwnerAddress(
        wallet.address,
      );

      expect(activeProfileGateway.setActiveProfile).toHaveBeenCalledWith(firstProfile);
      expect(activeProfile).toEqual(firstProfile);
    });

    it('should just return the profile already loaded into the ActiveProfileGateway', async () => {
      const wallet = mockWallet();
      const profile = mockProfile();
      const profileGateway = mock<IProfileGateway>();
      const activeProfileGateway = mock<IActiveProfileGateway>();

      when(activeProfileGateway.getActiveProfile).mockResolvedValue(profile);

      const activeProfileLoader = new ActiveProfileLoader(profileGateway, activeProfileGateway);

      const activeProfile = await activeProfileLoader.loadActiveProfileByOwnerAddress(
        wallet.address,
      );

      expect(profileGateway.getAllProfilesByOwnerAddress).not.toHaveBeenCalled();
      expect(activeProfileGateway.setActiveProfile).not.toHaveBeenCalled();
      expect(activeProfile).toEqual(profile);
    });

    it('should bail out if not active profile is present and the wallet does not own any profile', async () => {
      const wallet = mockWallet();
      const profileGateway = mock<IProfileGateway>();
      const activeProfileGateway = mock<IActiveProfileGateway>();

      when(profileGateway.getAllProfilesByOwnerAddress)
        .calledWith(wallet.address)
        .mockResolvedValue([]);

      const activeProfileLoader = new ActiveProfileLoader(profileGateway, activeProfileGateway);

      const activeProfile = await activeProfileLoader.loadActiveProfileByOwnerAddress(
        wallet.address,
      );

      expect(activeProfileGateway.setActiveProfile).not.toHaveBeenCalled();
      expect(activeProfile).toBeNull();
    });
  });
});
