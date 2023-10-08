import { mock } from 'jest-mock-extended';
import { when } from 'jest-when';

import { mockWallet } from '../../../entities/__helpers__/mocks';
import { ActiveWallet } from '../ActiveWallet';
import {
  IConversationsGateway,
  IResettableCredentialsGateway,
  IResettableWalletGateway,
  LogoutReason,
  Logout,
  ILogoutPresenter,
} from '../Logout';

const wallet = mockWallet();

function setupTestScenario() {
  const walletGateway = mock<IResettableWalletGateway>();
  const credentialsGateway = mock<IResettableCredentialsGateway>();
  const presenter = mock<ILogoutPresenter>();
  const conversationGateway = mock<IConversationsGateway>();

  const interactor = new Logout(walletGateway, credentialsGateway, conversationGateway, presenter);

  return {
    walletGateway,
    credentialsGateway,
    conversationGateway,
    presenter,
    interactor,
  };
}

describe(`Given the "${Logout.name}" interactor`, () => {
  const reason = LogoutReason.USER_INITIATED;

  describe(`when "${Logout.prototype.execute.name}" is invoked`, () => {
    it(`should:
        - clear wallets from storage
        - clear DM conversations from storage
        - clear credentials from storage
        - present the logout reason`, async () => {
      const activeWallet = mock<ActiveWallet>();

      when(activeWallet.requireActiveWallet).calledWith().mockResolvedValue(wallet);

      const { interactor, credentialsGateway, conversationGateway, walletGateway, presenter } =
        setupTestScenario();

      await interactor.execute(LogoutReason.USER_INITIATED);

      expect(conversationGateway.reset).toHaveBeenCalled();
      expect(walletGateway.reset).toHaveBeenCalled();
      expect(credentialsGateway.invalidate).toHaveBeenCalled();
      expect(presenter.logout).toHaveBeenCalledWith(reason);
    });
  });
});
