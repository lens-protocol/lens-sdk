import { mock } from 'jest-mock-extended';
import { when } from 'jest-when';

import { mockWallet } from '../../../entities/__helpers__/mocks';
import { ISessionPresenter } from '../../lifecycle/ISessionPresenter';
import { ActiveWallet } from '../ActiveWallet';
import {
  IActiveProfileGateway,
  IConversationsGateway,
  IResettableCredentialsGateway,
  IResettableWalletGateway,
  LogoutReason,
  WalletLogout,
} from '../WalletLogout';

const wallet = mockWallet();

const setupWalletLogout = ({ activeWallet }: { activeWallet: ActiveWallet }) => {
  const walletGateway = mock<IResettableWalletGateway>();
  const credentialsGateway = mock<IResettableCredentialsGateway>();
  const activeProfileGateway = mock<IActiveProfileGateway>();
  const sessionPresenter = mock<ISessionPresenter>();
  const conversationGateway = mock<IConversationsGateway>();

  const walletLogout = new WalletLogout(
    walletGateway,
    credentialsGateway,
    activeWallet,
    activeProfileGateway,
    conversationGateway,
    sessionPresenter,
  );

  return {
    walletGateway,
    credentialsGateway,
    activeProfileGateway,
    sessionPresenter,
    walletLogout,
  };
};

describe(`Given the ${WalletLogout.name} interactor`, () => {
  describe(`when "${WalletLogout.prototype.logout.name}" is invoked`, () => {
    it(`should:
        - clear wallets from storage
        - clear credentials from storage
        - clear active profile from storage
        - present the logout reason`, async () => {
      const activeWallet = mock<ActiveWallet>();

      when(activeWallet.requireActiveWallet).calledWith().mockResolvedValue(wallet);

      const {
        walletLogout,
        credentialsGateway,
        walletGateway,
        activeProfileGateway,
        sessionPresenter,
      } = setupWalletLogout({
        activeWallet,
      });

      await walletLogout.logout(LogoutReason.USER_INITIATED);

      expect(credentialsGateway.invalidate).toHaveBeenCalled();
      expect(walletGateway.reset).toHaveBeenCalled();
      expect(activeProfileGateway.reset).toHaveBeenCalled();
      expect(sessionPresenter.logout).toHaveBeenCalledWith({
        lastLoggedInWallet: wallet,
        logoutReason: LogoutReason.USER_INITIATED,
      });
    });
  });
});
