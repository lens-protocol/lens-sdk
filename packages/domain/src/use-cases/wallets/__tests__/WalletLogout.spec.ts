import { success } from '@lens-protocol/shared-kernel';
import { mock } from 'jest-mock-extended';
import { when } from 'jest-when';

import { mockWallet } from '../../../entities/__helpers__/mocks';
import { IActiveProfilePresenter } from '../../profile';
import { ActiveWallet } from '../ActiveWallet';
import { IActiveWalletPresenter } from '../IActiveWalletPresenter';
import { ILogoutPresenter, LogoutReason } from '../ILogoutPresenter';
import {
  IActiveProfileGateway,
  IConversationsGateway,
  IResettableCredentialsGateway,
  IResettableWalletGateway,
  WalletLogout,
} from '../WalletLogout';

const wallet = mockWallet();

const setupWalletLogout = ({ activeWallet }: { activeWallet: ActiveWallet }) => {
  const walletGateway = mock<IResettableWalletGateway>();
  const credentialsGateway = mock<IResettableCredentialsGateway>();
  const activeWalletPresenter = mock<IActiveWalletPresenter>();
  const activeProfilePresenter = mock<IActiveProfilePresenter>();
  const activeProfileGateway = mock<IActiveProfileGateway>();
  const conversationGateway = mock<IConversationsGateway>();
  const logoutPresenter = mock<ILogoutPresenter>();

  const walletLogout = new WalletLogout(
    walletGateway,
    credentialsGateway,
    activeWallet,
    activeProfileGateway,
    conversationGateway,
    activeProfilePresenter,
    activeWalletPresenter,
    logoutPresenter,
  );

  return {
    walletGateway,
    credentialsGateway,
    activeWalletPresenter,
    activeProfilePresenter,
    activeProfileGateway,
    logoutPresenter,
    walletLogout,
  };
};

describe(`Given the ${WalletLogout.name} interactor`, () => {
  describe(`when "${WalletLogout.prototype.logout.name}" is invoked`, () => {
    it(`should:
          - clear wallets from storage
          - clear credentials from storage
          - clear active profile from storage
          - present an empty profile
          - present an empty wallet
          - present logout details`, async () => {
      const activeWallet = mock<ActiveWallet>();

      when(activeWallet.requireActiveWallet).calledWith().mockResolvedValue(wallet);

      const {
        walletLogout,
        credentialsGateway,
        walletGateway,
        activeProfileGateway,
        activeProfilePresenter,
        logoutPresenter,
        activeWalletPresenter,
      } = setupWalletLogout({
        activeWallet,
      });

      await walletLogout.logout(LogoutReason.USER_INITIATED);

      expect(credentialsGateway.invalidate).toHaveBeenCalled();
      expect(walletGateway.reset).toHaveBeenCalled();
      expect(activeProfileGateway.reset).toHaveBeenCalled();
      expect(activeProfilePresenter.presentActiveProfile).toHaveBeenCalledWith(null);
      expect(activeWalletPresenter.presentActiveWallet).toHaveBeenCalledWith(null);
      expect(logoutPresenter.present).toHaveBeenCalledWith(
        success({
          lastLoggedInWallet: wallet,
          logoutReason: LogoutReason.USER_INITIATED,
        }),
      );
    });
  });
});
