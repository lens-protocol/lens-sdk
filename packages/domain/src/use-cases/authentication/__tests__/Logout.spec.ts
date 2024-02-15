import { mock } from 'jest-mock-extended';
import { when } from 'jest-when';

import { mockWallet } from '../../../entities/__helpers__/mocks';
import { ActiveWallet } from '../ActiveWallet';
import {
  IConversationsGateway,
  ILogoutPresenter,
  IResettableCredentialsGateway,
  IResettableTransactionGateway,
  Logout,
  LogoutReason,
} from '../Logout';

const wallet = mockWallet();

function setupTestScenario() {
  const credentialsGateway = mock<IResettableCredentialsGateway>();
  const transactionGateway = mock<IResettableTransactionGateway>();
  const conversationGateway = mock<IConversationsGateway>();
  const presenter = mock<ILogoutPresenter>();

  const interactor = new Logout(
    credentialsGateway,
    transactionGateway,
    conversationGateway,
    presenter,
  );

  return {
    credentialsGateway,
    transactionGateway,
    conversationGateway,
    presenter,
    interactor,
  };
}

describe(`Given the "${Logout.name}" interactor`, () => {
  const reason = LogoutReason.USER_INITIATED;

  describe(`when "${Logout.prototype.execute.name}" is invoked`, () => {
    it(`should:
        - clear DM conversations from storage
        - clear transactions from storage
        - clear credentials from storage
        - present the logout reason`, async () => {
      const activeWallet = mock<ActiveWallet>();

      when(activeWallet.requireActiveWallet).calledWith().mockResolvedValue(wallet);

      const { credentialsGateway, transactionGateway, conversationGateway, presenter, interactor } =
        setupTestScenario();

      await interactor.execute(LogoutReason.USER_INITIATED);

      expect(conversationGateway.reset).toHaveBeenCalled();
      expect(transactionGateway.reset).toHaveBeenCalled();
      expect(credentialsGateway.invalidate).toHaveBeenCalled();
      expect(presenter.logout).toHaveBeenCalledWith(reason);
    });
  });
});
